"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/contexts/AuthProvider";
import { useDialog } from "@/app/contexts/DialogsProvider";
import { useDraft } from "@/app/contexts/DraftProvider";
import {
  addFile,
  Conversation,
  Message,
  MSG_TYPES,
  RequestError,
  sendMessage,
} from "@/app/services/services";
import style from "./chat-input.module.css";

export default function ChatInput() {
  const uploadFileLink = useRef<HTMLInputElement>(null);
  const { currentChatId, currentUser} = useAuth();
  const { addDialog, setDialogs } = useDialog();
  const { addDraft } = useDraft();
  const [loading, setLoading] = useState<boolean>(false);
  const [userNewMessage, setUserNewMessage] = useState<string>("");
  const [filesToSend, setFilesToSend] = useState<Array<string>>([]);

  function newMessage(message: Message): void {
    if (!!message && !!message.message.trim().length) {
      addDialog(message);
    } else {
      const errorMsg = "Mensagem não pode ser vazia";
      alert(errorMsg);
      console.error(errorMsg);
    }
  }

  function handleSubmit(newMsg: string): void {
    const chatId = currentChatId ? currentChatId : null
    const user = currentUser?.email ? currentUser.email : ""
    newMessage({
      message: newMsg,
      msg_type: MSG_TYPES.USER_TEXT,
      timestamp: String(new Date()),
    });
    setLoading(true);
    sendMessage(user, chatId, newMsg, filesToSend).then(
      (data: Conversation | RequestError) => {
        setDialogs((data as Conversation).history);
        addDraft((data as Conversation).draft);
        setUserNewMessage("");
        setFilesToSend([]);
        setLoading(false);
      }
    );
  }

  function handleFormSubmit(event: FormEvent, newMsg: string): void {
    event.preventDefault();
    handleSubmit(`${newMsg}`);
  }

  function handleKeyDown(event: KeyboardEvent, newMsg: string): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(newMsg);
    }
  }

  function removeFromSendList(itemToRemove: string): void {
    setFilesToSend((prev) => prev.filter((item) => item !== itemToRemove));
  }

  function saveFiles(files: Array<File>): void {
    const chatId = currentChatId ? currentChatId : null
    const user = currentUser?.email ? currentUser.email : ""
    if (files.length) {
      setLoading(true);
      addFile(user, chatId, files)
        .then((filesIds) => {
          if ((filesIds as Array<string>).length) {
            setFilesToSend((prev) => [
              ...prev.concat(filesIds as Array<string>),
            ]);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <>
      <hr className={style.line} />
      <form
        className={style.wrapper}
        onSubmit={(e) => handleFormSubmit(e, userNewMessage)}
      >
        <textarea
          value={userNewMessage}
          disabled={loading}
          onKeyDown={(e) => handleKeyDown(e, userNewMessage)}
          onChange={(e) => setUserNewMessage(e.target.value)}
          className={style.textarea}
          placeholder="Escreva aqui sua mensagem... (Shift + Enter para quebrar linha)"
        />
        <div className={style.buttonsList}>
          <button type="submit" disabled={loading}>
            enviar
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => uploadFileLink.current?.click()}
          >
            arquivo
          </button>
          <input
            ref={uploadFileLink}
            type="file"
            multiple
            accept=".pdf,.txt,.md"
            alt="upload file"
            hidden
            onChange={(e) => saveFiles(Array.from(e.target?.files || []))}
          />
        </div>
      </form>
      <ul className={style.files}>
        {filesToSend.map((file: string, index: number) => (
          <li className={style.file} key={index}>
            {file}
            {!loading && (
              <button
                className={style.remove}
                onClick={() => removeFromSendList(file)}
              >
                X
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
