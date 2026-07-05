export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          Radar Vivo
        </h1>

        <p className="text-xl text-gray-400 mb-8">
          Seu próximo cliente já existe.
          <br />
          Nós mostramos quem é.
        </p>

        <button className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3 rounded-xl transition">
          Entrar no Sistema
        </button>
      </div>
    </main>
  );
}
