import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Settings, CheckCircle2 } from 'lucide-react'
import ScrollReveal from '../../../components/ScrollReveal'
import DarkVeilBackground from '../../../components/DarkVeilBackground'
import { useConfig, defaultConfigs } from '../../../hooks/useConfig'

const SettingsPage = () => {
  const { configs, saveConfigs, resetConfigs } = useConfig()
  const [localConfigs, setLocalConfigs] = useState(configs)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (configs) setLocalConfigs(configs)
  }, [configs])

  const toggleConfig = (key: keyof typeof configs) => {
    setLocalConfigs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const updateInterval = (value: number) => {
    setLocalConfigs(prev => ({ ...prev, intervaloRefresh: value }))
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
      <div className="bg-card-glass rounded-2xl border border-border p-6 mb-4">
        <h3 className="space-grotesk-title text-base font-semibold text-foreground mb-4 pb-3 border-b border-border">
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
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1">
        <div className="sora-text text-sm font-medium text-foreground">{label}</div>
        {description && (
          <div className="sora-text text-xs text-muted-foreground mt-0.5">{description}</div>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative ml-4 w-12 h-6 rounded-full transition-colors duration-200 shrink-0 ${
          checked ? 'bg-primary' : 'bg-white/10'
        }`}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  )

  return (
    <div className="relative overflow-hidden min-h-screen">
      <DarkVeilBackground />
      <div className="relative z-10">

        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.6)] bg-[hsl(var(--background)/0.7)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-primary shadow-glow">
                  <Settings className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h1 className="font-display text-xl font-bold tracking-tight">Configurações</h1>
                <p className="text-xs text-muted-foreground">Personalize sua experiência na plataforma</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-8">

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
              <div className="mt-4 pt-4 border-t border-border">
                <label className="sora-text text-sm text-foreground block mb-3">
                  Intervalo de Atualização:{' '}
                  <span className="text-primary font-semibold">{localConfigs.intervaloRefresh}s</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={localConfigs.intervaloRefresh}
                  onChange={e => updateInterval(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary bg-white/10"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
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

          <ScrollReveal preset="up" delay={0.1} duration={0.5}>
            <div className="flex flex-wrap gap-3 items-center mt-2">
              <motion.button
                onClick={handleSave}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 bg-primary text-[hsl(var(--primary-foreground))] rounded-xl font-semibold text-sm"
              >
                Salvar Configurações
              </motion.button>
              <motion.button
                onClick={handleReset}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 bg-card-glass border border-border text-foreground rounded-xl font-semibold text-sm hover:border-[hsl(var(--primary)/0.3)] transition-colors"
              >
                Restaurar Padrões
              </motion.button>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 text-emerald-400 rounded-xl border border-emerald-500/30"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Configurações salvas!</span>
                </motion.div>
              )}
            </div>
          </ScrollReveal>

        </main>
      </div>
    </div>
  )
}

export default SettingsPage
