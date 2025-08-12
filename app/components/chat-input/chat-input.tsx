import { FormEvent, useState } from "react";
import style from "./chat-input.module.css";
import { AiMessage, RequestError, sendMessage } from "@/app/services/services";

interface ChatInputProps {
  chatId: string;
  newMessage: (data: string, font: string) => void;
}

export default function ChatInput(props: Readonly<ChatInputProps>) {
  const [message, setMessage] = useState<string>("");

  function handleSubmit(event: FormEvent, newMsg: string): void {
    event.preventDefault();
    props.newMessage(`${newMsg}`, "user");
    sendMessage(props.chatId, newMsg)
      .then((data: AiMessage | RequestError) => {
        if ((data as AiMessage)["ai_message"]) {
          props.newMessage((data as AiMessage).ai_message, "ia");
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
        placeholder="Escreva aqui sua mensagem..."
      ></textarea>
      <button type="submit">enviar</button>
    </form>
  );
}
