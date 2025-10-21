"use client";

import { createContext, useContext, ReactNode } from "react";
import { useComments } from "@/hooks/useComments";
import { CommentData } from "@/types";

type CommentsContextType = {
  comments: CommentData[];
  addComment: (text: string) => void;
};

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const { comments, addComment } = useComments();

  return (
    <CommentsContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useCommentsContext must be used within CommentsProvider");
  }
  return context;
};
