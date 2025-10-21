"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ExamUI } from "../organisms/ExamUI";

type ExamModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ExamModal: React.FC<ExamModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-screen w-screen max-w-full border-0 bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">Take Exam</DialogTitle>
        <ExamUI onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
