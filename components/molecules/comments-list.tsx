import Comment from "../atoms/comment";

const data = [
  {
    avatar: "https://picsum.photos/200",
    username: "Student Name Goes Here",
    date: "Oct 10, 2021",
    content: "This is a great course! I learned a lot.",
  },
  {
    avatar: "https://picsum.photos/240",
    username: "Jane Smith",
    date: "Oct 15, 2021",
    content: "I have a question about the second video. Can someone help me?",
  },
  {
    avatar: "https://picsum.photos/100",
    username: "Peter Jones",
    date: "Oct 19, 2021",
    content: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const CommentsList = () => {
  return (
    <section className="flex flex-col gap-6 divide-y-2">
      {data.map((comment, index) => (
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
