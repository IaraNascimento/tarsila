"use client";

import { useEffect, useState } from "react";
import Chat from "../components/chat/chat";
import Draft from "../components/draft/draft";
import style from "./page.module.css";
import { firstLoad, Greetings } from "../services/services";
import { Message } from "../components/dialog/dialog";

export default function Criar() {
  const [chatId, setChatId] = useState<string>("");
  const [dialog, setDialog] = useState<Array<Message>>([]);

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
    firstLoad().then((data) => {
      setChatId((data as Greetings).chat_id);
      newMessage((data as Greetings).greetings, "ia");
    });
  }, []);

  return (
    <main className={style.wrapper}>
      <Draft />
      <Chat
        dialog={dialog}
        chatId={chatId}
        newMessage={(text, font) => newMessage(text, font)}
      />
    </main>
  );
}
