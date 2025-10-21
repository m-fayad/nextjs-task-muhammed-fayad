"use client";

import { useState } from "react";
import { AskQuestionModal } from "./AskQuestionModal";
import { useCommentsContext } from "@/context/CommentsContext";

const SectionalButtons = () => {
  const [isAskQuestionOpen, setAskQuestionOpen] = useState(false);
  const { addComment } = useCommentsContext();

  const handleQuestionSubmit = (text: string) => {
    addComment(text);
  };

  return (
    <>
      <div className="lg:-mt-6 xl:mt-0 mb-8 md:mb-0 text-sm flex flex-wrap items-center gap-4 col-start-1">
        <a
          href="#curriculum"
          className="px-3 py-1 rounded-[30px] border font-bold border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10"
        >
          Curriculum
        </a>
        <a
          href="#comments"
          className="px-3 py-1 rounded-[30px] border font-bold border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10"
        >
          Comments
        </a>
        <button
          onClick={() => setAskQuestionOpen(true)}
          className="px-3 py-1 rounded-[30px] border font-bold border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10 text-left"
        >
          Ask a Question
        </button>
        <a
          href="#leaderboard"
          className="px-3 py-1 rounded-[30px] border font-bold border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10"
        >
          Leaderboard
        </a>
      </div>

      <AskQuestionModal
        isOpen={isAskQuestionOpen}
        onClose={() => setAskQuestionOpen(false)}
        onQuestionSubmit={handleQuestionSubmit}
      />
    </>
  );
};

export default SectionalButtons;
