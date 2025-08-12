import ChatInput from "../chat-input/chat-input";
import Dialog, { Message } from "../dialog/dialog";
import style from "./chat.module.css";

interface ChatProps {
  dialog: Array<Message>;
  chatId: string;
  newMessage: (text: string, font: string) => void;
}

export default function Chat(props: Readonly<ChatProps>) {
  return (
    <div className={style.wrapper}>
      <Dialog dialog={props.dialog} />
      <ChatInput
        chatId={props.chatId}
        newMessage={(text, font) => props.newMessage(text, font)}
      />
    </div>
  );
}
