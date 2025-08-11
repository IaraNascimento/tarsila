import style from "./dialog.module.css";

interface DialogProps {
  dialog: Array<string>;
}

export default function Dialog(props: Readonly<DialogProps>) {
  return (
    <div>
      {props.dialog.map((text, index) => (
        <p className={style.message} key={index}>
          {text}
        </p>
      ))}
    </div>
  );
}
