import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuth';

const Header = () => {
  const { scrollY } = useScroll();

  const height = useTransform(scrollY, [0, 150], ['150px', '70px']);
  const blur = useTransform(scrollY, [0, 200], ['blur(0px)', 'blur(8px)']);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.85]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // só anima depois do loading (header montado)
    setMounted(true);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={mounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ height, backdropFilter: blur, opacity }}
      className="w-full sticky top-0 z-50 px-8 bg-[#1D2D50]/70 
                 border-b border-white/10 shadow-lg 
                 flex items-center justify-between 
                 transition-all duration-300"
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.7 }}
  className="text-3xl md:text-4xl font-semibold 
       bg-linear-to-r from-white to-blue-200 
       bg-clip-text text-transparent tracking-wide"
      >
        Plataforma de Análise eSports
      </motion.h1>

      <div className="flex items-center gap-4">
        {/* simple auth area */}
        <AuthArea />
      </div>
    </motion.header>
  );
};

export default Header;

function AuthArea() {
  const { user, logout } = useAuthContext();
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/login" className="text-sm text-[#E0E0E0] hover:text-white">Entrar</Link>
        <Link to="/register" className="text-sm text-[#00B4D8] font-semibold">Cadastrar</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-[#E0E0E0]">Olá, <span className="font-semibold text-white">{user.name}</span></div>
      <button onClick={logout} className="bg-[#FF6B6B] text-white px-3 py-1 rounded text-sm">Sair</button>
    </div>
  );
}
