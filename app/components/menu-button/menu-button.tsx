"use client";

import MenuIcon from "../../icons/menu"
import style from "./menu-button.module.css";

interface MenuButtonProps {
  onClick: () => void;
}

export default function MenuButton({ onClick }: MenuButtonProps ) {
  const iconSize = (size: string) => ({ width: size, height: size })
  
  return (
    <button className={style.button} onClick={onClick}>
      <MenuIcon {...iconSize("1rem")} />
    </button>
  );
};
