"use client";

import { useEffect, useRef } from "react";
import { useDialog } from "@/app/contexts/DialogsProvider";
import { MSG_TYPES } from "@/app/services/services";
import style from "./dialog.module.css";

export default function Dialog() {
  const targetRef = useRef<null | HTMLDivElement>(null);
  const { dialogs } = useDialog();

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [dialogs]);

  return (
    <div className={style.wrapper} ref={targetRef}>
      <div className={style.inner}>
        {dialogs.map((dialog, index) => (
          <p
            className={
              dialog.msg_type === MSG_TYPES.AI_TEXT
                ? style.iaMessage
                : style.message
            }
            key={index}
          >
            {dialog.message}
          </p>
        ))}
      </div>
    </div>
  );
}
