import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
  once?: boolean;
  preset?:
    | "fade"
    | "up"
    | "down"
    | "left"
    | "right"
    | "zoom"
    | "blur"
    | "bounce"
    | "reveal";
  stagger?: number; // Efeito cascata
}

const presets = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  bounce: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 120 },
  },
  reveal: {
    hidden: { opacity: 0, x: -70, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0)" },
  },
};

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
  amount = 0.2,
  once = true,
  preset = "up",
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      variants={presets[preset]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: stagger,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
