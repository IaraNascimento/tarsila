"use client";

import ChatInput from "../chat-input/chat-input";
import Dialog from "../dialog/dialog";
import style from "./chat.module.css";

export default function Chat() {
  return (
    <div className={style.wrapper}>
      <Dialog />
      <ChatInput />
    </div>
  );
}
