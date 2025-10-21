export type CommentData = {
  avatar: string;
  username: string;
  date: string;
  content: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};
