import { FC, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GreenApiService, TNotification } from "../../transport/green-api.transport";
import { authService } from "../../services/auth.service";
import { TAuthData } from "../../types/auth.types";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import ChatList from "./chat-list";
import { TMessage } from "../../types/chat.types";
import EmptyState from "./empty";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type TChatProps = {
  auth: {
    idInstance: string;
    apiTokenInstance: string;
  };
  setAuth: (x: TAuthData | null) => void;
};

const Chat: FC<TChatProps> = ({ auth, setAuth }) => {
  const [activeChatId, setActiveChatId] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Array<TMessage>>([]);
  const messageDivRef = useRef<HTMLDivElement>(null);

  const apiService = useMemo(
    () => new GreenApiService(auth.idInstance, auth.apiTokenInstance),
    [auth.idInstance, auth.apiTokenInstance]
  );

  const handleLogout = () => {
    authService.logout();
    setAuth(null);
  };
 
  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeChatId || !messageInput) return;
    try {
      await apiService.sendMessage(`${activeChatId}@c.us`, messageInput);
      setMessages([...messages, { sender: "me", text: messageInput, receiver: activeChatId }]);
      setTimeout(() => {
        if (messageDivRef.current) {
          messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
        }
      }, 0);
      setMessageInput("");
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
      toast.error("Сообщение не отправлено. Попробуйте еще раз.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      })
    }
  };


  const tryGetMessages = useCallback(
    async (abortController?: AbortController) => {
      apiService
        .receiveNotification(abortController)
        .then((notification: TNotification) => {
          if (notification && notification.body) {
            const { receiptId, body } = notification;
            if (
              body.typeWebhook === "incomingMessageReceived" &&
              body.messageData.typeMessage === "textMessage"
            ) {
              const sender = body.senderData.sender;
              const text = body.messageData?.textMessageData.textMessage;
              setMessages((prev) => [...prev, { sender, text, receiver: "me" }]);
            }

            if (receiptId) {
              return apiService.deleteNotification(receiptId);
            }
          }
        })
        .catch(console.error)
        .finally(() => {
          if (!abortController?.signal.aborted) {
            tryGetMessages(abortController);
          }
        });
    },
    [apiService]
  );

  // Polling новых сообщений
  useEffect(() => {
    const abortController = new AbortController();
    tryGetMessages(abortController);

    return () => {
      abortController.abort("Abort request reason: rerender useEffect");
    };
  }, [tryGetMessages]);



  return (
    <div className="flex h-screen bg-[#f0f2f5]">
      <ChatList
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        onLogout={handleLogout}
      />
     

      {/* Правая панель с сообщениями */}
      <div className="w-full md:w-3/4 flex flex-col h-full bg-white shadow-md">
        {activeChatId ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 box-content" ref={messageDivRef}>
              <MessageList 
                messages={messages.filter(
                    (message) =>
                      [activeChatId + "@c.us", "me"].includes(message.sender) &&
                      [activeChatId, "me"].includes(message.receiver)
                  )} 
                messageDivRef={messageDivRef} 
              />
              <ToastContainer/>
            </div>

            <MessageInput 
              onSend={sendMessage} 
              messageValue={messageInput} 
              onChange={setMessageInput} 
            />
          </>
        ) : <EmptyState />}
      </div>
    </div>
  );
};

export default Chat;