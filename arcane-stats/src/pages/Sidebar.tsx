import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <aside className="bg-[#1D2D50] min-h-screen w-56 flex flex-col gap-4 px-4 py-8 shadow-lg border-r border-white/5 relative overflow-hidden">
      {/* Background animado sutil */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0077B6]/10 rounded-full blur-3xl animate-float"></div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-grotesk-title flex px-2 py-4 text-2xl font-bold mb-8 bg-gradient-to-r from-[#0077B6] to-[#00B4D8] bg-clip-text text-transparent relative z-10"
      >
        Arcane Stats
      </motion.h2>
      <nav className="sora-text text-[#E0E0E0] *:flex flex-col gap-2 relative z-10">
        {[
          { path: '/dashboard', label: 'Dashboard', index: 0 },
          { path: '/times', label: 'Times', index: 1 },
          { path: '/jogadores', label: 'Jogadores', index: 2 },
          { path: '/partidas', label: 'Partidas', index: 3 },
          { path: '/configuracoes', label: 'Configurações', index: 4 }
        ].map(({ path, label, index }) => (
          <motion.div
            key={path}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={linkVariants}
          >
            <Link
              to={path}
              className={`px-3 py-2 rounded transition-all relative overflow-hidden ${isActive(path) || (path === '/dashboard' && isActive('/'))
                  ? 'font-semibold text-[#E0E0E0] shadow-lg shadow-[#00B4D8]/50'
                  : 'text-[#A8A8A8] hover:bg-[#00B4D8] hover:text-[#E0E0E0]'
                }`}
            >
              <span className="relative z-10 block">
                {label}
              </span>
              {isActive(path) || (path === '/dashboard' && isActive('/')) ? (
                <>
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#0077B6] rounded z-0"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00B4D8] rounded-r z-10"></div>
                </>
              ) : null}
            </Link>
          </motion.div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;