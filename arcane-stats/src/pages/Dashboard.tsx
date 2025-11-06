const Dashboard = () => {
  return (
    <main className="flex-1 p-8 bg-zinc-50 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <span className="text-4xl font-bold text-blue-500">24</span>
          <span className="sora-text mt-2 text-sm text-zinc-500">Times Cadastrados</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <span className="text-4xl font-bold text-green-500">152</span>
          <span className="sora-text mt-2 text-sm text-zinc-500">Jogadores Ativos</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <span className="text-4xl font-bold text-purple-500">78</span>
          <span className="sora-text mt-2 text-sm text-zinc-500">Partidas Registradas</span>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

