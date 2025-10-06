"use client";

import { ChatId, ChatType } from "../services/services";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface HistoryContextType {
  chatsList: ChatType[];
  currentChatId: ChatId;
  updateChatsList: (newChatsList: ChatType[]) => void;
  updateChatId: (newChatId: ChatId) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);
type HistoryProviderProps = {
  children: ReactNode;
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};

export const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const [pastChatsList, setPastChatsList] = useState<ChatType[]>([]);
  const [currentChatId, setCurrentChatId] = useState<ChatId>(null);

  useEffect(() => {
    setCurrentChatId(
      new Date().getTime()
      // 1759510342646
    );
  }, []);

  const value = {
    chatsList: pastChatsList,
    currentChatId,
    updateChatsList: (newChatsList: ChatType[]) => {
      setPastChatsList(newChatsList);
    },
    updateChatId: (newChatId: ChatId) => {
      setCurrentChatId(newChatId);
    },
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};
