import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PageFadeProps = {
  children: ReactNode;
  isReady?: boolean;
};

const PageFade = ({ children = true }: PageFadeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageFade;
