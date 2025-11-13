import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import Times from './Times';
import Jogadores from './Jogadores';
import Partidas from './Partidas';
import Configuracoes from './Configuracoes';
import PageFade from './PageFade';

interface AnimatedRoutesProps {
  isReady?: boolean;
}

const AnimatedRoutes = ({ isReady = true }: AnimatedRoutesProps) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageFade isReady={isReady}><Dashboard /></PageFade>} />
        <Route path="/dashboard" element={<PageFade isReady={isReady}><Dashboard /></PageFade>} />
        <Route path="/times" element={<PageFade isReady={isReady}><Times /></PageFade>} />
        <Route path="/jogadores" element={<PageFade isReady={isReady}><Jogadores /></PageFade>} />
        <Route path="/partidas" element={<PageFade isReady={isReady}><Partidas /></PageFade>} />
        <Route path="/configuracoes" element={<PageFade isReady={isReady}><Configuracoes /></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
