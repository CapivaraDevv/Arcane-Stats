import { motion } from 'framer-motion';
import React from 'react';

interface PageFadeProps {
  children: React.ReactNode;
}

const PageFade: React.FC<PageFadeProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageFade;
