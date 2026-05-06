type Props = { position: number };

export const RankBadge: React.FC<Props> = ({ position }) => {
  const styles =
    position === 1
      ? "bg-gradient-to-br from-amber-300 to-amber-500 text-background shadow-[0_0_12px_rgba(251,191,36,0.5)]"
      : position === 2
        ? "bg-gradient-to-br from-slate-200 to-slate-400 text-background"
        : position === 3
          ? "bg-gradient-to-br from-orange-400 to-orange-600 text-background"
          : "bg-secondary text-muted-foreground";
  return (
    <div
      className={`flex h-7 w-7 items-center justify-center rounded-lg font-display text-xs font-black ${styles}`}
    >
      {position}
    </div>
  );
};