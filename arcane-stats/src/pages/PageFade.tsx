import { motion } from 'framer-motion';
import React from 'react';

interface PageFadeProps {
  children: React.ReactNode;
}

const PageFade: React.FC<PageFadeProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageFade;
