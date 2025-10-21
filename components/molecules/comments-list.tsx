import Comment from "../atoms/comment";
import { CommentData } from "@/types";

interface CommentsListProps {
  comments: CommentData[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <section className="flex flex-col gap-6 divide-y-2">
      {comments.map((comment, index) => (
        <Comment
          key={index}
          avatar={comment.avatar}
          username={comment.username}
          date={comment.date}
          content={comment.content}
        />
      ))}
    </section>
  );
};

export default CommentsList;
