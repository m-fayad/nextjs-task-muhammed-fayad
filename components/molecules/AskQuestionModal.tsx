"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const STORAGE_KEY = "askQuestionDraft";

export const AskQuestionModal = ({
  isOpen,
  onClose,
  onQuestionSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onQuestionSubmit: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  // Load draft from localStorage on mount
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setText(saved);
    }
  }, [isOpen]);

  // Save draft to localStorage whenever text changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (text.trim() === "") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, text);
      }
    }
  }, [text]);

  const handleSubmit = () => {
    if (text.trim()) {
      onQuestionSubmit(text); // 👈 Delegate to parent
      localStorage.removeItem(STORAGE_KEY);
      setText("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your question..."
            className="w-full min-h-36 p-4 rounded-md bg-white shadow-xs placeholder:text-[#939393] border"
          />
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="px-8 py-3 bg-primary text-white flex items-center gap-1"
          >
            Submit Question
            <ArrowRight className="size-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
