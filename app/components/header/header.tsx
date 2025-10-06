"use client";

import { useAuth } from "@/app/contexts/AuthProvider";
import { useLoader } from "@/app/contexts/LoaderProvider";
import style from "./header.module.css";
import { useState } from "react";
import MenuButton from "../menu-button/menu-button";
import NavMenu from "../nav-menu/nav-menu";
import { useHistory } from "@/app/contexts/HistoryProvider";

export default function Header() {
  const { isAuthenticated, currentUser, logOut } = useAuth();
  const { chatsList } = useHistory();
  const { showLoader } = useLoader();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

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
          { chatsList.length > 0 
            && <>
              <MenuButton onClick={handleMenu} />
              { isMenuOpen && <NavMenu menuItems={chatsList} /> }
            </>
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
