import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import Times from './Times';
import Jogadores from './Jogadores';
import Partidas from './Partidas';
import Configuracoes from './Configuracoes';
import PageFade from './PageFade';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';

interface AnimatedRoutesProps {
  isReady?: boolean;
}

const AnimatedRoutes = ({ isReady = true }: AnimatedRoutesProps) => {
  const location = useLocation();
  // Não renderiza rotas enquanto a tela de carregamento não estiver completa.
  if (!isReady) return null;
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageFade isReady={isReady}><Home/></PageFade>} />
        <Route path="/dashboard" element={<PageFade isReady={isReady}><ProtectedRoute><Dashboard /></ProtectedRoute></PageFade>} />
        <Route path="/login" element={<PageFade isReady={isReady}><Login /></PageFade>} />
        <Route path="/register" element={<PageFade isReady={isReady}><Register /></PageFade>} />
        <Route path="/times" element={<PageFade isReady={isReady}><ProtectedRoute><Times /></ProtectedRoute></PageFade>} />
        <Route path="/jogadores" element={<PageFade isReady={isReady}><ProtectedRoute><Jogadores /></ProtectedRoute></PageFade>} />
        <Route path="/partidas" element={<PageFade isReady={isReady}><ProtectedRoute><Partidas /></ProtectedRoute></PageFade>} />
        <Route path="/configuracoes" element={<PageFade isReady={isReady}><ProtectedRoute><Configuracoes /></ProtectedRoute></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
