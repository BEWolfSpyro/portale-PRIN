import { useEffect, useState } from "react";
import Header from "../components/Header";
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
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#f5f7fb]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight">Research Output of Project: Smart COmmunities for Resilient Energy Transition - SCORET </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Project Code 2022YYMWTJ CUPD53D23001600006, financed by the European Union- Next Generation EU, Mission 4 ‘Education and Research’- Component C2 Investment 1.1, ‘Fund for the 2022 National Research Programme and Projects of Significant National Interest (PRIN 2022)’
This website collects all research results and final deliverables.
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
                  stroke="#2B65AF"
                  strokeWidth="2"
                />
                <path d="M14 3v4a2 2 0 0 0 2 2h4" stroke="#2B65AF" strokeWidth="2" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Articles and Conference Proceedings</h2>
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
        cta="Go to the paper"
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
                  stroke="#2B65AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="m7 10 5 5 5-5"
                  stroke="#2B65AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 21h16"
                  stroke="#2B65AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Activities Reports</h2>
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
        cta="Go to the report"
        href={r.url || "#"}
      />
    ))
  )}
</div>
        </section>
      </main>

      <footer className="bg-[#0f172a] py-8 text-center text-sm text-slate-300">
        © 2024 Portal PRIN 2022 - SCORET. Tutti i diritti riservati.
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#2B65AF] px-4 py-3 text-sm font-semibold text-white hover:brightness-95"
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

function CardReport({ titolo, data, descrizione, autori, cta, href }) {
  return (
    <CardBase>
      <div className="text-lg font-semibold">{titolo}</div>
      <div className="mt-1 text-sm text-slate-500">{data}</div>

      <div className="mt-6 text-sm text-slate-600">{descrizione}</div>

      <div className="mt-6 text-sm font-semibold">Autori:</div>
      <div className="mt-1 text-sm text-slate-600">{autori}</div>

      <a
        href={href}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#2B65AF] px-4 py-3 text-sm font-semibold text-white hover:brightness-95"
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