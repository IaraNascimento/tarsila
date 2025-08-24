"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import { useAuth } from "@/app/contexts/AuthProvider";
import { useDialog } from "@/app/contexts/DialogsProvider";
import { useDraft } from "@/app/contexts/DraftProvider";
import {
  Conversation,
  Message,
  MSG_TYPES,
  RequestError,
  sendMessage,
} from "@/app/services/services";
import style from "./chat-input.module.css";

export default function ChatInput() {
  const { currentChatId } = useAuth();
  const { addDialog, setDialogs } = useDialog();
  const { addDraft } = useDraft();
  const [loading, setLoading] = useState<boolean>(false);
  const [userNewMessage, setUserNewMessage] = useState<string>("");

  function newMessage(message: Message): void {
    if (!!message && !!message.message.trim().length) {
      addDialog(message);
    } else {
      const errorMsg = "Mensagem não pode ser vazia";
      alert(errorMsg);
      console.error(errorMsg);
    }
  }

  function handleSubmit(newMsg: string): void {
    newMessage({
      message: newMsg,
      msg_type: MSG_TYPES.USER_TEXT,
      timestamp: String(new Date()),
    });
    setLoading(true);
    sendMessage(currentChatId || "", newMsg).then(
      (data: Conversation | RequestError) => {
        setDialogs((data as Conversation).history);
        addDraft((data as Conversation).draft);
        setUserNewMessage("");
        setLoading(false);
      }
    );
  }

  function handleFormSubmit(event: FormEvent, newMsg: string): void {
    event.preventDefault();
    handleSubmit(`${newMsg}`);
  }

  function handleKeyDown(event: KeyboardEvent, newMsg: string): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(newMsg);
    }
  }

  return (
    <form
      className={style.wrapper}
      onSubmit={(e) => handleFormSubmit(e, userNewMessage)}
    >
      <textarea
        value={userNewMessage}
        disabled={loading}
        onKeyDown={(e) => handleKeyDown(e, userNewMessage)}
        onChange={(e) => setUserNewMessage(e.target.value)}
        className={style.textarea}
        placeholder="Escreva aqui sua mensagem... (Shift + Enter para quebrar linha)"
      ></textarea>
      <button type="submit" disabled={loading}>
        enviar
      </button>
    </form>
  );
}
