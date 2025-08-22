import { Message } from "@/app/services/services";
import ChatInput from "../chat-input/chat-input";
import Dialog from "../dialog/dialog";
import style from "./chat.module.css";

interface ChatProps {
  chatId: string;
  messages: Message[];
}

export default function Chat({ chatId, messages}: Readonly<ChatProps>) {
  return (
    <div className={style.wrapper}>
      <Dialog dialog={messages} />
      <ChatInput
        chatId={chatId}
        messages={messages}
      />
    </div>
  );
}
