import { motion } from "framer-motion";

const TONE_MAP = {
  emerald: {
    bg: "bg-[hsl(157_72%_40%_/_0.1)]",
    text: "text-emerald-400",
    ring: "border-[hsl(157_72%_40%_/_0.3)]",
  },
  primary: {
    bg: "bg-[hsl(var(--primary)/0.1)]",
    text: "text-primary",
    ring: "border-[hsl(var(--primary)/0.3)]",
  },
  rose: {
    bg: "bg-[hsl(344_84%_57%_/_0.1)]",
    text: "text-rose-400",
    ring: "border-[hsl(344_84%_57%_/_0.3)]",
  },
  amber: {
    bg: "bg-[hsl(42_96%_56%_/_0.1)]",
    text: "text-amber-400",
    ring: "border-[hsl(42_96%_56%_/_0.3)]",
  },
} as const;

type Props = {
  label: string;
  value: string;
  tone?: keyof typeof TONE_MAP;
  delay?: number;
};

export const MiniStat: React.FC<Props> = ({
  label,
  value,
  tone = "primary",
  delay = 0,
}) => {
  const t = TONE_MAP[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-xl border ${t.ring} bg-[hsl(var(--background)/0.4)] p-3.5 backdrop-blur-sm transition hover:bg-[hsl(var(--background)/0.6)]`}
    >
      <div
        className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${t.bg} blur-2xl transition group-hover:scale-150`}
      />
      <div className="relative">
        <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div
          className={`mt-0.5 font-display text-2xl font-black tabular-nums ${t.text}`}
        >
          {value}
        </div>
      </div>
    </motion.div>
  );
};
