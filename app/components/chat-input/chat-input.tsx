import { FormEvent, useState } from "react";
import style from "./chat-input.module.css";
import { Message, RequestError, sendMessage } from "@/app/services/services";

interface ChatInputProps {
  chatId: string;
  newMessage: (data: string) => void;
}

export default function ChatInput(props: Readonly<ChatInputProps>) {
  const [message, setMessage] = useState<string>("");

  function handleSubmit(event: FormEvent, newMsg: string): void {
    event.preventDefault();
    props.newMessage(`${newMsg}`);
    sendMessage(props.chatId, newMsg)
      .then((data: Message | RequestError) => {
        if ((data as Message)["ai_message"]) {
          props.newMessage((data as Message).ai_message);
        }
      })
      .finally(() => {
        setMessage("");
      });
  }

  return (
    <form className={style.wrapper} onSubmit={(e) => handleSubmit(e, message)}>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className={style.textarea}
      ></textarea>
      <button type="submit" className={style.submit}>
        enviar
      </button>
    </form>
  );
}
