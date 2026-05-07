// src/features/teams/components/EmptyState.tsx
import { motion } from "framer-motion";
import { Plus, Shield } from "lucide-react";

type EmptyStateProps = {
  onCreate: () => void;
};

const EmptyState = ({ onCreate }: EmptyStateProps) => (
  <div className="relative flex h-[60vh] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[hsl(var(--primary)/0.3)] bg-card-glass shadow-card">
    <div className="absolute inset-0 bg-hex opacity-30" />

    <div className="relative text-center">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] shadow-glow"
      >
        <Shield className="h-8 w-8 text-primary" />
      </motion.div>

      <h2 className="mt-5 font-display text-2xl font-bold text-primary">
        Selecione um time
      </h2>

      <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
        Escolha um squad ao lado ou crie um novo para começar a montar sua
        composição.
      </p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCreate}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-primary mt-5 px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition cursor-pointer"
      >
        <Plus className="h-4 w-4" />

        <span>Novo time</span>

        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </motion.button>
    </div>
  </div>
);

export default EmptyState;