// src/features/teams/components/ModalFooter.tsx
import { motion } from "framer-motion";

type ModalFooterProps = {
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  confirmLabel: string;
};

const ModalFooter = ({
  onCancel,
  onConfirm,
  disabled,
  confirmLabel,
}: ModalFooterProps) => (
  <div className="mt-6 flex justify-end gap-2">
    <button
      onClick={onCancel}
      className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.4)] px-4 py-2.5 text-sm font-bold transition hover:bg-secondary"
    >
      Cancelar
    </button>

    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      disabled={disabled}
      onClick={onConfirm}
      className="rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
    >
      {confirmLabel}
    </motion.button>
  </div>
);

export default ModalFooter;