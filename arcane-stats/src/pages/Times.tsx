import PainelDicas from "./PainelDicas";

const Times = () => {
  return (
    <main className="flex-1 p-8 bg-[#0B132B] min-h-screen">
      <h2 className="space-grotesk-title text-xl font-bold mb-6 text-[#E0E0E0]">Times</h2>
      <div className="bg-[#1D2D50] p-6 rounded-lg shadow border border-white/5">
        <p className="sora-text text-[#A8A8A8]">Lista de times será exibida aqui...</p>
      </div>
      <PainelDicas />
    </main>
    
  );
};

export default Times;

