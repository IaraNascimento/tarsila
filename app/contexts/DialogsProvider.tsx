"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { Message } from "../services/services";

interface DialogContext {
  dialogs: Array<Message>;
  resetDialogs: () => void;
  addDialog: (newDialog: Message) => void;
  setDialogs: (newDialogs: Array<Message>) => void;
}

interface DialogContextProvider {
  children: ReactNode;
}

export const DialogContext = createContext<DialogContext | undefined>(
  undefined
);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

export const DialogProvider: React.FC<DialogContextProvider> = ({
  children,
}) => {
  const [dialogs, setDratfs] = useState<Array<Message>>([]);

  const contextValue: DialogContext = {
    dialogs,
    resetDialogs: () => {
      setDratfs([]);
    },
    addDialog: (newDialog) => {
      setDratfs((prev) => [...prev, newDialog]);
    },
    setDialogs: (newDialogs) => {
      setDratfs(newDialogs);
    },
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};
