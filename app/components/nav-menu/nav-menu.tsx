"use client";

import { ChatType } from "@/app/services/services";
import style from "./nav-menu.module.css";

interface NavMenuProps {
  menuItems: ChatType[]
}

export default function NavMenu({ menuItems }: NavMenuProps) {
  function getItemLabel(menuItem: ChatType) {
    if (!menuItem.title) {
      const date = new Date(parseInt(menuItem.chat_id));
      
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })
    }
    return menuItem.title;
  };

  return (
    <ul className={style.container} >
      {
        menuItems.map(((item, i) => (
          <li key={i} className={style.item}>
            {getItemLabel(item)}
          </li>
        )))
      }
    </ul>
  );
};
