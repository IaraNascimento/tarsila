"use client";

import { ChatId, ChatType, Conversation, startChat } from "@/app/services/services";
import { useHistory } from "@/app/contexts/HistoryProvider";
import style from "./nav-menu.module.css";
import { useAuth } from "@/app/contexts/AuthProvider";
import { useDialog } from "@/app/contexts/DialogsProvider";

export default function NavMenu() {
  const { chatsList, updateChatId } = useHistory();
  const { currentUser } = useAuth()
    const { setDialogs } = useDialog();

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

  function loadChat (chatId: ChatId) {
    updateChatId(chatId);
    if (!!currentUser && currentUser.email) {
      startChat(currentUser.email, chatId)
        .then((data) => {
          setDialogs((data as Conversation).history);
        });
    }
  }

  return (
    <ul className={style.container} >
      {
        chatsList.map(((item, i) => (
          <li key={i} className={style.item} onClick={() => loadChat(item.chat_id)}>
            { getItemLabel(item) }
          </li>
        )))
      }
    </ul>
  );
};
