"use client";

import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/navigation";
import style from "./page.module.css";

export default function Login() {
  const { push } = useRouter();
  const { showLoader, hideLoader } = useLoader();
  const { isAuthenticated, signIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function login() {
    showLoader();
    if (!isAuthenticated) {
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
    showLoader();
    if (isAuthenticated) {
      setErrorMsg(null);
      push("/home");
    } else {
      hideLoader();
    }
  }, [hideLoader, isAuthenticated, push, showLoader]);

  return (
    <main>
      <div className={style.loginBox}>
        <button onClick={() => login()} disabled={isAuthenticated}>
          entrar com google
        </button>
        {errorMsg && <p>{errorMsg}</p>}
      </div>
    </main>
  );
}
