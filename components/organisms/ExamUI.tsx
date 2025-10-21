"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronLeft, Clock, CheckCircle2, XCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { quizData } from "@/lib/constants";

const paginationDots = [1, 2, 3, 4, 5];
const TOTAL_TIME_SECONDS = 10 * 60;
const WARNING_TIME_SECONDS = 3 * 60;

type ExamUIProps = {
  onCloseAction: () => void;
};

const CompletionScreen: React.FC<ExamUIProps> = ({ onCloseAction }) => (
  <div className="flex flex-1 flex-col items-center justify-center rounded-t-3xl bg-white p-5 text-gray-900 shadow-xl dark:bg-gray-900 dark:text-gray-100">
    <CheckCircle2 className="h-24 w-24 text-green-500" />
    <h2 className="mt-4 text-2xl font-bold">Congratulations!</h2>
    <p className="mt-2 text-center text-muted-foreground">
      You have successfully passed the exam with a{" "}
      <strong>perfect score of 5/5</strong>!
    </p>
    <Button onClick={onCloseAction} className="mt-8">
      Finish Exam
    </Button>
  </div>
);

const FailureScreen: React.FC<
  ExamUIProps & { reason: string; correctAnswersCount: number }
> = ({ onCloseAction, reason, correctAnswersCount }) => (
  <div className="flex flex-1 flex-col items-center justify-center rounded-t-3xl bg-white p-5 text-gray-900 shadow-xl dark:bg-gray-900 dark:text-gray-100">
    <XCircle className="h-24 w-24 text-red-500" />
    <h2 className="mt-4 text-2xl font-bold">Exam Failed</h2>
    <p className="mt-2 text-center text-lg font-semibold text-gray-700">
      Your Score:{" "}
      <strong>
        {correctAnswersCount}/{quizData.length}
      </strong>
    </p>
    <p className="mt-2 text-center text-muted-foreground">{reason}</p>
    <Button onClick={onCloseAction} className="mt-8 bg-red-600 hover:bg-red-700">
      Close
    </Button>
  </div>
);

export const ExamUI: React.FC<ExamUIProps> = ({ onCloseAction }) => {
  // Initialize state with values from localStorage if available
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(() => {
    const saved = localStorage.getItem("examProgress");
    return saved ? JSON.parse(saved).activeQuestionIndex || 0 : 0;
  });
  const [selectedValue, setSelectedValue] = useState<string | null>(() => {
    const saved = localStorage.getItem("examProgress");
    return saved ? JSON.parse(saved).selectedValue || null : null;
  });
  const [quizState, setQuizState] = useState<
    "answering" | "answered_correct" | "answered_wrong" | "completed"
  >(() => {
    const saved = localStorage.getItem("examProgress");
    return saved ? JSON.parse(saved).quizState || "answering" : "answering";
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("examProgress");
    return saved
      ? JSON.parse(saved).timeLeft || TOTAL_TIME_SECONDS
      : TOTAL_TIME_SECONDS;
  });
  const [isPassed, setIsPassed] = useState(() => {
    const saved = localStorage.getItem("examProgress");
    return saved ? JSON.parse(saved).isPassed || false : false;
  });
  const [failReason, setFailReason] = useState(() => {
    const saved = localStorage.getItem("examProgress");
    return saved ? JSON.parse(saved).failReason || "" : "";
  });
  const [correctAnswersCount, setCorrectAnswersCount] = useState(() => {
    const saved = localStorage.getItem("examProgress");
    return saved ? JSON.parse(saved).correctAnswersCount || 0 : 0;
  });

  // Save progress to localStorage whenever relevant state changes
  useEffect(() => {
    const progress = {
      activeQuestionIndex,
      selectedValue,
      quizState,
      timeLeft,
      isPassed,
      failReason,
      correctAnswersCount,
    };
    localStorage.setItem("examProgress", JSON.stringify(progress));
  }, [
    activeQuestionIndex,
    selectedValue,
    quizState,
    timeLeft,
    isPassed,
    failReason,
    correctAnswersCount,
  ]);

  // Reset progress when the exam is completed or closed
  const resetProgress = () => {
    localStorage.removeItem("examProgress");
    setActiveQuestionIndex(0);
    setSelectedValue(null);
    setQuizState("answering");
    setTimeLeft(TOTAL_TIME_SECONDS);
    setIsPassed(false);
    setFailReason("");
    setCorrectAnswersCount(0);
  };

  // Modify the onClose handler to reset progress
  const handleClose = () => {
    resetProgress();
    onCloseAction();
  };

  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeOut = () => {
    setIsPassed(false);
    setFailReason(
      "You ran out of time. All questions must be answered correctly to pass."
    );
    setQuizState("completed");
  };

  useEffect(() => {
    if (quizState !== "completed") {
      timerInterval.current = setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev <= 1) {
            if (timerInterval.current) clearInterval(timerInterval.current);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerInterval.current) clearInterval(timerInterval.current);
    }

    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [quizState]);

  const currentQuestion = useMemo(
    () => quizData[activeQuestionIndex],
    [activeQuestionIndex]
  );

  const handleCompletionCheck = () => {
    if (correctAnswersCount === quizData.length) {
      setIsPassed(true);
      setQuizState("completed");
    } else {
      setIsPassed(false);
      setFailReason(
        `You need ${quizData.length}/5 correct answers to pass. Your score is ${correctAnswersCount}/5.`
      );
      setQuizState("completed");
    }
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < quizData.length - 1) {
      setActiveQuestionIndex((prev: number) => prev + 1);
      setQuizState("answering");
      setSelectedValue(null);
    } else {
      // Reached the end: check total score for pass/fail
      handleCompletionCheck();
    }
  };

  const handleAnswerSelect = (option: string) => {
    if (quizState !== "answering") return;

    setSelectedValue(option);
    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectAnswersCount((prev: number) => prev + 1);
      setQuizState("answered_correct");

      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    } else {
      setQuizState("answered_wrong");
    }
  };

  const handleProceedAfterWrongAnswer = () => {
    if (activeQuestionIndex === quizData.length - 1) {
      // If wrong on the last question, immediately check overall score and show result
      handleCompletionCheck();
    } else {
      // Otherwise, proceed to the next question
      setActiveQuestionIndex((prev: number) => prev + 1);
      setQuizState("answering");
      setSelectedValue(null);
    }
  };

  const ringVariants: Variants = {
    initial: {
      rotate: 0,
    },
    ring: {
      rotate: [-5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const isWarningTime =
    timeLeft <= WARNING_TIME_SECONDS && quizState !== "completed";

  return (
    <div className="flex h-full w-full flex-col bg-blue-800 p-4 pt-6 text-white dark:bg-blue-900">
      <header className="flex w-full items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10"
          onClick={handleClose}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <motion.div
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 shadow-md transition-colors duration-500",
            isWarningTime ? "bg-red-400 text-white" : "bg-yellow-400 text-black"
          )}
          variants={ringVariants}
          animate={isWarningTime ? "ring" : "initial"}
        >
          <Clock className="h-5 w-5" />
          <span className="font-bold">{formatTime(timeLeft)}</span>
        </motion.div>

        <div className="w-10"></div>
      </header>

      <nav className="my-6 flex items-center justify-center gap-3">
        {paginationDots.map((num) => (
          <div
            key={num}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-transparent font-bold text-white transition-colors duration-300",
              num - 1 === activeQuestionIndex
                ? "border-0 bg-white text-blue-800"
                : num - 1 < activeQuestionIndex
                ? "border-blue-300 bg-blue-300/50 text-white"
                : "opacity-50"
            )}
          >
            {num}
          </div>
        ))}
      </nav>

      {quizState === "completed" ? (
        isPassed ? (
          <CompletionScreen onCloseAction={handleClose} />
        ) : (
          <FailureScreen
            onCloseAction={handleClose}
            reason={failReason}
            correctAnswersCount={correctAnswersCount}
          />
        )
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
            {currentQuestion.options.map((option: string) => {
              const isSelected = selectedValue === option;
              const isCorrectAnswer = currentQuestion.correctAnswer === option;
              const isWrongSelection =
                isSelected && quizState === "answered_wrong";

              // Determine visual state
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
            <Button
              onClick={handleProceedAfterWrongAnswer}
              className="mt-6 w-full"
            >
              {activeQuestionIndex === quizData.length - 1
                ? "Check Final Result"
                : "Next Question"}
            </Button>
          )}
        </main>
      )}
    </div>
  );
};
