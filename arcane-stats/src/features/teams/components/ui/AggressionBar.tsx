import { motion } from "framer-motion";

export const AggressionBar: React.FC<{ value: number }> = ({ value }) => {
  const v = Math.max(0, Math.min(100, value));
  const tone =
    v > 75
      ? "from-rose-400 to-orange-500"
      : v > 45
        ? "from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))]"
        : "from-emerald-400 to-cyan-400";
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[hsl(var(--secondary)/0.6)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-linear-to-r ${tone} shadow-[0_0_8px_currentColor]`}
        />
      </div>
      <span className="w-8 text-right font-display text-xs font-bold tabular-nums">
        {v}
      </span>
    </div>
  );
};
