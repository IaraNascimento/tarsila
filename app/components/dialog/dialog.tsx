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
  return (
    <div className={style.wrapper}>
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
