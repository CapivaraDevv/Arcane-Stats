

const dicasExemplo = [
  { id: 1, icone: "💡", texto: "Seu time tem ótima iniciação. Aproveite para agrupar e forçar lutas." },
  { id: 2, icone: "🛡️", texto: "Cuidado com falta de dano em área. Considere controlar objetivos em grupo." },
  { id: 3, icone: "🎯", texto: "Aposte em avançar visão, já que seu time tem múltiplos campeões de pick off." }
];

export default function PainelDicas() {
  return (
    <aside className="bg-[#2d1b4e] p-4 rounded-lg shadow-lg w-full max-w-md mx-auto mt-4 border border-[#6b46c1]/30">
      <h2 className="text-lg font-bold mb-2 text-white space-grotesk-title">Dicas de Estratégia</h2>
      <ul>
        {dicasExemplo.map(dica => (
          <li key={dica.id} className="dicas bg-[#4a2c6d] my-2 p-3 rounded flex items-center text-white transition-all hover:bg-[#6b46c1] hover:shadow-lg hover:shadow-[#8b5cf6]/50 border border-[#6b46c1]/20">
            <span className="text-2xl mr-3">{dica.icone}</span>
            <span className="text-[#c4b5fd]">{dica.texto}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}