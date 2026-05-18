import type { AnalysisReport } from './analysisTypes'

export const MOCK_ANALYSIS: AnalysisReport = {
  gradeGlobal: 'B+',
  diagnosticoGeral:
    'Você demonstra um perfil sólido de top lane com boa mecânica individual e presença de mapa consistente. Seus maiores problemas estão no cs/min e na tomada de decisão em split push, onde tende a perder trades de objetivos por overextend. As últimas 10 partidas mostram melhora clara no KDA (+46%), mas o Damage Efficiency e Gold/min ainda estão abaixo da média do ELO para a lane. A tendência é positiva — foco em farm e decisão de mapa pode subir sua nota para A- em 2 semanas.',

  metricas: [
    { name: 'Farm/min', unit: 'cs', value: 5.46, benchmark: 7.0, deviation: -22 },
    { name: 'KDA', unit: 'ratio', value: 3.2, benchmark: 3.0, deviation: 7 },
    { name: 'Gold/min', unit: 'g', value: 312, benchmark: 380, deviation: -18 },
    { name: 'DPM', unit: 'dmg', value: 620, benchmark: 750, deviation: -17 },
    { name: 'Kill Participation', unit: '%', value: 52, benchmark: 55, deviation: -5 },
    { name: 'Vision/min', unit: 'wards', value: 0.8, benchmark: 0.9, deviation: -11 },
    { name: 'Damage Efficiency', unit: '%', value: 68, benchmark: 82, deviation: -17 },
  ],

  radarData: [
    { subject: 'Mecânica', value: 72, fullMark: 100 },
    { subject: 'Farm', value: 48, fullMark: 100 },
    { subject: 'Agressividade', value: 80, fullMark: 100 },
    { subject: 'Visão', value: 62, fullMark: 100 },
    { subject: 'Macro', value: 55, fullMark: 100 },
    { subject: 'Consistência', value: 68, fullMark: 100 },
  ],

  pool: [
    { champion: 'Darius', games: 18, winrate: 67, kda: 3.8, grade: 'A' },
    { champion: 'Garen', games: 12, winrate: 58, kda: 3.1, grade: 'B+' },
    { champion: 'Renekton', games: 9, winrate: 44, kda: 2.4, grade: 'C' },
    { champion: 'Fiora', games: 7, winrate: 43, kda: 2.9, grade: 'C' },
    { champion: 'Camille', games: 4, winrate: 75, kda: 4.2, grade: 'S' },
  ],

  gargalos: [
    'Farm/min 22% abaixo da média do ELO — perda consistente de CS após o minuto 12',
    'Overextend em split push causa mortes desnecessárias em ~40% das partidas analisadas',
    'Gold/min abaixo da média do ELO indica ineficiência na conversão de vantagens de lane',
    'Damage Efficiency baixo sugere dano desperdiçado em minions durante teamfights',
  ],

  pontosPositivos: [
    'KDA acima da média do ELO — controle de risco em fights melhorou 15% nas últimas 10 partidas',
    'Darius e Camille apresentam excelente winrate — alta sinergia com seu estilo de jogo',
    'Agressividade no early game consistente com os padrões de alto elo para top lane',
    'Participação em lutas de equipe (Kill Participation) próxima da média do ELO',
  ],

  trendData: [
    { partida: '#20', kda: 1.8, winrate: 0 },
    { partida: '#19', kda: 2.1, winrate: 100 },
    { partida: '#18', kda: 1.2, winrate: 0 },
    { partida: '#17', kda: 3.5, winrate: 100 },
    { partida: '#16', kda: 2.8, winrate: 0 },
    { partida: '#15', kda: 1.5, winrate: 0 },
    { partida: '#14', kda: 4.2, winrate: 100 },
    { partida: '#13', kda: 2.0, winrate: 100 },
    { partida: '#12', kda: 1.9, winrate: 0 },
    { partida: '#11', kda: 3.1, winrate: 100 },
    { partida: '#10', kda: 3.8, winrate: 100 },
    { partida: '#9', kda: 2.6, winrate: 0 },
    { partida: '#8', kda: 4.5, winrate: 100 },
    { partida: '#7', kda: 3.9, winrate: 100 },
    { partida: '#6', kda: 2.2, winrate: 0 },
    { partida: '#5', kda: 5.1, winrate: 100 },
    { partida: '#4', kda: 3.3, winrate: 100 },
    { partida: '#3', kda: 4.0, winrate: 100 },
    { partida: '#2', kda: 2.8, winrate: 0 },
    { partida: '#1', kda: 4.8, winrate: 100 },
  ],

  recentVsOld: [
    { label: 'KDA', recent: 3.8, old: 2.6, unit: '' },
    { label: 'Winrate', recent: 62, old: 48, unit: '%' },
    { label: 'Farm/min', recent: 5.8, old: 5.1, unit: 'cs' },
    { label: 'Gold/min', recent: 340, old: 285, unit: 'g' },
  ],

  planoDeAcao: [
    {
      title: 'Focar em cs/min — meta: 6.5+ cs/min nas próximas 10 partidas',
      detail:
        'Pratique last hit em custom games por 15 minutos antes de cada sessão ranqueada. Priorize sempre pegar a wave antes de teleportar ou rotar para objetivos. Fique atento aos cannon minions — representam ~10% do gold total por wave. Evite empurrar a wave sem necessidade quando não há visão no rio.',
      priority: 'alta',
    },
    {
      title: 'Reduzir mortes por overextend no split push',
      detail:
        'Recue imediatamente ao ver dois ou mais inimigos desaparecidos no minimap. Coloque ward no tribush e pixel bush antes de pressionar a torre. Use TP como saída de emergência apenas quando absolutamente necessário — preservar o cooldown tem mais valor na maioria dos cenários.',
      priority: 'alta',
    },
    {
      title: 'Refinar o pool — focar em Darius e Camille',
      detail:
        'Seus dados mostram winrate negativo com Renekton (44%) e Fiora (43%). Concentre o tempo em Darius (67% WR) e Camille (75% WR). Pool menor com maestria maior é consistentemente mais eficiente para subir de elo do que um pool amplo com performance mediana.',
      priority: 'média',
    },
    {
      title: 'Melhorar Damage Efficiency — menos dano em minions',
      detail:
        'Ao revisar replays, foque especificamente em teamfights. Identifique momentos onde você auto-ataca minions ou estruturas durante engagements. Regra prática: se há um champion no campo de visão, foque-o antes de qualquer outro alvo. Auto-attacks em estruturas durante fights custam DPM e podem custar o fight.',
      priority: 'média',
    },
    {
      title: 'Aumentar ward placement para 1.0+ wards/min',
      detail:
        'Adote o hábito: ward sempre ao comprar itens no base. Ao chegar na lane, coloque ward imediatamente no arbusto de rio. Use Control Wards em todos os recalls — o custo/benefício é sempre positivo em ELOs até Diamond. Dewarding o ward de river evita ganks, o que impacta diretamente seu cs/min e sobrevivência.',
      priority: 'baixa',
    },
  ],

  recomendacoes: [
    {
      champion: 'Garen',
      motivo:
        'Baixo risco e alta resistência a erros. Permite focar em decisões de macro e farm sem punição mecânica severa — ideal para corrigir os gargalos identificados.',
    },
    {
      champion: 'Malphite',
      motivo:
        'Complementa seu estilo agressivo com engage garantido via ult. Aumenta Kill Participation naturalmente e é altamente eficiente em teamfights onde você tende a subar.',
    },
    {
      champion: 'Nasus',
      motivo:
        'Treinar farm intensivo com Nasus cria o hábito correto de priorizar minions (stackar Q). Impacto direto no seu cs/min global e na consistência de farm ao longo do jogo.',
    },
  ],

  metas: [
    { metric: 'Farm/min', current: 5.46, target: 7.0, unit: 'cs' },
    { metric: 'Winrate (próx. 10)', current: 52, target: 60, unit: '%' },
    { metric: 'Gold/min', current: 312, target: 380, unit: 'g' },
  ],
}
