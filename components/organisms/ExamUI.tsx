"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, Clock, CheckCircle2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question:
      "What is the primary benefit of Server-Side Rendering (SSR) in Next.js?",
    options: [
      "Faster client-side navigation",
      "Improved SEO and faster initial page load",
      "Reduced server load",
      "Enables real-time database connections",
    ],
    correctAnswer: "Improved SEO and faster initial page load",
  },
  {
    id: 2,
    question:
      'When designing a scalable frontend, what does "code splitting" refer to?',
    options: [
      "Splitting your CSS into multiple files",
      "Using multiple git branches",
      "Breaking down the JavaScript bundle into smaller chunks loaded on demand",
      "Dividing components into 'atoms' and 'molecules'",
    ],
    correctAnswer:
      "Breaking down the JavaScript bundle into smaller chunks loaded on demand",
  },
  {
    id: 3,
    question:
      "In Next.js, what is the purpose of the `getStaticProps` function?",
    options: [
      "To fetch data at request time for SSR",
      "To fetch data on the client-side after hydration",
      "To fetch data at build time for Static Site Generation (SSG)",
      "To define API routes within the `pages` directory",
    ],
    correctAnswer:
      "To fetch data at build time for Static Site Generation (SSG)",
  },
  {
    id: 4,
    question: 'What is a "design system" in frontend development?',
    options: [
      "A CSS framework like Tailwind or Bootstrap",
      "A set of reusable components and guidelines to ensure brand consistency",
      "A specific folder structure for your project",
      "A tool for creating mockups like Figma or Sketch",
    ],
    correctAnswer:
      "A set of reusable components and guidelines to ensure brand consistency",
  },
  {
    id: 5,
    question: 'What is "hydration" in the context of SSR?',
    options: [
      "The process of fetching data from a database",
      "Minifying the JavaScript bundle",
      "The process where client-side JavaScript adds interactivity to the server-rendered HTML",
      "A security measure to prevent XSS attacks",
    ],
    correctAnswer:
      "The process where client-side JavaScript adds interactivity to the server-rendered HTML",
  },
];

const paginationDots = [1, 2, 3, 4, 5];

type ExamUIProps = {
  onClose: () => void;
};

const CompletionScreen: React.FC<ExamUIProps> = ({ onClose }) => (
  <div className="flex flex-1 flex-col items-center justify-center rounded-t-3xl bg-white p-5 text-gray-900 shadow-xl dark:bg-gray-900 dark:text-gray-100">
    <CheckCircle2 className="h-24 w-24 text-green-500" />
    <h2 className="mt-4 text-2xl font-bold">Congratulations!</h2>
    <p className="mt-2 text-center text-muted-foreground">
      You have successfully passed the exam.
    </p>
    <Button onClick={onClose} className="mt-8">
      Finish Exam
    </Button>
  </div>
);

export const ExamUI: React.FC<ExamUIProps> = ({ onClose }) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [userSelection, setUserSelection] = useState<string | null>(null); // Stores the final answer
  const [quizState, setQuizState] = useState<
    "answering" | "answered_correct" | "answered_wrong" | "completed"
  >("answering");

  const currentQuestion = useMemo(
    () => quizData[activeQuestionIndex],
    [activeQuestionIndex]
  );

  const handleNextQuestion = () => {
    if (activeQuestionIndex < quizData.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
      setQuizState("answering");
      setSelectedValue(null);
      setUserSelection(null);
    } else {
      setQuizState("completed");
    }
  };

  const handleAnswerSelect = (option: string) => {
    if (quizState !== "answering") return;

    setSelectedValue(option);
    setUserSelection(option); // Lock in the user's choice
    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setQuizState("answered_correct");
      // Automatically move to next question after 1 second
      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    } else {
      // Wait for user to click "Next"
      setQuizState("answered_wrong");
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-blue-800 p-4 pt-6 text-white dark:bg-blue-900">
      <header className="flex w-full items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10"
          onClick={onClose}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black shadow-md">
          <Clock className="h-5 w-5" />
          <span className="font-bold">09:32</span>
        </div>
        <div className="w-10"></div>
      </header>

      <nav className="my-6 flex items-center justify-center gap-3">
        {paginationDots.map((num) => (
          <div
            key={num}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-transparent font-bold text-white",
              num - 1 === activeQuestionIndex
                ? "border-0 bg-white text-blue-800" // Current
                : num - 1 < activeQuestionIndex
                ? "border-blue-300 bg-blue-300/50 text-white" // Answered
                : "opacity-50" // Upcoming
            )}
          >
            {num}
          </div>
        ))}
      </nav>

      {quizState === "completed" ? (
        <CompletionScreen onClose={onClose} />
      ) : (
        <main className="flex-1 flex-col rounded-t-3xl bg-white p-5 text-gray-900 shadow-xl dark:bg-gray-900 dark:text-gray-100">
          <h2 className="mb-6 text-lg font-semibold">
            <span className="mr-2">{currentQuestion.id}.</span>
            {currentQuestion.question}
          </h2>

          <RadioGroup
            value={selectedValue || ""}
            onValueChange={handleAnswerSelect}
            disabled={quizState !== "answering"}
            className="space-y-4"
          >
            {currentQuestion.options.map((option) => {
              const isSelected = selectedValue === option;
              const isCorrectAnswer = currentQuestion.correctAnswer === option;
              const isWrongSelection =
                isSelected && quizState === "answered_wrong";

              let stateStyles = "";
              if (quizState === "answered_correct" && isCorrectAnswer) {
                stateStyles =
                  "border-green-600 bg-green-100 dark:bg-green-900/50 dark:border-green-500";
              } else if (quizState === "answered_wrong") {
                if (isWrongSelection) {
                  stateStyles =
                    "border-red-600 bg-red-100 dark:bg-red-900/50 dark:border-red-500";
                } else if (isCorrectAnswer) {
                  stateStyles =
                    "border-green-600 bg-green-100 dark:bg-green-900/50 dark:border-green-500";
                }
              } else if (isSelected && quizState === "answering") {
                stateStyles =
                  "border-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:border-blue-500";
              }

              return (
                <Label
                  key={option}
                  htmlFor={option}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 font-medium transition-all",
                    stateStyles,
                    quizState === "answering"
                      ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      : "cursor-not-allowed",
                    "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                  )}
                >
                  <RadioGroupItem
                    value={option}
                    id={option}
                    className={cn(
                      "h-5 w-5 border-gray-400",
                      isWrongSelection
                        ? "border-red-600 text-red-600"
                        : isCorrectAnswer && quizState !== "answering"
                        ? "border-green-600 text-green-600"
                        : isSelected && quizState === "answering"
                        ? "border-blue-600 text-blue-600"
                        : ""
                    )}
                  />
                  {option}
                </Label>
              );
            })}
          </RadioGroup>

          {quizState === "answered_wrong" && (
            <Button onClick={handleNextQuestion} className="mt-6 w-full">
              Next Question
            </Button>
          )}
        </main>
      )}
    </div>
  );
};
