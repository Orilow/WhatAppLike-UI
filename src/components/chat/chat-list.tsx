import { FC, FormEvent, useState } from "react";
import { displayPhoneNumber, formatPhoneNumber } from "../../utils/formatters";
import { TChat } from "../../types/chat.types";


type TChatListProps = {
    activeChatId: string;
    setActiveChatId: (x: string) => void;
    onLogout: VoidFunction;
};

const ChatList: FC<TChatListProps> = ({
  activeChatId,
  setActiveChatId,
  onLogout,
}) => {
  const [chats, setChats] = useState<Array<TChat>>([]);
  const [newChatInput, setNewChatInput] = useState("");
  // Состояние для отображения списка чатов на мобильных устройствах
  const [showChatList, setShowChatList] = useState(true); 


  const createChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newChatInput) {
    const formattedPhone = formatPhoneNumber(newChatInput);
    if (!chats.some((chat) => chat.id === formattedPhone)) {
        setChats([...chats, { id: formattedPhone, name: displayPhoneNumber(formattedPhone) }]);
    }
    setActiveChatId(newChatInput);
    setShowChatList(false);
    }
    setNewChatInput("");
    return false;
  };
  
  const selectChat = (id: string) => {
    setActiveChatId(id);
    setShowChatList(false);
  };



  return (
    <>
      {/* Кнопка для отображения списка чатов на мобильных устройствах */}
      {!showChatList && (
        <button
          onClick={() => setShowChatList(true)}
          className="fixed top-4 left-4 bg-[#25D366] text-black p-2 rounded-full md:hidden z-50"
        >
          ❮
        </button>
      )}

      {/* Левая панель с чатами */}
      <div
        className={`w-full md:w-1/4 bg-white shadow-md p-4 flex flex-col fixed md:static h-screen md:h-auto transform transition-transform duration-300 ${
          showChatList ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-semibold mb-4 aligh-center">Чаты</h2>
          <button
            onClick={onLogout}
            className="bg-red-500 py-2 transition font-semibold"
            style={{ backgroundColor: "#FFF", color: "red" }}
          >
            Выйти
          </button>
        </div>
        <form onSubmit={createChat}>
          <input
            type="text"
            placeholder="Номер (пример: 79111234567)"
            value={newChatInput}
            onChange={(e) => setNewChatInput(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
          />
          <button
            type="submit"
            className="w-full bg-[#25D366] text-white py-2 rounded hover:bg-[#1ebe5c] transition font-semibold"
            style={{ backgroundColor: "#f9f9f9", color: "black" }}
          >
            Создать чат
          </button>
        </form>

        {/* Список чатов */}
        <div className="mt-4 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={`p-2 rounded-lg mb-2 cursor-pointer ${
                chat.id === activeChatId ? "bg-[#25D366] text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {chat.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;