"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
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
  const { currentUser } = useAuth();
  const { addDialog, setDialogs } = useDialog();
  const { addDraft } = useDraft();

  const targetRef = useRef<null | HTMLTextAreaElement>(null);

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

  function handleFormSubmit(event: FormEvent, newMsg: string): void {
    event.preventDefault();
    handleSubmit(`${newMsg}`);
  }

  function handleSubmit(newMsg: string): void {
    newMessage({
      message: newMsg,
      msg_type: MSG_TYPES.USER_TEXT,
      timestamp: String(new Date()),
    });
    setLoading(true);
    sendMessage(currentUser?.email || "", newMsg).then(
      (data: Conversation | RequestError) => {
        setDialogs((data as Conversation).history);
        addDraft((data as Conversation).draft);
        setUserNewMessage("");
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        // event.preventDefault();
        handleSubmit(userNewMessage);
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
  }, [userNewMessage]);

  return (
    <form
      className={style.wrapper}
      onSubmit={(e) => handleFormSubmit(e, userNewMessage)}
    >
      <textarea
        ref={targetRef}
        value={userNewMessage}
        disabled={loading}
        onChange={(event) => setUserNewMessage(event.target.value)}
        className={style.textarea}
        placeholder="Escreva aqui sua mensagem..."
      ></textarea>
      <button type="submit" disabled={loading}>
        enviar
      </button>
    </form>
  );
}
