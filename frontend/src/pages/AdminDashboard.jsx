import { useEffect, useState } from "react";

export default function AdminDashboard() {
  function logout() {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin";
  }
const [showModal, setShowModal] = useState(false);
const [pubType, setPubType] = useState("article");
const [title, setTitle] = useState("");
const [authors, setAuthors] = useState("");
const [description, setDescription] = useState("");
const [url, setUrl] = useState("");
const [fileName, setFileName] = useState("");
const [saving, setSaving] = useState(false);
const [modalError, setModalError] = useState("");
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function fetchPublications() {
  setError("");
  setLoading(true);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/publications`);
    if (!res.ok) throw new Error("Errore caricamento pubblicazioni");
    const data = await res.json();
    setItems(data);
  } catch (e) {
    setError(e.message || "Errore");
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  fetchPublications();
}, []);

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
  <StatCard
    title="Articoli"
    value={items.filter((i) => i.type === "article").length}
  />
  <StatCard
    title="Report"
    value={items.filter((i) => i.type === "report").length}
  />
  <StatCard
    title="Totale Pubblicazioni"
    value={items.length}
  />
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
  onClick={() => setShowModal(true)}
>
  + Nuova pubblicazione
</button>
          </div>

          {loading ? (
  <div className="mt-6 rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-600">
    Caricamento...
  </div>
) : items.length === 0 ? (
  <div className="mt-6 rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
    Nessuna pubblicazione ancora.
  </div>
) : (
  <div className="mt-6 divide-y rounded-md border border-slate-200 bg-white">
    {items.map((p) => (
      <div
        key={p.id}
        className="flex items-start justify-between gap-4 p-4"
      >
        <div>
          <div className="text-sm font-semibold">
            {p.title}{" "}
            <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {p.type === "article" ? "Articolo" : "Report"}
            </span>
          </div>

          <div className="mt-1 text-xs text-slate-500">
            {p.authors}
          </div>

          <div className="mt-2 text-sm text-slate-600">
            {p.description}
          </div>

          {p.type === "article" && p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-[#2f6fb6] hover:underline"
            >
              Vai al sito
            </a>
          )}

          {p.type === "report" && p.file_name && (
            <div className="mt-2 text-xs text-slate-500">
              {p.file_name}
            </div>
          )}
        </div>

        <button
          className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
          onClick={async () => {
            const token = localStorage.getItem("admin_token");
            await fetch(
              `${import.meta.env.VITE_API_URL}/admin/publications/${p.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            fetchPublications();
          }}
        >
          Elimina
        </button>
      </div>
    ))}
  </div>
)}
        </div>
      </main>

      <footer className="bg-[#0f172a] py-8 text-center text-sm text-slate-300">
        © 2024 Portale Ricerca Scientifica. Tutti i diritti riservati.
      </footer>

{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Nuova Pubblicazione</div>
        <button
          onClick={() => setShowModal(false)}
          className="text-slate-500 hover:text-slate-800"
        >
          ✕
        </button>
      </div>

      <div className="mt-6">
        <label className="text-sm font-semibold">Tipo di pubblicazione</label>
        <select
  value={pubType}
  onChange={(e) => setPubType(e.target.value)}
  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
>
  <option value="article">Articolo Scientifico</option>
  <option value="report">Report del Progetto</option>
</select>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Titolo</label>
        <input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  type="text"
  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
  placeholder="Titolo della pubblicazione"
/>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Autori</label>
        <input
  value={authors}
  onChange={(e) => setAuthors(e.target.value)}
  type="text"
  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
  placeholder="Autori"
/>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Descrizione / Abstract</label>
        <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
  rows={3}
/>
      </div>

{pubType === "article" && (
  <div className="mt-4">
    <label className="text-sm font-semibold">URL articolo</label>
    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      type="url"
      className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      placeholder="https://..."
    />
  </div>
)}

{pubType === "report" && (
  <div className="mt-4">
    <label className="text-sm font-semibold">Nome file report</label>
    <input
      value={fileName}
      onChange={(e) => setFileName(e.target.value)}
      type="text"
      className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      placeholder="report-2026.pdf"
    />
  </div>
)}

      <div className="mt-4">
        <label className="text-sm font-semibold">File (solo per Report)</label>
        <input
          type="file"
          className="mt-2 w-full text-sm"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="rounded-md border border-slate-200 px-4 py-2 text-sm"
        >
          Annulla
        </button>
        <button
  className="rounded-md bg-[#2f6fb6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
  disabled={saving}
  onClick={async () => {
    setModalError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("admin_token");

      const body =
        pubType === "article"
          ? { type: "article", title, authors, description, url }
          : { type: "report", title, authors, description, file_name: fileName };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/publications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Errore salvataggio");
      }

      // reset campi
      setTitle("");
      setAuthors("");
      setDescription("");
      setUrl("");
      setFileName("");

      setShowModal(false);
      fetchPublications();
    } catch (e) {
      setModalError(e.message || "Errore");
    } finally {
      setSaving(false);
    }
  }}
>
  {saving ? "Salvataggio..." : "Salva"}
</button>
      </div>
    </div>
  </div>
)}

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