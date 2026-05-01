const LANE_TONES: Record<string, string> = {
  Top: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  Jungle: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Mid: "border-primary/30 bg-primary/10 text-primary",
  ADC: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  Support:
    "border-[hsl(248_86%_70%_/_0.3)] bg-[hsl(248_86%_70%_/_0.1)] text-violet-300",
};

export const LaneBadge: React.FC<{ lane?: string }> = ({ lane }) => (
  <span
    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
      lane
        ? LANE_TONES[lane]
        : "border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.4)] text-muted-foreground"
    }`}
  >
    {lane ?? "—"}
  </span>
);
