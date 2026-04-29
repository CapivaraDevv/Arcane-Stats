import { motion } from "framer-motion";

/**
 * Animated cinematic background — radial gradients, hex grid, drifting orbs.
 * Pure CSS + framer-motion (no WebGL dependency).
 */
const DarkVeilBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-hex opacity-40" />

      {/* Glow orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-[hsl(var(--primary-deep))]/30 blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[hsl(var(--primary-glow))]/15 blur-3xl"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default DarkVeilBackground;