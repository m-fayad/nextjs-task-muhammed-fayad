"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FileText, LockKeyhole, Minus, Plus } from "lucide-react";

// --- Type Definitions ---

type CurriculumTag = {
  text: string;
  color: "green" | "pink" | "default";
};

export type CurriculumItemProps = {
  id: string | number;
  title: string;
  isLocked?: boolean;
  tags?: CurriculumTag[];
  action?: React.MouseEventHandler<HTMLDivElement>;
};

type CurriculumProps = {
  title: string;
  subtitle: string;
  items: CurriculumItemProps[];
  defaultOpen?: boolean;
};

const itemVariants: Record<string, any> = {
  closed: {
    opacity: 0,
    x: -15,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const CurriculumItem: React.FC<CurriculumItemProps> = ({
  title,
  isLocked,
  tags,
  action,
}) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center justify-between rounded-md p-3 transition-colors hover:bg-accent"
    onClick={action}
  >
    <div className="flex flex-1 items-center gap-3 overflow-hidden">
      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="truncate text-sm font-medium">{title}</span>
    </div>

    <div className="ml-4 flex shrink-0 items-center gap-2">
      {tags?.map((tag, index) => (
        <Badge
          key={index}
          variant="outline"
          className={cn(
            "text-xs font-semibold border-0",
            tag.color === "green" && "bg-green-50 text-green-600",
            tag.color === "pink" && "bg-pink-50 text-pink-400 "
          )}
        >
          {tag.text}
        </Badge>
      ))}
      {isLocked && <LockKeyhole className="h-4 w-4 text-muted-foreground" />}
    </div>
  </motion.div>
);

export const Curriculum: React.FC<CurriculumProps> = ({
  title,
  subtitle,
  items,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const listVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full rounded-lg border shadow-sm"
    >
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-start justify-between p-4 text-left transition-all",
          isOpen && "pb-2"
        )}
      >
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mt-1">
          {isOpen ? (
            <Minus className="h-5 w-5 shrink-0" />
          ) : (
            <Plus className="h-5 w-5 shrink-0" />
          )}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={listVariants}
              className="space-y-1 px-4 pb-4 pt-2"
            >
              {items.map((item) => (
                <CurriculumItem key={item.id} {...item} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
};
