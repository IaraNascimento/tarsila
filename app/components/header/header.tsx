"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthProvider";
import { useLoader } from "@/app/contexts/LoaderProvider";
import style from "./header.module.css";

export default function Header() {
  const { push } = useRouter();
  const { currentUser, logOut } = useAuth();
  const { showLoader } = useLoader();

  function goToLogin() {
    push("login");
  }

  function leave() {
    showLoader();
    logOut()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        goToLogin();
      });
  }

  return (
    <header className={style.header}>
      {!currentUser && <button onClick={() => goToLogin()}>login</button>}
      {!!currentUser && (
        <>
          <span className={style.userName}>{currentUser.displayName}</span>
          <button onClick={() => leave()}>sair</button>
        </>
      )}
    </header>
  );
}
