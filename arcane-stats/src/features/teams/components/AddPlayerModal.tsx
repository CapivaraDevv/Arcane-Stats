// src/features/teams/components/AddPlayerModal.tsx
import { useState } from "react";
import { Sparkles } from "lucide-react";

import ModalFooter from "./ModalFooter";
import ModalShell from "./ModalShell";

type AddPlayerModalProps = {
  onClose: () => void;
  onSubmit: (p: { name: string; tag: string }) => void;
};

const AddPlayerModal = ({
  onClose,
  onSubmit,
}: AddPlayerModalProps) => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const valid =
    name.trim().length >= 2 &&
    tag.trim().length >= 2;

  return (
    <ModalShell
      title="Adicionar jogador"
      subtitle="Use o Riot ID (Nome + Tag)"
      onClose={onClose}
    >
      <div className="grid grid-cols-[1fr_140px] gap-4">
        <div>
          <label className="text-[10px] p-1 font-bold uppercase tracking-widest">
            Nome
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Faker"
            className="mt-2 w-full rounded-xl border border-border
            bg-[hsl(var(--background)/0.6)]
            px-4 py-3 text-sm text-muted-foreground font-medium
            focus:outline-none
            focus:border-primary
            focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)]
            focus:ring-inset"
          />
        </div>

        <div>
          <label className="text-[10px] p-1 font-bold uppercase tracking-widest">
            Tag
          </label>

          <div className="mt-2 flex items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.6)] focus-within:border-primary focus-within:ring-2 focus-within:ring-[hsl(var(--primary)/0.3)]">
            <span className="px-3 font-display text-sm font-bold text-primary">
              #
            </span>

            <input
              value={tag}
              onChange={(e) =>
                setTag(e.target.value.replace("#", ""))
              }
              placeholder="KR1"
              className="w-full bg-transparent text-muted-foreground py-3 pr-3 text-sm font-medium focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.05)] p-3">
        <div className="flex items-start gap-2">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Buscaremos as estatísticas reais do jogador via Riot API após
            confirmar.
          </p>
        </div>
      </div>

      <ModalFooter
        onCancel={onClose}
        onConfirm={() =>
          onSubmit({
            name: name.trim(),
            tag: tag.trim(),
          })
        }
        disabled={!valid}
        confirmLabel="Adicionar"
      />
    </ModalShell>
  );
};

export default AddPlayerModal;