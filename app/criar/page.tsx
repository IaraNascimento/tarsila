"use client";

import { useEffect, useState } from "react";
import Chat from "../components/chat/chat";
import Draft from "../components/draft/draft";
import style from "./page.module.css";
import { firstLoad, Greetings } from "../services/services";

export default function Criar() {
  const [chatId, setChatId] = useState<string>("");
  const [dialog, setDialog] = useState<Array<string>>([]);

  function newMessage(text: string): void {
    if (text.trim().length > 0) {
      setDialog((prev) => [...prev, text]);
    } else {
      const errorMsg = "Mensagem não pode ser vazia";
      alert(errorMsg);
      console.error(errorMsg);
    }
  }

  useEffect(() => {
    firstLoad().then((data) => {
      setChatId((data as Greetings).chat_id);
      newMessage((data as Greetings).greetings);
    });
  }, []);

  return (
    <main className={style.wrapper}>
      <Draft />
      <Chat
        dialog={dialog}
        chatId={chatId}
        newMessage={(text) => newMessage(text)}
      />
    </main>
  );
}
