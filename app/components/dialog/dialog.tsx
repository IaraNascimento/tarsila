import { useEffect, useRef } from "react";
import style from "./dialog.module.css";

export interface Message {
  time: Date;
  text: string;
  font: string;
}

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
        {props.dialog.map((dialog) => (
          <p
            className={dialog.font === "ia" ? style.iaMessage : style.message}
            key={dialog.time.toDateString()}
          >
            {dialog.text}
          </p>
        ))}
      </div>
    </div>
  );
}
