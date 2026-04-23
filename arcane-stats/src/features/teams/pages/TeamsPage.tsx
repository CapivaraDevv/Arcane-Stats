import React from 'react'
import { motion } from 'framer-motion'
import PainelDicas from '../../../pages/PainelDicas'
import ScrollReveal from '../../../components/ScrollReveal'
import { useConfig } from '../../../hooks/useConfig'
import useTeams from '../hooks/useTeams'
import useAuthContext from '../../../hooks/useAuth'

const TeamsPage: React.FC = () => {
  const { configs } = useConfig()
  const { teams, createTeam, addMemberByEmail, findUserById } = useTeams()
  const { user } = useAuthContext()

  const [newName, setNewName] = React.useState('')
  const [newTag, setNewTag] = React.useState('')
  const [createMsg, setCreateMsg] = React.useState<string | null>(null)
  const [addEmailByTeam, setAddEmailByTeam] = React.useState<Record<number, string>>({})
  const [addMsgByTeam, setAddMsgByTeam] = React.useState<Record<number, string>>({})

  async function createTeamHandler() {
    setCreateMsg(null)
    if (!user) return setCreateMsg('Faça login para criar um time')
    if (!newName) return setCreateMsg('Nome é obrigatório')
    const res = await createTeam(newName.trim(), newTag.trim(), user.id)
    if (!res.success) return setCreateMsg(res.message || 'Erro')
    setCreateMsg('Time criado com sucesso')
    setNewName('')
    setNewTag('')
  }

  return (
    <main className="relative flex-1 p-8 bg-transparent min-h-screen overflow-hidden">
      <div className="relative z-10">
        <h2 className="space-grotesk-title text-3xl font-bold mb-2 text-[#E0E0E0]">Arcane Team Control</h2>
        <p className="sora-text text-[#A8A8A8]">Gerencie seus times, analise desempenho e descubra padrões estratégicos.</p>

        <div className="mt-4 mb-6 p-4 bg-[#0B132B] rounded border border-white/5 max-w-lg">
          <div className="text-sm text-[#A8A8A8] mb-2">Criar novo time</div>
          <div className="flex gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome do time"
              className="p-2 rounded bg-[#1D2D50] text-white flex-1"
            />
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="TAG"
              className="p-2 rounded bg-[#1D2D50] text-white w-28"
            />
            <button onClick={createTeamHandler} className="bg-[#00B4D8] text-black px-3 rounded font-semibold">
              Criar
            </button>
          </div>
          {createMsg && <div className="text-sm mt-2 text-[#A8A8A8]">{createMsg}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {teams.length === 0 && <div className="text-sm text-[#A8A8A8]">Nenhum time criado ainda. Crie um acima.</div>}
        {teams.map((time, idx) => (
          <ScrollReveal key={time.id} preset="up" delay={idx * 0.15} duration={0.7}>
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-[#1D2D50] rounded-lg border border-white/5 shadow-lg hover:border-[#00B4D8]/50 transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute inset-0 animate-shimmer" />
              </div>

              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="space-grotesk-title text-2xl font-bold text-[#E0E0E0]">{time.nome}</h3>
                      <span className="px-2 py-1 bg-[#0077B6]/20 text-[#00B4D8] text-xs font-semibold rounded">{time.tag}</span>
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-[#A8A8A8]/10 text-[#A8A8A8]">
                        Criado por {time.creatorId === user?.id ? 'você' : 'outro'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#A8A8A8]">
                      <span>
                        Members: <span className="text-[#E0E0E0] font-semibold">{time.members.length}</span>
                      </span>
                      <span>•</span>
                      <span className="text-[#A8A8A8]">Desde {new Date(time.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-4">
                  <StatCard value={`${time.winrate ?? 0}%`} label="Winrate" color="text-[#4CAF50]" />
                  <StatCard value={String(time.partidas ?? 0)} label="Partidas" color="text-[#E0E0E0]" />
                  <StatCard value={String(time.vitorias ?? 0)} label="Vitórias" color="text-[#4CAF50]" />
                  <StatCard value={String(time.derrotas ?? 0)} label="Derrotas" color="text-[#F44336]" />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#A8A8A8] mb-2 uppercase tracking-wide">Roster</div>
                  {time.members.map((memberId, memberIndex) => {
                    const member = findUserById(memberId)
                    return (
                      <div
                        key={memberIndex}
                        className="flex items-center justify-between p-2 bg-[#0B132B] rounded border border-white/5 hover:border-[#0077B6]/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#0077B6]/20 flex items-center justify-center text-xs font-bold text-[#00B4D8]">
                            {member?.name ? member.name.charAt(0) : '?'}
                          </div>
                          <div className="text-sm font-semibold text-[#E0E0E0]">{member?.name || 'Usuário desconhecido'}</div>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded text-[#A8A8A8]">Membro</span>
                      </div>
                    )
                  })}

                  {user && user.id === time.creatorId && (
                    <div className="mt-3">
                      <div className="flex gap-2">
                        <input
                          value={addEmailByTeam[time.id] || ''}
                          onChange={(e) => setAddEmailByTeam((prev) => ({ ...prev, [time.id]: e.target.value }))}
                          placeholder="E-mail do usuário"
                          className="p-2 rounded bg-[#141f36] text-white flex-1"
                        />
                        <button
                          onClick={async () => {
                            setAddMsgByTeam((prev) => ({ ...prev, [time.id]: '' }))
                            const email = (addEmailByTeam[time.id] || '').trim()
                            if (!email) return setAddMsgByTeam((prev) => ({ ...prev, [time.id]: 'Informe um e-mail' }))
                            const res = await addMemberByEmail(time.id, email, user.id)
                            if (!res.success) return setAddMsgByTeam((prev) => ({ ...prev, [time.id]: res.message || 'Erro' }))
                            setAddMsgByTeam((prev) => ({ ...prev, [time.id]: 'Adicionado com sucesso' }))
                            setAddEmailByTeam((prev) => ({ ...prev, [time.id]: '' }))
                          }}
                          className="bg-[#00B4D8] text-black px-3 rounded font-semibold"
                        >
                          Adicionar
                        </button>
                      </div>
                      {addMsgByTeam[time.id] && <div className="text-sm mt-2 text-[#A8A8A8]">{addMsgByTeam[time.id]}</div>}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {configs.mostrarDicas && (
        <ScrollReveal preset="up" delay={0.5} duration={0.6}>
          <PainelDicas />
        </ScrollReveal>
      )}
    </main>
  )
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center p-3 bg-[#0B132B] rounded border border-white/5">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-[#A8A8A8]">{label}</div>
    </div>
  )
}

export default TeamsPage
