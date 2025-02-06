import { FC, FormEvent } from "react";

type TMessageInputProps = {
  messageValue: string;
  onChange: (value: string) => void;
  onSend: (event: FormEvent<HTMLFormElement>) => void;
};

const MessageInput: FC<TMessageInputProps> = ({ 
  messageValue,
  onChange,
  onSend 
}) => {
  return (
    <form onSubmit={onSend}>
      <div className="p-4 border-t flex">
        <input
          type="text"
          placeholder="Введите сообщение"
          value={messageValue}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#25D366]"
        />
        <button
          className="ml-2 bg-[#25D366] text-white px-4 py-2 rounded hover:bg-[#1ebe5c] transition font-semibold"
          style={{ backgroundColor: "#25D366" }}
        >
          ➤
        </button>
      </div>
    </form>
  );
};

export default MessageInput;