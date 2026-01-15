import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@research.com");
  const [password, setPassword] = useState("Admin123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Per ora NON chiamiamo backend: simuliamo login ok
    // Step successivo: lo colleghiamo davvero con JWT.
    setTimeout(() => {
      setLoading(false);
      // Simuliamo token
      localStorage.setItem("admin_token", "demo-token");
      window.location.href = "/admin/dashboard";
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* Header */}
      <header className="bg-[#2f6fb6] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-white/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M20 2H6.5A2.5 2.5 0 0 0 4 4.5V19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 6h8M8 10h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-lg font-semibold">Portale Ricerca Scientifica</div>
          </div>

          <a
            href="/"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2f6fb6] shadow-sm hover:bg-slate-50"
          >
            Torna al sito
          </a>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto grid max-w-6xl place-items-center px-6 py-16">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="text-2xl font-bold">Accesso Admin</div>
          <p className="mt-2 text-sm text-slate-600">
            Inserisci le credenziali per accedere alla dashboard.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-[#2f6fb6] focus:ring-2"
                placeholder="admin@research.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-[#2f6fb6] focus:ring-2"
                placeholder="********"
                required
              />
              <p className="mt-2 text-xs text-slate-500">
                Demo: admin@research.com / Admin123!
              </p>
            </div>

            {error ? (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-[#2f6fb6] px-4 py-3 text-sm font-semibold text-white hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Accesso..." : "Accedi"}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-[#0f172a] py-8 text-center text-sm text-slate-300">
        © 2024 Portale Ricerca Scientifica. Tutti i diritti riservati.
      </footer>
    </div>
  );
}