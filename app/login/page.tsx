"use client";

import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/navigation";
import style from "./page.module.css";

export default function Login() {
  const { push } = useRouter();
  const { showLoader, hideLoader } = useLoader();
  const { currentUser, signIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function login() {
    showLoader();
    if (!currentUser) {
      signIn()
        .then(() => {})
        .catch(() => {
          setErrorMsg("Erro ao tentar logar.");
          hideLoader();
        })
        .finally(() => {});
    }
  }

  useEffect(() => {
    if (!!currentUser) {
      setErrorMsg(null);
      push("criar");
    }
  }, [currentUser]);

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <main>
      <div className={style.loginBox}>
        <button onClick={() => login()}>entrar com google</button>
        {errorMsg && <p>{errorMsg}</p>}
      </div>
    </main>
  );
}
