"use client";

import { useEffect, useState } from "react";
import Chat from "../components/chat/chat";
import Draft from "../components/draft/draft";
import style from "./page.module.css";
import { firstLoad, Conversation } from "../services/services";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";

export default function Criar() {
  const { showLoader, hideLoader } = useLoader();
  const { currentUser } = useAuth();
  const [conversation, setConversation] = useState<Conversation>();

  function newMessage(messages: Conversation): void {
    const lastMessage = messages.history.at(-1)
    if (lastMessage && lastMessage.message.trim().length > 0) {
      setConversation(messages);
    } else {
      const errorMsg = "Mensagem não pode ser vazia";
      alert(errorMsg);
      console.error(errorMsg);
    }
  }

  useEffect(() => {
    showLoader();
      firstLoad(currentUser && currentUser.email || "")
        .then((data) => {
          newMessage((data as Conversation));
        })
        .finally(() => hideLoader());
  }, []);

  return (
    <main className={style.wrapper}>
      <Draft draft={conversation?.draft || ""} />
      <Chat
        chatId={currentUser?.email || "" }
        messages={conversation?.history || []}
      />
    </main>
  );
}
