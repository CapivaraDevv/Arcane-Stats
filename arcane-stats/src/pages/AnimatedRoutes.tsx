import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import Times from './Times';
import Jogadores from './Jogadores';
import Partidas from './Partidas';
import Configuracoes from './Configuracoes';
import PageFade from './PageFade';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageFade><Dashboard /></PageFade>} />
        <Route path="/dashboard" element={<PageFade><Dashboard /></PageFade>} />
        <Route path="/times" element={<PageFade><Times /></PageFade>} />
        <Route path="/jogadores" element={<PageFade><Jogadores /></PageFade>} />
        <Route path="/partidas" element={<PageFade><Partidas /></PageFade>} />
        <Route path="/configuracoes" element={<PageFade><Configuracoes /></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
