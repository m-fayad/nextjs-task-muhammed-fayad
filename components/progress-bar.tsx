"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

// The maximum displayed progress is 63%, which represents the "100%" of the bar's goal.
const MAX_DISPLAY_PROGRESS = 63;

const Progressbar = ({ progress = 100 }: { progress?: number }) => {
  // Determine the actual percentage to animate to, capped at MAX_DISPLAY_PROGRESS
  const targetProgress = Math.min(progress, MAX_DISPLAY_PROGRESS);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(progressBarRef, { once: true, amount: 0.1 });

  // Framer Motion animation variants for the bar and labels
  const barVariants: Variants = {
    initial: { width: "0%" },
    animate: {
      width: `${targetProgress}%`,
      transition: {
        duration: 2, // 2000ms animation
        ease: "easeInOut", // Smooth start and end
      },
    },
  };

  const labelVariants: Variants = {
    initial: { left: "0%" },
    animate: {
      left: `${targetProgress}%`,
      transition: {
        duration: 2, // Match bar duration
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative" ref={progressBarRef}>
      {/* Background Track */}
      <div className="w-full h-1 bg-[#E6E6E6] rounded-full overflow-hidden">
        {/* Animated Progress Bar */}
        <motion.div
          className="h-1 bg-green-500 rounded-full"
          variants={barVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        />
      </div>

      {/* "You" Marker/Bubble */}
      <motion.div
        className="absolute -top-11"
        variants={labelVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        style={{
          transform: "translateX(-50%)",
        }}
      >
        <div className="relative">
          <div className="text-[#485293] w-8 h-8 border-2 border-[#C8C8C8] rounded-full flex items-center justify-center text-xs">
            You
          </div>
          <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-[#C8C8C8] border-l-transparent border-r-transparent" />
        </div>
      </motion.div>

      {/* Percentage Text Label */}
      <motion.div
        className="absolute top-1.5"
        variants={labelVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        style={{
          transform: "translateX(-50%)",
        }}
      >
        {/* Note: Framer Motion animates the 'left' property, but the text 
          itself will instantly show the final value (63%). If you need 
          the number to animate (like a counter), you'd need to use 
          the 'useMotionValue' and 'useTransform' hooks, or a dedicated 
          counting component. For simplicity and smoothness of movement, 
          we keep the final value here.
        */}
        <span className="text-xs text-[#485293]">{targetProgress}%</span>
      </motion.div>
    </div>
  );
};

export default Progressbar;
