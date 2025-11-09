import PainelDicas from "./PainelDicas";

const Times = () => {
  return (
    <main className="flex-1 p-8 bg-zinc-50 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Times</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-zinc-600">Lista de times será exibida aqui...</p>
      </div>
      <PainelDicas />
    </main>
    
  );
};

export default Times;

