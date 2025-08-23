"use client";

import MarkdownView from "react-showdown";
import { MSG_TYPES } from "@/app/services/services";
import style from "./dialog-msg.module.css";

interface DialogMsgProps {
  msgType: MSG_TYPES;
  message: string;
  timeStamp: string;
}

export default function DialogMsg(props: Readonly<DialogMsgProps>) {
  return (
    <p
      className={
        props.msgType === MSG_TYPES.AI_TEXT
          ? style.iaMessage
          : style.userMessage
      }
    >
      <MarkdownView
        markdown={props.message}
        options={{ tables: true, emoji: true }}
      />

      <br />
      <div className={style.timeStamp}>{props.timeStamp}</div>
    </p>
  );
}
