import { motion } from "framer-motion";
import { Users, Plus } from "lucide-react";

type Props = {
  onCreate: () => void;
};

export default function TeamsHeader({ onCreate }: Props) {
  return (
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
              Times
            </h1>
            <p className="text-xs text-muted-foreground">
              Gerencie squads, escale jogadores e simule embates.
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onCreate}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition"
        >
          <Plus className="h-4 w-4" />
          <span>Novo time</span>
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[hsl(0_0%_100%/0.3)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </motion.button>
      </div>
    </header>
  );
}