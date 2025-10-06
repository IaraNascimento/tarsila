"use client";

import { useCallback, useEffect } from "react";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useLoader } from "../contexts/LoaderProvider";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthProvider";
import style from "./page.module.css";
import { getPastChats, PastChats } from "../services/services";
import { useHistory } from "../contexts/HistoryProvider";

export default function Home() {
  const { push } = useRouter();
  const { showLoader, hideLoader } = useLoader();
  const { isAuthenticated, currentUser } = useAuth();
  const { updateChatsList } = useHistory();

  const loadChatList = useCallback(() => {
    if (!!currentUser && currentUser.email) {
      getPastChats(currentUser.email)
        .then((data) => {
          const pastChats = data as PastChats
          if (pastChats.chats.length > 0) {
              updateChatsList(pastChats.chats);
          }
        })
    }
  }, [currentUser, updateChatsList])
        
  useEffect(() => {
    showLoader();
    if (!isAuthenticated) {
      push("/login");
    } else {
      loadChatList();
      hideLoader();
    }
  }, [hideLoader, isAuthenticated, loadChatList, push, showLoader]);

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
