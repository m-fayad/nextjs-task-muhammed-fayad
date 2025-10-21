"use client";

import { useState } from "react";
import { AskQuestionModal } from "./AskQuestionModal";
import LeaderboardModal from "./LeaderboardModal";
import { useCommentsContext } from "@/context/CommentsContext";

const SectionalButtons = () => {
  const [isAskQuestionOpen, setAskQuestionOpen] = useState(false);
  const [isLeaderboardOpen, setLeaderboardOpen] = useState(false);
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
        <button
          onClick={() => setLeaderboardOpen(true)}
          className="px-3 py-1 rounded-[30px] border font-bold border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10 text-left"
        >
          Leaderboard
        </button>
      </div>

      <AskQuestionModal
        isOpen={isAskQuestionOpen}
        onClose={() => setAskQuestionOpen(false)}
        onQuestionSubmit={handleQuestionSubmit}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />
    </>
  );
};

export default SectionalButtons;
