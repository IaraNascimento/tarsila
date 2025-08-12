import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import style from "./chat-input.module.css";
import { AiMessage, RequestError, sendMessage } from "@/app/services/services";

interface ChatInputProps {
  chatId: string;
  newMessage: (data: string, font: string, draft: null | string) => void;
}

export default function ChatInput(props: Readonly<ChatInputProps>) {
  const targetRef = useRef<null | HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  function handleFormSubmit(event: FormEvent, newMsg: string): void {
    event.preventDefault();
    handleSubmit(`${newMsg}`);
  }

  function handleSubmit(newMsg: string): void {
    setLoading(true);
    props.newMessage(`${newMsg}`, "user", null);
    sendMessage(props.chatId, newMsg)
      .then((data: AiMessage | RequestError) => {
        if ((data as AiMessage)["ai_message"]) {
          props.newMessage(
            (data as AiMessage).ai_message,
            "ia",
            (data as AiMessage).draft
          );
        }
      })
      .finally(() => {
        setMessage("");
        setLoading(false);
      });
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        // event.preventDefault();
        handleSubmit(message);
      }
    };
    if (targetRef.current) {
      targetRef.current.addEventListener("keydown", listener);
    }
    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener("keydown", listener);
      }
    };
  }, [message]);

  return (
    <form
      className={style.wrapper}
      onSubmit={(e) => handleFormSubmit(e, message)}
    >
      <textarea
        ref={targetRef}
        value={message}
        disabled={loading}
        onChange={(event) => setMessage(event.target.value)}
        className={style.textarea}
        placeholder="Escreva aqui sua mensagem..."
      ></textarea>
      <button type="submit" disabled={loading}>
        enviar
      </button>
    </form>
  );
}
