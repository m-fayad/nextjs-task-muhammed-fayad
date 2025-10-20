import CommentsList from "../molecules/comments-list";

const CommentsSections = () => {
  return (
    <section className="space-y-8 col-start-1 mt-4">
      <h2 className="text-lg font-bold mb-4">Comments</h2>

      <CommentsList />
    </section>
  );
};

export default CommentsSections;
