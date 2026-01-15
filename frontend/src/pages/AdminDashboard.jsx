export default function AdminDashboard() {
  function logout() {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin";
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
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
            <div className="text-lg font-semibold">Dashboard Admin</div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2f6fb6] shadow-sm hover:bg-slate-50"
            >
              Vai al sito
            </a>
            <button
              onClick={logout}
              className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Pannello di Controllo</h1>
        <p className="mt-3 text-slate-600">
          Gestisci articoli scientifici e report del progetto.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <StatCard title="Articoli" value="0" />
          <StatCard title="Report" value="0" />
          <StatCard title="Totale Pubblicazioni" value="0" />
        </div>

        <div className="mt-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Pubblicazioni</div>
              <div className="mt-1 text-sm text-slate-600">
                Qui compariranno le pubblicazioni create dall’admin.
              </div>
            </div>

            <button
              type="button"
              className="rounded-md bg-[#2f6fb6] px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
              onClick={() => alert("Step prossimo: modale 'Nuova pubblicazione'")}
            >
              + Nuova pubblicazione
            </button>
          </div>

          <div className="mt-6 rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
            Nessuna pubblicazione ancora.
          </div>
        </div>
      </main>

      <footer className="bg-[#0f172a] py-8 text-center text-sm text-slate-300">
        © 2024 Portale Ricerca Scientifica. Tutti i diritti riservati.
      </footer>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="text-sm font-semibold text-slate-600">{title}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}