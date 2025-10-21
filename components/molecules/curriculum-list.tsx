"use client";

import { useState } from "react";
import { Curriculum, CurriculumItemProps } from "../atoms/curriculum";
import { PdfViewerModal } from "./PdfViewerModal";
import { ExamModal } from "./ExamModal";

const CurriculumList = () => {
  const [isPdfModalOpen, setPdfModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [isExamModalOpen, setExamModalOpen] = useState(false);

  const handleOpenPdf = (url: string) => {
    setCurrentPdfUrl(url);
    setPdfModalOpen(true);
  };

  const handleOpenExam = () => {
    setExamModalOpen(true);
  };

  const week1To4Items: CurriculumItemProps[] = [
    { id: 1, title: "Introduction", isLocked: true },
    { id: 2, title: "Course Overview", isLocked: true },
    {
      id: 3,
      title: "Course Overview (PDF)",
      tags: [
        { text: "0 QUESTION", color: "pink" },
        { text: "10 MINUTES", color: "green" },
      ],
      action: () =>
        handleOpenPdf(
          "https://drive.google.com/file/d/1fxP5qrmVgm8dNeEaW73W8RZXGP5zSVT0/preview"
        ),
    },
    { id: 4, title: "Course Exercise / Reference Files", isLocked: true },
    { id: 5, title: "Code Editor Installation (Optional...)", isLocked: true },
    {
      id: 6,
      title: "Embedding PHP in HTML (Exam)",
      isLocked: true,
      action: () => handleOpenExam(),
    },
  ];

  const week5To8Items: CurriculumItemProps[] = [
    { id: 1, title: "Defining Functions", isLocked: true },
    { id: 2, title: "Function Parameters", isLocked: true },
    {
      id: 3,
      title: "Return Values From Functions (PDF)",
      tags: [
        { text: "2 QUESTIONS", color: "pink" },
        { text: "15 MINUTES", color: "green" },
      ],
      action: () =>
        handleOpenPdf(
          "https://drive.google.com/file/d/1fxP5qrmVgm8dNeEaW73W8RZXGP5zSVT0/preview"
        ),
    },
    { id: 4, title: "Global Variable and Scope", isLocked: true },
    { id: 5, title: "Newer Way of creating a Constant", isLocked: true },
    {
      id: 6,
      title: "Constants (Exam)",
      isLocked: true,
      action: () => handleOpenExam(),
    },
  ];

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-y-4 lg:gap-y-8">
      {/* --- Curriculum Sections --- */}
      <Curriculum
        title="Week 1-4"
        subtitle="Advanced story telling techniques for writers: Personas, Characters & Plots"
        items={week1To4Items}
        defaultOpen={true}
      />

      <Curriculum
        title="Week 5-8"
        subtitle="Advanced story telling techniques for writers: Personas, Characters & Plots"
        items={week5To8Items}
      />

      <Curriculum
        title="Week 9-12"
        subtitle="Advanced story telling techniques for writers: Personas, Characters & Plots"
        items={week5To8Items}
      />

      {/* --- Modals --- */}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        pdfUrl={currentPdfUrl}
        title="Course PDF"
      />

      <ExamModal
        isOpen={isExamModalOpen}
        onClose={() => setExamModalOpen(false)}
      />
    </div>
  );
};

export default CurriculumList;
