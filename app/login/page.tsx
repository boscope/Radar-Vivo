export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-white text-center">
          Radar Vivo
        </h1>

        <p className="text-zinc-400 text-center mt-2 mb-8">
          Entre na sua conta
        </p>

        <form className="space-y-5">

          <div>
            <label className="text-zinc-300 text-sm">
              E-mail
            </label>

            <input
              type="email"
              className="mt-2 w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 text-white"
              placeholder="voce@email.com"
            />
          </div>

          <div>
            <label className="text-zinc-300 text-sm">
              Senha
            </label>

            <input
              type="password"
              className="mt-2 w-full rounded-lg bg-zinc-800 border border-zinc-700 p-3 text-white"
              placeholder="********"
            />
          </div>

          <button
            className="w-full bg-green-500 hover:bg-green-400 transition rounded-lg py-3 font-bold text-black"
          >
            Entrar
          </button>

        </form>

      </div>
    </main>
  );
}