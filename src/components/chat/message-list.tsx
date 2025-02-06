import { FC } from "react";
import { TMessage } from "../../types/chat.types";


type TMessageListProps = {
  messages: TMessage[];
  messageDivRef: React.RefObject<HTMLDivElement>;
};

const MessageList: FC<TMessageListProps> = ({ messages, messageDivRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 box-content" ref={messageDivRef}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg max-w-xs mb-2 ${
            msg.sender === "me" ? "bg-[#dcf8c6] justify-self-end" : "bg-gray-200 justify-self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;