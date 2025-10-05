"use client";

import { useAuth } from "@/app/contexts/AuthProvider";
import { useLoader } from "@/app/contexts/LoaderProvider";
import style from "./header.module.css";
import { useCallback, useEffect, useState } from "react";
import { ChatType, getPastChats, PastChats } from "@/app/services/services";
import MenuButton from "../menu-button/menu-button";
import NavMenu from "../nav-menu/nav-menu";

export default function Header() {
  const { isAuthenticated, currentUser, logOut } = useAuth();
  const { showLoader } = useLoader();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [chatsList, setChatsList] = useState<ChatType[]>([]);

  const getPastChatsList = useCallback(() => {
    if (!!currentUser && currentUser.email) {
      getPastChats(currentUser.email)
        .then((data) => {
          const pastChats = data as PastChats
          setChatsList(pastChats.chats)
        })
    }
  }, [currentUser])

  useEffect(() => {
    if (isMenuOpen) getPastChatsList()
  }, [getPastChatsList, isMenuOpen])

  function handleMenu() {
    setMenuOpen(!isMenuOpen)
  };

  function leave() {
    showLoader();
    logOut();
  }

  return (
    isAuthenticated && (
      <header className={style.header}>
        <div className={style.navContainer}>
          <MenuButton onClick={handleMenu} />
          {
            isMenuOpen && <NavMenu menuItems={chatsList} />
          }
        </div>
        <div>
          <div className={style.userName}>
            {currentUser?.displayName}
          </div>
          <button onClick={() => leave()}>sair</button>
        </div>
      </header>
    )
  );
}
