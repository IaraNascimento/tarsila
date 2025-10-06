"use client";

import { ChatType } from "@/app/services/services";
import { useHistory } from "@/app/contexts/HistoryProvider";
import style from "./nav-menu.module.css";

export default function NavMenu() {
  const { chatsList } = useHistory()
  const list = chatsList.map(item => getItemLabel(item))

  function getItemLabel(menuItem: ChatType) {
    if (!menuItem.title && menuItem.chat_id) {
      const id = parseInt(menuItem.chat_id);
      const date = new Date(id);
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
        list.map(((item, i) => (
          <li key={i} className={style.item}>
            { item }
          </li>
        )))
      }
    </ul>
  );
};
