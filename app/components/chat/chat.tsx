import ChatInput from "../chat-input/chat-input";
import Dialog from "../dialog/dialog";
import style from "./chat.module.css";

interface ChatProps {
  dialog: Array<string>;
  chatId: string;
  newMessage: (text: string) => void;
}

export default function Chat(props: Readonly<ChatProps>) {
  return (
    <div className={style.wrapper}>
      <Dialog dialog={props.dialog} />
      <ChatInput
        chatId={props.chatId}
        newMessage={(text) => props.newMessage(text)}
      />
    </div>
  );
}
