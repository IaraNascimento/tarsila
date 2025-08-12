import style from "./loader.module.css";

export default function Loader() {
  return (
    <div className={style.background}>
      <div className={style.loader}></div>
    </div>
  );
}
