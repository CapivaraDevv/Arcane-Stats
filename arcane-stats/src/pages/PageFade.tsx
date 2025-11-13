import { motion } from 'framer-motion';
import React from 'react';

interface PageFadeProps {
  children: React.ReactNode;
  isReady?: boolean;
}

const PageFade: React.FC<PageFadeProps> = ({ children, isReady = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: isReady ? 0.2 : 0
      }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageFade;
