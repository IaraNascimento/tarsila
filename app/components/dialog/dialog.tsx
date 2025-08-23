"use client";

import { useEffect, useRef } from "react";
import { useDialog } from "@/app/contexts/DialogsProvider";
import style from "./dialog.module.css";
import DialogMsg from "../dialog-msg/dialog-msg";

export default function Dialog() {
  const targetRef = useRef<null | HTMLDivElement>(null);
  const { dialogs } = useDialog();

  function normalizeDate(t: string): string {
    const newDate = new Date(t);
    return (
      newDate.getHours().toString().padStart(2, "0") +
      ":" +
      newDate.getMinutes().toString().padStart(2, "0")
    );
  }

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [dialogs.length]);

  return (
    <div className={style.wrapper} ref={targetRef}>
      <div className={style.inner}>
        {dialogs.map((dialog) => (
          <DialogMsg
            key={String(dialog.timestamp)}
            timeStamp={normalizeDate(dialog.timestamp)}
            message={dialog.message}
            msgType={dialog.msg_type}
          />
        ))}
      </div>
    </div>
  );
}
