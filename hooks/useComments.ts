import { useState, useEffect } from "react";
import { CommentData } from "@/types";

const STORAGE_KEY = "courseComments";

const getDefaultComments = (): CommentData[] => [
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
    avatar: "https://picsum.photos/105",
    username: "Peter Jones",
    date: "Oct 19, 2021",
    content: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const useComments = () => {
  const [comments, setComments] = useState<CommentData[]>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : getDefaultComments();
    }
    return getDefaultComments();
  });

  // Save to sessionStorage whenever comments change
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    }
  }, [comments]);

  const addComment = (content: string) => {
    const newComment: CommentData = {
      avatar: "https://picsum.photos/150",
      username: "Muhammed Fayad",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      content: content.trim(),
    };
    setComments((prev) => [newComment, ...prev]); // prepend new comment
  };

  return { comments, addComment };
};
