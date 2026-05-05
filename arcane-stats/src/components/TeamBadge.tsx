import type { Team } from "../features/teams/types";

export const TeamBadge: React.FC<{
  team: Team;
  alignment: "left" | "right";
  winning?: boolean;
}> = ({ team, alignment, winning }) => {
  const info = (
    <div className={alignment === "right" ? "text-right" : "text-left"}>
      <div className="font-display text-sm font-black">{team.nome}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {team.members.length} membros
      </div>
    </div>
  );

  const avatar = (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl font-display text-base font-black text-primary-foreground transition-all duration-300 ${
        winning
          ? "bg-gradient-primary shadow-glow ring-2 ring-[hsl(var(--primary)/0.5)] scale-105"
          : "bg-secondary text-foreground"
      }`}
    >
      {team.nome.slice(0, 2).toUpperCase()}
    </div>
  );

  return (
    <div
      className={`flex items-center gap-3 ${
        alignment === "right" ? "justify-end" : "justify-start"
      }`}
    >
      {alignment === "right" ? (
        <>
          {info}
          {avatar}
        </>
      ) : (
        <>
          {avatar}
          {info}
        </>
      )}
    </div>
  );
};