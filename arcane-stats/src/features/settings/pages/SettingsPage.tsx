import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../../../components/ScrollReveal'
import { useConfig, defaultConfigs } from '../../../hooks/useConfig'

const SettingsPage = () => {
  const { configs, saveConfigs, resetConfigs } = useConfig()
  const [localConfigs, setLocalConfigs] = useState(configs)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (configs) {
      setLocalConfigs(configs)
    }
  }, [configs])

  const toggleConfig = (key: keyof typeof configs) => {
    setLocalConfigs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const updateInterval = (value: number) => {
    setLocalConfigs((prev) => ({
      ...prev,
      intervaloRefresh: value,
    }))
  }

  const handleSave = () => {
    const success = saveConfigs(localConfigs)
    if (success) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
      const success = resetConfigs()
      if (success) {
        setLocalConfigs(defaultConfigs)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }
    }
  }

  const ConfigSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <ScrollReveal preset="up" duration={0.5}>
      <div className="bg-[#1D2D50] p-6 rounded-lg border border-white/5 shadow-lg mb-6">
        <h3 className="space-grotesk-title text-xl font-semibold text-[#E0E0E0] mb-4 pb-3 border-b border-white/10">
          {title}
        </h3>
        {children}
      </div>
    </ScrollReveal>
  )

  const ToggleSwitch = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string
    description?: string
    checked: boolean
    onChange: () => void
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex-1">
        <div className="sora-text text-[#E0E0E0] font-medium">{label}</div>
        {description && <div className="sora-text text-sm text-[#A8A8A8] mt-1">{description}</div>}
      </div>
      <button
        onClick={onChange}
        className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${checked ? 'bg-[#0077B6]' : 'bg-[#4A5568]'}`}
      >
        <motion.div
          className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  )

  return (
    <main className="flex-1 p-8 bg-[#0B132B] min-h-screen">
      <div className="mb-6">
        <h2 className="space-grotesk-title text-3xl font-bold mb-2 text-[#E0E0E0]">Configurações</h2>
        <p className="sora-text text-[#A8A8A8]">Personalize sua experiência na plataforma</p>
      </div>

      <div className="max-w-4xl">
        <ConfigSection title="Preferências de Visual">
          <ToggleSwitch
            label="Animações"
            description="Ativar animações e transições suaves"
            checked={localConfigs.animacoes}
            onChange={() => toggleConfig('animacoes')}
          />
          <ToggleSwitch
            label="Reduzir Movimento"
            description="Desativar animações para melhor acessibilidade"
            checked={localConfigs.reduzirMovimento}
            onChange={() => toggleConfig('reduzirMovimento')}
          />
          <ToggleSwitch
            label="Densidade Compacta"
            description="Exibir mais informações em menos espaço"
            checked={localConfigs.densidadeCompacta}
            onChange={() => toggleConfig('densidadeCompacta')}
          />
        </ConfigSection>

        <ConfigSection title="Notificações">
          <ToggleSwitch
            label="Notificações Push"
            description="Receber notificações no navegador"
            checked={localConfigs.notificacoesPush}
            onChange={() => toggleConfig('notificacoesPush')}
          />
          <ToggleSwitch
            label="Notificações por Email"
            description="Receber atualizações importantes por email"
            checked={localConfigs.notificacoesEmail}
            onChange={() => toggleConfig('notificacoesEmail')}
          />
          <ToggleSwitch
            label="Alertas de Partidas"
            description="Notificar sobre novas partidas registradas"
            checked={localConfigs.alertasPartidas}
            onChange={() => toggleConfig('alertasPartidas')}
          />
          <ToggleSwitch
            label="Alertas de Estatísticas"
            description="Notificar sobre mudanças significativas nas estatísticas"
            checked={localConfigs.alertasEstatisticas}
            onChange={() => toggleConfig('alertasEstatisticas')}
          />
        </ConfigSection>

        <ConfigSection title="Exibição">
          <ToggleSwitch
            label="Mostrar Gráficos"
            description="Exibir gráficos e visualizações de dados"
            checked={localConfigs.mostrarGraficos}
            onChange={() => toggleConfig('mostrarGraficos')}
          />
          <ToggleSwitch
            label="Mostrar Dicas"
            description="Exibir painel de dicas estratégicas"
            checked={localConfigs.mostrarDicas}
            onChange={() => toggleConfig('mostrarDicas')}
          />
          <ToggleSwitch
            label="Atualização Automática"
            description="Atualizar dados automaticamente"
            checked={localConfigs.autoRefresh}
            onChange={() => toggleConfig('autoRefresh')}
          />
          {localConfigs.autoRefresh && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <label className="sora-text text-[#E0E0E0] block mb-2">
                Intervalo de Atualização: {localConfigs.intervaloRefresh}s
              </label>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={localConfigs.intervaloRefresh}
                onChange={(e) => updateInterval(Number(e.target.value))}
                className="w-full h-2 bg-[#0B132B] rounded-lg appearance-none cursor-pointer accent-[#0077B6]"
              />
              <div className="flex justify-between text-xs text-[#A8A8A8] mt-1">
                <span>10s</span>
                <span>300s</span>
              </div>
            </div>
          )}
        </ConfigSection>

        <ConfigSection title="Privacidade e Dados">
          <ToggleSwitch
            label="Salvar Histórico"
            description="Armazenar histórico de partidas localmente"
            checked={localConfigs.salvarHistorico}
            onChange={() => toggleConfig('salvarHistorico')}
          />
          <ToggleSwitch
            label="Compartilhar Estatísticas"
            description="Permitir que outros vejam suas estatísticas públicas"
            checked={localConfigs.compartilharEstatisticas}
            onChange={() => toggleConfig('compartilharEstatisticas')}
          />
          <ToggleSwitch
            label="Modo Privado"
            description="Ocultar suas informações de outros usuários"
            checked={localConfigs.modoPrivado}
            onChange={() => toggleConfig('modoPrivado')}
          />
        </ConfigSection>

        <ConfigSection title="Performance">
          <ToggleSwitch
            label="Cache de Imagens"
            description="Armazenar imagens em cache para carregamento mais rápido"
            checked={localConfigs.cacheImagens}
            onChange={() => toggleConfig('cacheImagens')}
          />
          <ToggleSwitch
            label="Pré-carregar Dados"
            description="Carregar dados antecipadamente para melhor experiência"
            checked={localConfigs.preloadDados}
            onChange={() => toggleConfig('preloadDados')}
          />
        </ConfigSection>

        <ScrollReveal preset="up" delay={0.3} duration={0.5}>
          <div className="flex gap-4 mt-6 items-center">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#0077B6] text-white rounded-lg font-semibold hover:bg-[#00B4D8] transition-colors"
            >
              Salvar Configurações
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-[#1D2D50] text-[#E0E0E0] rounded-lg font-semibold hover:bg-[#2D3D60] border border-white/5 transition-colors"
            >
              Restaurar Padrões
            </button>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-2 bg-[#4CAF50]/20 text-[#4CAF50] rounded-lg border border-[#4CAF50]/30"
              >
                <span>✓</span>
                <span className="text-sm font-medium">Configurações salvas!</span>
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}

export default SettingsPage
