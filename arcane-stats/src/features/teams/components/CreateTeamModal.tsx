// src/features/teams/components/CreateTeamModal.tsx
import { useState } from "react";

import ModalFooter from "./ModalFooter";
import ModalShell from "./ModalShell";

type CreateTeamModalProps = {
  onClose: () => void;
  onCreate: (name: string) => void;
};

const CreateTeamModal = ({
  onClose,
  onCreate,
}: CreateTeamModalProps) => {
  const [name, setName] = useState("");

  return (
    <ModalShell
      title="Criar novo time"
      subtitle="Dê um nome de impacto ao seu time"
      onClose={onClose}
    >
      <label className="text-[10px] font-bold uppercase tracking-widest">
        Nome do time
      </label>

      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Hextech Vanguards"
        className="mt-2 w-full rounded-xl text-muted-foreground border border-border bg-[hsl(var(--background)/0.6)] px-4 py-3 text-sm font-medium backdrop-blur-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] focus:ring-inset"
      />

      <ModalFooter
        onCancel={onClose}
        onConfirm={() => onCreate(name.trim())}
        disabled={!name.trim()}
        confirmLabel="Criar time"
      />
    </ModalShell>
  );
};

export default CreateTeamModal;