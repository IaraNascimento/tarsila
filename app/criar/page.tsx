"use client";

import { useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useDialog } from "../contexts/DialogsProvider";
import ProtectedRoute from "../auth/ProtectedRoute";
import { firstLoad, Conversation } from "../services/services";
import Chat from "../components/chat/chat";
import Draft from "../components/draft/draft";
import style from "./page.module.css";

export default function Criar() {
  let renderAfterCalled = false;
  // const { push } = useRouter();
  const { currentUser, currentChatId } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const { setDialogs } = useDialog();

  useEffect(() => {
    if (!renderAfterCalled) {
      showLoader();
      if (!!currentUser && currentUser.email && currentChatId) {
        firstLoad(currentUser.email, currentChatId)
          .then((data) => {
            setDialogs((data as Conversation).history);
          })
          .catch(() => {
            // push("/login");
          })
          .finally(() => hideLoader());
      } else {
        // push("/login");
      }
      renderAfterCalled = true;
    }
  }, []);

  return (
    <ProtectedRoute>
      <main className={style.wrapper}>
        <Draft />
        <Chat />
      </main>
    </ProtectedRoute>
  );
}
