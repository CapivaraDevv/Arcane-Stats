import { motion } from "framer-motion";
import { useAssets } from "../hooks/useAssets";

type KPI = { title: string; value: string; feedback?: string };

export default function KPICard({
  kpi,
  idx,
  imageErrors,
  handleImageError,
}: {
  kpi: KPI;
  idx: number;
  imageErrors: Set<string>;
  handleImageError: (s: string) => void;
}) {
  const { getChampionIcon } = useAssets();
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 30px rgba(0, 180, 216, 0.4)",
      }}
      className="bg-[hsl(var(--primary)/0.1)] cursor-pointer rounded-lg p-4 sm:p-5 md:p-6 shadow-lg flex flex-col justify-center items-center gap-1 sm:gap-2 transition-all hover:bg-[#0077B6] duration-100 border border-border relative overflow-hidden group min-h-[120px] sm:min-h-[140px] md:h-30"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {kpi.title === "Melhor Campeão" ? (
          <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
            {!imageErrors.has(kpi.value) ? (
              <img
                src={getChampionIcon(kpi.value)}
                alt={kpi.value}
                className="w-full h-full rounded-lg object-cover border border-[#00B4D8]/40 transition-all"
                onError={() => handleImageError(kpi.value)}
              />
            ) : (
              <motion.div
                className="text-xl sm:text-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                🏆
              </motion.div>
            )}
          </div>
        ) : null}

        <div className="space-grotesk-title text-lg sm:text-2xl font-bold text-[#E0E0E0] relative z-10">
          {kpi.value}
        </div>
      </div>
      <div className="sora-text text-xs sm:text-sm text-[#2fd8fa] relative z-10 text-center">
        {kpi.title}
      </div>
      <div className="sora-text text-xs sm:text-sm text-[#8ca5aa] relative z-10 text-center">
        {kpi.feedback}
      </div>
    </motion.div>
  );
}
