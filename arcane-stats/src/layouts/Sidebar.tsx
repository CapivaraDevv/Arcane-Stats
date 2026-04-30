import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Sidebar = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.4,
      },
    }),
  }

  return (
    <motion.aside
      className="bg-[hsl(var(--background)/0.7)] min-h-screen w-56 flex flex-col gap-4 px-4 py-3 shadow-lg border-r border-white/5 relative overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0077B6]/10 rounded-full blur-3xl animate-float" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{
          scale: 1.1,
          rotateX: 8,
          rotateY: -8,
          rotate: 0.5,
          transition: { type: 'spring', stiffness: 150 },
        }}
        className="px-6 mb-5 rounded-3xl cursor-pointer relative"
      >
        <Link to="/">
          <img src="/LogoBrancoSemFundo.png" alt="Logo" className="w-32 relative z-10" />
        </Link>
      </motion.div>
      <nav className="sora-text text-[#E0E0E0] *:flex flex-col gap-2 relative z-10">
        {[
          { path: '/dashboard', label: 'Dashboard', index: 0 },
          { path: '/times', label: 'Times', index: 1 },
          { path: '/jogadores', label: 'Jogadores', index: 2 },
          { path: '/partidas', label: 'Partidas', index: 3 },
          { path: '/configuracoes', label: 'Configurações', index: 4 },
        ].map(({ path, label, index }) => (
          <motion.div key={path} custom={index} initial="hidden" animate="visible" variants={linkVariants}>
            <Link
              to={path}
              className={`px-3 py-2 rounded transition-all relative overflow-hidden ${
                isActive(path) || (path === '/dashboard' && isActive('/'))
                  ? 'font-semibold text-[#E0E0E0] '
                  : 'text-[#A8A8A8] hover:bg-[#00B4D8] hover:text-[#E0E0E0]'
              }`}
            >
              <span className="relative z-10 block">{label}</span>
              {isActive(path) || (path === '/dashboard' && isActive('/')) ? (
                <>
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#0077B6] rounded z-0"
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00B4D8] rounded-r z-10" />
                </>
              ) : null}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  )
}

export default Sidebar
