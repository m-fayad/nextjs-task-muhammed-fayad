import { ArrowRight } from "lucide-react";
import CommentsList from "../molecules/comments-list";

const CommentsSections = () => {
  return (
    <section id="comments" className="space-y-8 col-start-1 mt-4">
      <h2 className="text-lg font-bold mb-4">Comments</h2>

      <CommentsList />

      <textarea
        placeholder="Write a comment..."
        className="w-full min-h-36 p-4 rounded-md bg-white shadow-xs placeholder:text-[#939393]"
      />

      <button
        className="px-8 py-3 rounded-sm bg-primary text-white flex justify-center items-center gap-1"
        type="submit"
      >
        Submit Review
        <ArrowRight className="size-4" />
      </button>
    </section>
  );
};

export default CommentsSections;
