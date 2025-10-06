"use client";

import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useDialog } from "../contexts/DialogsProvider";
import { useHistory } from "../contexts/HistoryProvider";
import ProtectedRoute from "../auth/ProtectedRoute";
import {
  startChat,
  Conversation,
} from "../services/services";
import Chat from "../components/chat/chat";
import Draft from "../components/draft/draft";
import style from "./page.module.css";

export default function Criar() {
  let renderAfterCalled = false;
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { currentChatId } = useHistory();
  const { showLoader, hideLoader } = useLoader();
  const { setDialogs } = useDialog();

  const chatId = currentChatId ? currentChatId : null

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 980);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!renderAfterCalled) {
      showLoader();
      if (!!currentUser && currentUser.email) {
        startChat(currentUser.email, chatId)
          .then((data) => {
            setDialogs((data as Conversation).history);
          })
          .finally(() => hideLoader());
      }
      renderAfterCalled = true;
    }
  }, []);

  return (
    <ProtectedRoute>
      <main className={style.wrapper}>
        <div
          className={`${style.slider} ${
            showResult ? style.showResult : style.showChat
          }`}
        >
          <div className={style.panel}>
            <Draft />
          </div>
          <div className={style.panel}>
            <Chat />
          </div>
        </div>

        {isMobile && (
          <button
            className={`${style.btnChangeView} ${
              showResult ? style.showResult : style.showChat
            }`}
            onClick={() => setShowResult((prev) => !prev)}
          >
            {showResult ? "< ver o resultado" : "voltar ao chat >"}
          </button>
        )}
      </main>
    </ProtectedRoute>
  );
}
