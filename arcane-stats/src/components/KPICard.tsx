import { motion } from 'framer-motion';

type KPI = { title: string; value: string; feedback?: string };

export default function KPICard({ kpi, idx, getChampionImageUrl, imageErrors, handleImageError }: { kpi: KPI; idx: number; getChampionImageUrl: (s: string) => string; imageErrors: Set<string>; handleImageError: (s: string) => void }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 30px rgba(0, 180, 216, 0.4)'
      }}
      className="bg-[#1D2D50] rounded-lg p-6 shadow-lg flex flex-col justify-center items-center gap-2 transition-all hover:bg-[#0077B6] duration-100 border border-white/5 relative overflow-hidden group h-30"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      <div className='flex items-center gap-3'>
        {kpi.title === 'Melhor Campeão' ? (
          <div className="relative z-10 w-10 h-10 flex items-center justify-center">
            {!imageErrors.has(kpi.value) ? (
              <img
                src={getChampionImageUrl(kpi.value)}
                alt={kpi.value}
                className="w-10 h-10 rounded-lg object-cover border border-[#00B4D8]/40 transition-all"
                onError={() => handleImageError(kpi.value)}
              />
            ) : (
              <motion.div
                className="text-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                🏆
              </motion.div>
            )}
          </div>
        ) : null}

        <div className="space-grotesk-title text-[24px] font-bold text-[#E0E0E0] relative z-10">{kpi.value}</div>
      </div>
      <div className="sora-text text-sm text-[#2fd8fa] relative z-10">{kpi.title}</div>
      <div className="sora-text text-sm text-[#8ca5aa] relative z-10">{kpi.feedback}</div>
    </motion.div>
  );
}
