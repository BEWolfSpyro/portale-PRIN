import { useEffect, useState } from "react";
export default function Home() {
const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/publications`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const articles = items.filter((x) => x.type === "article");
  const reports = items.filter((x) => x.type === "report");
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
            href="/admin"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2f6fb6] shadow-sm hover:bg-slate-50"
          >
            Area Admin
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#f5f7fb]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight">Prodotti della Ricerca</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Esplora gli articoli scientifici e i report del nostro progetto di ricerca.
            Scopri le pubblicazioni, scarica i documenti e rimani aggiornato sui progressi.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 pb-16">
        {/* Articoli */}
        <section className="mt-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 3h7l3 3v15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
                  stroke="#2f6fb6"
                  strokeWidth="2"
                />
                <path d="M14 3v4a2 2 0 0 0 2 2h4" stroke="#2f6fb6" strokeWidth="2" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Articoli Scientifici</h2>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {articles.length === 0 ? (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-slate-600">
      Nessun articolo ancora.
    </div>
  ) : (
    articles.map((a) => (
      <CardArticolo
        key={a.id}
        titolo={a.title}
        data={new Date(a.created_at).toLocaleDateString("it-IT")}
        abstract={a.description}
        autori={a.authors}
        cta="Vai al Sito"
        href={a.url || "#"}
      />
    ))
  )}
</div>
        </section>

        {/* Report */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white shadow-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3v12"
                  stroke="#2f6fb6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="m7 10 5 5 5-5"
                  stroke="#2f6fb6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 21h16"
                  stroke="#2f6fb6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Report del Progetto</h2>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {reports.length === 0 ? (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-slate-600">
      Nessun report ancora.
    </div>
  ) : (
    reports.map((r) => (
      <CardReport
        key={r.id}
        titolo={r.title}
        data={new Date(r.created_at).toLocaleDateString("it-IT")}
        descrizione={r.description}
        autori={r.authors}
        filename={r.file_name || ""}
        size=""
      />
    ))
  )}
</div>
        </section>
      </main>

      <footer className="bg-[#0f172a] py-8 text-center text-sm text-slate-300">
        © 2024 Portale Ricerca Scientifica. Tutti i diritti riservati.
      </footer>
    </div>
  );
}

function CardBase({ children }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      {children}
    </div>
  );
}

function CardArticolo({ titolo, data, abstract, autori, cta, href }) {
  return (
    <CardBase>
      <div className="text-lg font-semibold">{titolo}</div>
      <div className="mt-1 text-sm text-slate-500">{data}</div>

      <div className="mt-6 text-sm text-slate-600">{abstract}</div>

      <div className="mt-6 text-sm font-semibold">Autori:</div>
      <div className="mt-1 text-sm text-slate-600">{autori}</div>

      <a
        href={href}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#2f6fb6] px-4 py-3 text-sm font-semibold text-white hover:brightness-95"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 3h7v7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 14 21 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {cta}
      </a>
    </CardBase>
  );
}

function CardReport({ titolo, data, descrizione, autori, filename, size }) {
  return (
    <CardBase>
      <div className="text-lg font-semibold">{titolo}</div>
      <div className="mt-1 text-sm text-slate-500">{data}</div>

      <div className="mt-6 text-sm text-slate-600">{descrizione}</div>

      <div className="mt-6 text-sm font-semibold">Autori:</div>
      <div className="mt-1 text-sm text-slate-600">{autori}</div>

      <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate">{filename}</span>
        <span>{size}</span>
      </div>

      <button
        type="button"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#2f6fb6] px-4 py-3 text-sm font-semibold text-white hover:brightness-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="m7 10 5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 21h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Scarica Report
      </button>
    </CardBase>
  );
}