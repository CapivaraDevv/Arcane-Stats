import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import DarkVeilBackground from '../../components/DarkVeilBackground'

type LoadingScreenProps = {
  onLoadingComplete?: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => {
        onLoadingComplete?.()
      }, 400)
    }, 3500)
    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground"
        >
          <DarkVeilBackground />
          <motion.div
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 rounded-full"
          >
            <img src="/LogoBrancoSemFundo.png" alt="Logo Oficial Branca" className="w-48 h-auto" />
          </motion.div>
          <div className="relative mt-6 w-full max-w-xs z-10">
            {/* Corner brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-[#00B4D8]/80" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t border-r border-[#00B4D8]/80" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b border-l border-[#00B4D8]/80" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-[#00B4D8]/80" />

            {/* Track */}
            <div className="h-[5px] bg-white/8 border border-white/10 overflow-visible relative">
              {/* Fill */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, delay: 0.4, ease: 'linear' }}
                className="absolute inset-y-0 left-0 bg-linear-to-r from-[#0077B6] via-[#00B4D8] to-[#48CAE4] overflow-visible"
              >
                {/* Shimmer
                <motion.div
                  className="relative inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                /> */}
                {/* Leading diamond */}
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-[9px] h-[9px] rotate-45 bg-[#90E0EF] shadow-[0_0_10px_5px_rgba(0,180,216,0.9)]" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
