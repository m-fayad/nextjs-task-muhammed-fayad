"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import CommentsList from "../molecules/comments-list";
import { useCommentsContext } from "@/context/CommentsContext";

const CommentsSection = () => {
  const { comments, addComment } = useCommentsContext();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      addComment(text);
      setText("");
    }
  };

  return (
    <section id="comments" className="space-y-8 col-start-1 mt-4">
      <h2 className="text-lg font-bold mb-4">Comments</h2>

      <CommentsList comments={comments} />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="w-full min-h-36 p-4 rounded-md bg-white shadow-xs placeholder:text-[#939393]"
      />

      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="px-8 py-3 rounded-sm bg-primary text-white flex justify-center items-center gap-1 disabled:opacity-50"
        type="button"
      >
        Submit Review
        <ArrowRight className="size-4" />
      </button>
    </section>
  );
};

export default CommentsSection;
