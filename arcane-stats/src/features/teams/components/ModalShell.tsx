// src/features/teams/components/ModalShell.tsx
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type ModalShellProps = {
  title: string;
  subtitle?: string;
  onClose: () => void;
  wide?: boolean;
  children: React.ReactNode;
};

const ModalShell = ({
  title,
  subtitle,
  onClose,
  wide,
  children,
}: ModalShellProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(var(--background)/0.8)] p-4 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className={[
        "relative w-full max-h-[85vh] overflow-visible rounded-2xl border border-border bg-card-glass p-6 shadow-elevated flex flex-col",
        wide ? "max-w-2xl" : "max-w-md",
      ].join(" ")}
    >
      <div className="absolute -right-20 -top-20 h-36 w-48 rounded-full bg-[hsl(var(--primary)/0.1)] blur-3xl" />

      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.4)] p-1.5 text-muted-foreground backdrop-blur-sm transition hover:border-[hsl(var(--border))] hover:bg-secondary hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative flex flex-col max-h-[80vh]">
        <h3 className="font-display text-xl font-black text-primary">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}

        <div className="mt-5 flex-1 overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default ModalShell;