"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface DraftContext {
  drafts: Array<string>;
  lastDraft: string;
  resetDrafts: () => void;
  addDraft: (newDraft: string) => void;
  setdrafts: (newDrafts: Array<string>) => void;
}

interface DraftContextProvider {
  children: ReactNode;
}

export const DraftContext = createContext<DraftContext | undefined>(undefined);

export const useDraft = () => {
  const context = useContext(DraftContext);
  if (!context) {
    throw new Error("useDraft must be used within a DraftProvider");
  }
  return context;
};

export const DraftProvider: React.FC<DraftContextProvider> = ({ children }) => {
  const [drafts, setDratfs] = useState<Array<string>>([]);

  const contextValue: DraftContext = {
    drafts,
    lastDraft: drafts[drafts.length - 1],
    resetDrafts: () => {
      setDratfs([]);
    },
    addDraft: (newDraft) => {
      setDratfs((prev) => [...prev, newDraft]);
    },
    setdrafts: (newDrafts) => {
      setDratfs(newDrafts);
    },
  };

  return (
    <DraftContext.Provider value={contextValue}>
      {children}
    </DraftContext.Provider>
  );
};
