"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PdfViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
};

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title = "Course Material",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-screen w-screen max-w-full flex-col border-0 p-0">
        <DialogHeader className="flex-row items-center justify-between space-y-0 border-b p-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <iframe src={pdfUrl} title={title} className="h-full w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
