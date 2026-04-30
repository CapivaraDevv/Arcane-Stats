import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthContext from '../../../hooks/useAuth'

export default function RegisterPage() {
  const { register } = useAuthContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name || !email || !password) return setError('Preencha todos os campos')

    const res = await register(name, email, password)
    if (!res.success) return setError(res.message || 'Erro')

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Criar conta</h2>
          <p className="text-slate-400 text-sm mt-2">Comece a evoluir com dados reais das suas partidas</p>
        </div>

        <form onSubmit={handle} className="flex flex-col gap-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" />

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 bg-red-500/10 p-2 rounded-lg">
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl font-semibold text-white shadow-lg transition"
          >
            Criar conta
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-400">
          Já tem conta?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Entrar
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string }) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="p-3 rounded-xl bg-slate-800 text-white placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
  )
}
