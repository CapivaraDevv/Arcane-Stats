const dicasExemplo = [
  { id: 1, icone: '💡', texto: 'Seu time tem ótima iniciação. Aproveite para agrupar e forçar lutas.' },
  { id: 2, icone: '🛡️', texto: 'Cuidado com falta de dano em área. Considere controlar objetivos em grupo.' },
  { id: 3, icone: '🎯', texto: 'Aposte em avançar visão, já que seu time tem múltiplos campeões de pick off.' },
]

export default function PainelDicas() {
  return (
    <aside className="bg-[#1D2D50] p-4 rounded-lg shadow-lg w-full max-w-md mx-auto mt-4 border border-white/5">
      <h2 className="text-lg font-bold mb-2 text-[#E0E0E0] space-grotesk-title">Dicas de Estratégia</h2>
      <ul>
        {dicasExemplo.map((dica) => (
          <li
            key={dica.id}
            className="dicas bg-[#0B132B] my-2 p-3 rounded flex items-center text-[#E0E0E0] transition-all hover:bg-[#0077B6] hover:shadow-lg hover:shadow-[#00B4D8]/50 border border-white/5"
          >
            <span className="text-2xl mr-3">{dica.icone}</span>
            <span className="sora-text text-white">{dica.texto}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
