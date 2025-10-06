"use client";

import { useEffect } from "react";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useLoader } from "../contexts/LoaderProvider";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthProvider";
import style from "./page.module.css";

export default function Home() {
  const { push } = useRouter();
  const { showLoader, hideLoader } = useLoader();
    const { isAuthenticated } = useAuth();
        
  useEffect(() => {
    showLoader();
    if (!isAuthenticated) {
      push("/login");
    } else {
      hideLoader();
    }
  }, [hideLoader, isAuthenticated, push, showLoader]);

  return (
    <ProtectedRoute>
      <main className={style.wrapper}>
        <div className={style.panel}>
          <button>Criar novo</button>
          <button>Continuar</button>
        </div>
      </main>
    </ProtectedRoute>
  );
}
