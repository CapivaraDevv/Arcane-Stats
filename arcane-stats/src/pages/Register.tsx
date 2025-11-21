import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuth';

export default function Register() {
  const { register } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) return setError('Preencha todos os campos');
    const res = await register(name, email, password);
    if (!res.success) return setError(res.message || 'Erro');
    navigate('/dashboard');
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-12 bg-[#0B132B] rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">Cadastro</h2>
      <form onSubmit={handle} className="flex flex-col gap-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" className="p-2 rounded bg-[#1D2D50] text-white" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="p-2 rounded bg-[#1D2D50] text-white" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Senha" className="p-2 rounded bg-[#1D2D50] text-white" />
        {error && <div className="text-sm text-red-400">{error}</div>}
        <button className="mt-2 bg-[#00B4D8] text-black py-2 rounded font-semibold">Cadastrar</button>
      </form>
      <p className="mt-4 text-sm text-gray-300">Já tem conta? <Link to="/login" className="text-[#00B4D8]">Entrar</Link></p>
    </div>
  );
}
