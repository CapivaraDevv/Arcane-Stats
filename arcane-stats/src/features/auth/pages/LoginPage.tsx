import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthContext from "../hooks/useAuth";

import ThreshImg from "../../../../public/Thresh_0.jpg";

export default function LoginPage() {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);

    setLoading(false);

    if (!res.success) return setError(res.message || "Erro");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-x-hidden bg-gradient-secundary">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img
          src={ThreshImg}
          alt=""
          className="w-screen h-screen object-cover"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "center",
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-glass-card backdrop-blur-lg p-8 rounded-3xl border border-slate-800 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Bem-vindo de volta</h2>
          <p className="text-slate-400 text-sm mt-2">
            Sua evolução começa aqui.
          </p>
        </div>

        <form onSubmit={handle} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 bg-red-500/10 p-2 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="mt-2 bg-[hsl(var(--primary)/0.8)] hover:bg-[hsl(var(--primary)/0.9)] py-3 rounded-xl font-semibold text-white shadow-lg transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-400">
          Não tem conta?{" "}
          <Link
            to="/register"
            className="text-[hsl(var(--primary)/0.6)] hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="p-3 rounded-xl bg-slate-800 text-white placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.8)] transition"
    />
  );
}
