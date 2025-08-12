"use client";

import { useEffect, useState } from "react";
import Chat from "../components/chat/chat";
import Draft from "../components/draft/draft";
import style from "./page.module.css";
import { firstLoad, Greetings } from "../services/services";
import { Message } from "../components/dialog/dialog";
import { useLoader } from "../contexts/LoaderProvider";

export default function Criar() {
  const { showLoader, hideLoader } = useLoader();

  const [chatId, setChatId] = useState<string>("");
  const [drafts, setDrafts] = useState<Array<string>>([]);
  const [dialog, setDialog] = useState<Array<Message>>([]);

  function handleNewMessage(
    text: string,
    font: string,
    draft: null | string
  ): void {
    newMessage(text, font);
    if (font === "ia" && draft) {
      setDrafts((prev) => [...prev, draft]);
    }
  }

  function newMessage(text: string, font: string): void {
    if (text.trim().length > 0) {
      setDialog((prev) => [...prev, { text, time: new Date(), font }]);
    } else {
      const errorMsg = "Mensagem não pode ser vazia";
      alert(errorMsg);
      console.error(errorMsg);
    }
  }

  useEffect(() => {
    showLoader();
    firstLoad()
      .then((data) => {
        setChatId((data as Greetings).chat_id);
        newMessage((data as Greetings).greetings, "ia");
      })
      .finally(() => hideLoader());
  }, []);

  return (
    <main className={style.wrapper}>
      <Draft draft={drafts.at(-1) || ""} />
      <Chat
        dialog={dialog}
        chatId={chatId}
        newMessage={(text, font, draft) => handleNewMessage(text, font, draft)}
      />
    </main>
  );
}
