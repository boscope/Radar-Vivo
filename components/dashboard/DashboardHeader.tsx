type DashboardHeaderProps = {
  onLogout: () => void;
};

export default function DashboardHeader({
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold">
          🚀 Radar Vivo
        </h1>

        <p className="text-zinc-400 mt-2">
          Enquanto você descansava, o Radar Vivo continuou procurando oportunidades.
        </p>
      </div>

      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-400 text-black font-bold px-5 py-3 rounded-lg"
      >
        Sair
      </button>
    </div>
  );
}