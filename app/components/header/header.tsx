"use client";

import { useAuth } from "@/app/contexts/AuthProvider";
import { useLoader } from "@/app/contexts/LoaderProvider";
import style from "./header.module.css";

export default function Header() {
  const { currentUser, logOut } = useAuth();
  const { showLoader } = useLoader();

  function leave() {
    showLoader();
    logOut();
  }

  return (
    <header className={style.header}>
      {!!currentUser && (
        <>
          <div className={style.userName}>
            Bem vinde,
            <br />
            {currentUser.displayName}
          </div>
          <button onClick={() => leave()}>sair</button>
        </>
      )}
    </header>
  );
}
