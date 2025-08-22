import { useEffect, useRef } from "react";
import style from "./dialog.module.css";
import { Message, MSG_TYPES } from "@/app/services/services";

interface DialogProps {
  dialog: Array<Message>;
}

export default function Dialog(props: Readonly<DialogProps>) {
  const targetRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [props.dialog]);

  return (
    <div className={style.wrapper} ref={targetRef}>
      <div className={style.inner}>
        {props.dialog.map((dialog, index) => (
          <p
            className={dialog.msg_type === MSG_TYPES.AI_TEXT ? style.iaMessage : style.message}
            key={index}
          >
            {dialog.message}
          </p>
        ))}
      </div>
    </div>
  );
}
