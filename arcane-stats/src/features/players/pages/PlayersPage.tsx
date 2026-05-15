import { useState, useMemo, useEffect, useRef } from "react";
import ScrollReveal from "../../../components/ScrollReveal";
import { Users } from "lucide-react";

type Player = {
  rank: number;
  nick: string;
  name: string;
  team: string;
  role: string;
  kda: number;
  winrate: number;
  games: number;
  country: string;
};

const MATCH_HISTORY = [
  { id: 1, result: "Vitória", kda: "6/2/8", champion: "Fake Champion", date: "5 min atrás" },
  { id: 2, result: "Vitória", kda: "4/3/12", champion: "Fake Champion", date: "1h atrás" },
  { id: 3, result: "Derrota", kda: "3/5/7", champion: "Fake Champion", date: "2h atrás" },
];

const PlayersPage = () => {
  const [filtroRole, setFiltroRole] = useState<string>("Todas");

  const ranking: Player[] = [
    {
      rank: 1,
      nick: "Faker",
      name: "Lee Sang-hyeok",
      team: "T1",
      role: "Mid",
      kda: 6.2,
      winrate: 72,
      games: 210,
      country: "KR",
    },
    {
      rank: 2,
      nick: "Caps",
      name: "Rasmus Winther",
      team: "G2 Esports",
      role: "Mid",
      kda: 5.8,
      winrate: 69,
      games: 198,
      country: "EU",
    },
    {
      rank: 3,
      nick: "Chovy",
      name: "Jeong Ji-hoon",
      team: "Gen.G",
      role: "Mid",
      kda: 5.6,
      winrate: 67,
      games: 185,
      country: "KR",
    },
    {
      rank: 4,
      nick: "Rekkles",
      name: "Carl Martin Erik Larsson",
      team: "G2 Esports",
      role: "ADC",
      kda: 5.4,
      winrate: 66,
      games: 220,
      country: "EU",
    },
    {
      rank: 5,
      nick: "Perkz",
      name: "Luka Perković",
      team: "Cloud9",
      role: "ADC",
      kda: 5.1,
      winrate: 65,
      games: 205,
      country: "EU",
    },
    {
      rank: 6,
      nick: "Teddy",
      name: "Park Jin-seong",
      team: "T1",
      role: "ADC",
      kda: 4.9,
      winrate: 64,
      games: 190,
      country: "KR",
    },
    {
      rank: 7,
      nick: "Doinb",
      name: "Kim Tae-sang",
      team: "LNG",
      role: "Mid",
      kda: 4.8,
      winrate: 63,
      games: 176,
      country: "KR",
    },
    {
      rank: 8,
      nick: "Uzi",
      name: "Jian Zihao",
      team: "Retired",
      role: "ADC",
      kda: 4.7,
      winrate: 62,
      games: 300,
      country: "CN",
    },
    {
      rank: 9,
      nick: "Nuguri",
      name: "Jang Ha-gwon",
      team: "DWG KIA",
      role: "Top",
      kda: 4.6,
      winrate: 61,
      games: 160,
      country: "KR",
    },
    {
      rank: 10,
      nick: "ShowMaker",
      name: "Heo Su",
      team: "DWG KIA",
      role: "Mid",
      kda: 4.5,
      winrate: 60,
      games: 170,
      country: "KR",
    },
  ];

  const roles = ["Todas", "Top", "Jungle", "Mid", "ADC", "Support"];
  const jogadoresFiltrados =
    filtroRole === "Todas"
      ? ranking
      : ranking.filter((j) => j.role === filtroRole);

  const [sortKey, setSortKey] = useState<"rank" | "kda" | "winrate" | "games">(
    "rank",
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const sorted = useMemo(() => {
    const arr = [...jogadoresFiltrados];
    arr.sort((a: Player, b: Player) => {
      let aVal: string | number;
      let bVal: string | number;
      if (
        sortKey === "rank" ||
        sortKey === "kda" ||
        sortKey === "winrate" ||
        sortKey === "games"
      ) {
        aVal = a[sortKey];
        bVal = b[sortKey];
      } else {
        aVal = a[sortKey as keyof Player] as string;
        bVal = b[sortKey as keyof Player] as string;
      }

      if (typeof aVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }

      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    return arr;
  }, [jogadoresFiltrados, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageItems = sorted.slice((page - 1) * pageSize, page * pageSize);

  const getInitials = (nick: string) => {
    return nick
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPlayer) {
        setSelectedPlayer(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPlayer]);

  return (
    <main className="flex-1 space-y-6">
      <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-primary shadow-glow">
                <Users className="h-5 w-5" />
              </div>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-glow-pulse rounded-full bg-primary-glow" />
            </div>

            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">
                Jogadores
              </h1>
              <p className="text-xs text-muted-foreground">
                Gerencie squads, escale jogadores e simule embates.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tabela */}
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-card-glass p-6 m-10 shadow-card">
        <ScrollReveal preset="up" delay={0.05} duration={0.6}>
          <div className="mb-6">
            <h2 className="font-display text-3xl font-black tracking-tight text-primary">
              Jogadores
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Gerencie e visualize estatísticas dos jogadores
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => {
                  setFiltroRole(role);
                  setPage(1);
                }}
                aria-pressed={filtroRole === role}
                aria-label={`Filtrar por role ${role}`}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                  filtroRole === role
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "border border-border bg-[hsl(var(--secondary)/0.5)] text-muted-foreground hover:text-foreground"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl border border-[hsl(var(--border)/0.6)]">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-[hsl(var(--secondary)/0.4)] text-[10px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <button
                        className="inline-flex items-center gap-1 rounded-lg p-1 transition hover:text-foreground"
                        onClick={() => {
                          if (sortKey === "rank")
                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                          else {
                            setSortKey("rank");
                            setSortDir("asc");
                          }
                        }}
                      >
                        #
                      </button>
                    </th>

                    <th className="px-4 py-3 text-left">Jogador</th>

                    <th className="px-4 py-3 text-left">Time</th>

                    <th className="px-4 py-3 text-left">Role</th>

                    <th className="px-4 py-3 text-left">
                      <button
                        className="inline-flex items-center gap-1 rounded-lg p-1 transition hover:text-foreground"
                        onClick={() => {
                          if (sortKey === "kda")
                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                          else {
                            setSortKey("kda");
                            setSortDir("desc");
                          }
                        }}
                      >
                        KDA
                      </button>
                    </th>

                    <th className="px-4 py-3 text-left">
                      <button
                        className="inline-flex items-center gap-1 rounded-lg p-1 transition hover:text-foreground"
                        onClick={() => {
                          if (sortKey === "winrate")
                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                          else {
                            setSortKey("winrate");
                            setSortDir("desc");
                          }
                        }}
                      >
                        Winrate
                      </button>
                    </th>

                    <th className="px-4 py-3 text-left">
                      <button
                        className="inline-flex items-center gap-1 rounded-lg p-1 transition hover:text-foreground"
                        onClick={() => {
                          if (sortKey === "games")
                            setSortDir(sortDir === "asc" ? "desc" : "asc");
                          else {
                            setSortKey("games");
                            setSortDir("desc");
                          }
                        }}
                      >
                        Partidas
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {pageItems.map((p) => (
                    <tr
                      key={p.rank}
                      className="group cursor-pointer border-t border-[hsl(var(--border)/0.4)] transition hover:bg-primary/5"
                      onClick={() => setSelectedPlayer(p)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedPlayer(p);
                        }
                      }}
                      aria-label={`Ver detalhes de ${p.nick}`}
                    >
                      <td className="px-4 py-3 font-display font-bold text-foreground">
                        {p.rank}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary font-display text-sm font-black text-primary-foreground shadow-glow">
                            {getInitials(p.nick)}
                          </div>

                          <div>
                            <div className="font-display font-bold text-foreground">
                              {p.nick}
                            </div>

                            <div className="text-[11px] text-muted-foreground">
                              {p.name} • {p.country}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {p.team}
                      </td>

                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {p.role}
                      </td>

                      <td className="px-4 py-3 text-sm font-semibold text-primary">
                        {p.kda.toFixed(1)}
                      </td>

                      <td className="px-4 py-3 text-sm font-semibold text-emerald-400">
                        {p.winrate}%
                      </td>

                      <td className="px-4 py-3 text-sm text-amber-300">
                        {p.games}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* Paginação */}
        <div className="mt-5 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-semibold text-foreground">
              {(page - 1) * pageSize + 1}
            </span>
            –
            <span className="font-semibold text-foreground">
              {Math.min(page * pageSize, sorted.length)}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-foreground">
              {sorted.length}
            </span>
          </div>

          <nav className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-border bg-[hsl(var(--secondary)/0.6)] px-3 py-2 text-sm font-bold transition hover:border-primary/40 disabled:opacity-40"
            >
              Prev
            </button>

            <div className="rounded-xl border border-border bg-[hsl(var(--background)/0.6)] px-4 py-2 text-sm font-bold">
              {page} / {totalPages}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl border border-border bg-[hsl(var(--secondary)/0.6)] px-3 py-2 text-sm font-bold transition hover:border-primary/40 disabled:opacity-40"
            >
              Next
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <label
              htmlFor="page-size-select"
              className="text-sm text-muted-foreground"
            >
              Linhas
            </label>

            <select
              id="page-size-select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-xl border border-border bg-[hsl(var(--secondary)/0.6)] px-3 py-2 text-sm font-bold text-foreground outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
      {selectedPlayer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPlayer(null)}
          role="presentation"
        >
          <div
            ref={modalRef}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[hsl(var(--border))] bg-card-glass shadow-elevated focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-[hsl(var(--border)/0.5)] bg-[hsl(var(--background)/0.7)] p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary font-display text-2xl font-black text-primary-foreground shadow-glow">
                  {getInitials(selectedPlayer.nick)}
                </div>

                <div>
                  <h2
                    id="modal-title"
                    className="font-display text-2xl font-black tracking-tight text-primary"
                  >
                    {selectedPlayer.nick}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {selectedPlayer.name} • {selectedPlayer.country}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlayer(null)}
                className="rounded-xl px-2 text-2xl text-muted-foreground transition hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--secondary)/0.35)] p-4">
                  <div className="mb-1 text-xs text-muted-foreground">Time</div>

                  <div className="text-lg font-semibold text-foreground">
                    {selectedPlayer.team}
                  </div>
                </div>

                <div className="rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--secondary)/0.35)] p-4">
                  <div className="mb-1 text-xs text-muted-foreground">Role</div>

                  <div className="text-lg font-semibold text-foreground">
                    {selectedPlayer.role}
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div>
                <h3 className="mb-3 font-display text-lg font-bold text-foreground">
                  Estatísticas
                </h3>

                <div className="grid grid-cols-4 gap-3">
                  <div className="rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--secondary)/0.35)] p-3 text-center">
                    <div className="font-display text-2xl font-black text-primary">
                      {selectedPlayer.kda.toFixed(1)}
                    </div>

                    <div className="text-xs text-muted-foreground">KDA</div>
                  </div>

                  <div className="rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--secondary)/0.35)] p-3 text-center">
                    <div className="font-display text-2xl font-black text-emerald-400">
                      {selectedPlayer.winrate}%
                    </div>

                    <div className="text-xs text-muted-foreground">Winrate</div>
                  </div>

                  <div className="rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--secondary)/0.35)] p-3 text-center">
                    <div className="font-display text-2xl font-black text-amber-300">
                      {selectedPlayer.games}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Partidas
                    </div>
                  </div>

                  <div className="rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--secondary)/0.35)] p-3 text-center">
                    <div className="font-display text-2xl font-black text-primary">
                      #{selectedPlayer.rank}
                    </div>

                    <div className="text-xs text-muted-foreground">Posição</div>
                  </div>
                </div>
              </div>

              {/* Histórico */}
              <div>
                <h3 className="mb-3 font-display text-lg font-bold text-foreground">
                  Histórico Recente
                </h3>

                <div className="space-y-2">
                  {MATCH_HISTORY.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between rounded-xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--secondary)/0.25)] p-3"
                    >
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {match.champion}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {match.date}
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={
                            match.result === "Vitória"
                              ? "text-sm font-bold text-emerald-400"
                              : "text-sm font-bold text-rose-400"
                          }
                        >
                          {match.result}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {match.kda}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="rounded-xl bg-gradient-primary py-2 font-bold text-primary-foreground shadow-glow transition hover:opacity-90">
                  Seguir
                </button>

                <button className="rounded-xl border border-border bg-[hsl(var(--secondary)/0.5)] py-2 font-bold text-foreground transition hover:border-primary/40">
                  Comparar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PlayersPage;
