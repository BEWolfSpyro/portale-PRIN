import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function AdminDashboard() {
  function logout() {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin";
  }
const [showModal, setShowModal] = useState(false);
const [editingId, setEditingId] = useState(null);
const [pubType, setPubType] = useState("article");
const [title, setTitle] = useState("");
const [authors, setAuthors] = useState("");
const [description, setDescription] = useState("");
const [url, setUrl] = useState("");
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
      <Header rightLinkLabel="Homepage" rightLinkHref="/" />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Control panel</h1>
        <p className="mt-3 text-slate-600">
          Manage scientific articles and project reports.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
  <StatCard
    title="Papers"
    value={items.filter((i) => i.type === "article").length}
  />
  <StatCard
    title="Reports"
    value={items.filter((i) => i.type === "report").length}
  />
  <StatCard
    title="Lessons"
    value={items.filter((i) => i.type === "lesson").length}
  />
  <StatCard
    title="Total"
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
  className="rounded-md bg-[#2B65AF] px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
  onClick={() => setShowModal(true)}
>
  + New Document
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
  		{p.type === "article" && "Paper"}
  		{p.type === "report" && "Report"}
  		{p.type === "lesson" && "Lesson"}
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
              className="mt-2 inline-block text-sm font-semibold text-[#2B65AF] hover:underline"
            >
              Go to the paper
            </a>
          )}

          {p.type === "report" && p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-[#2B65AF] hover:underline"
            >
              Go to the report
            </a>
          )}

	{p.type === "lesson" && p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-[#2B65AF] hover:underline"
            >
              Go to the lesson
            </a>
          )}


	
        </div>

        <div className="flex items-center gap-2">
  <button
    className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
    onClick={() => {
      // Precompila la modale con i dati esistenti
      setPubType(p.type);
      setTitle(p.title || "");
      setAuthors(p.authors || "");
      setDescription(p.description || "");
      setUrl(p.url || "");

      setModalError("");
      setEditingId(p.id);
      setShowModal(true);
    }}
  >
    Edit
  </button>

  <button
    className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
    onClick={async () => {
      const token = localStorage.getItem("admin_token");
      await fetch(`${import.meta.env.VITE_API_URL}/admin/publications/${p.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPublications();
    }}
  >
    Detele
  </button>
</div>
      </div>
    ))}
  </div>
)}
        </div>
      </main>

      <footer className="bg-[#0f172a] py-8 text-center text-sm text-slate-300">
        © 2026 Portal PRIN 2022 - SCORET. Tutti i diritti riservati.
      </footer>

{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">
  {editingId ? "Edit Document" : "New Document"}
</div>
        <button
          onClick={() => {
  setShowModal(false);
  setEditingId(null);
  setModalError("");
}}
          className="text-slate-500 hover:text-slate-800"
        >
          ✕
        </button>
      </div>

{modalError && (
  <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
    {modalError}
  </div>
)}

      <div className="mt-6">
        <label className="text-sm font-semibold">Document type</label>
        <select
  	  value={pubType}
  	  onChange={(e) => {
            setPubType(e.target.value);
            setUrl("");
	  }}
  	  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
	>
  <option value="article">Scientific Paper</option>
  <option value="report">Report</option>
  <option value="lesson">Lessons Learned & Guidelines</option>
</select>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Title</label>
        <input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  type="text"
  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
  placeholder="Document title"
/>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Autori</label>
        <input
  value={authors}
  onChange={(e) => setAuthors(e.target.value)}
  type="text"
  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
  placeholder="Authors"
/>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold">Description / Abstract</label>
        <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
  rows={3}
/>
      </div>

{(pubType === "article" || pubType === "report" || pubType === "lesson") && (
  <div className="mt-4">
    <label className="text-sm font-semibold">
      {pubType === "article" && "URL paper"}
      {pubType === "report" && "URL report"}
      {pubType === "lesson" && "URL lesson"}
    </label>
    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      type="url"
      className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
      placeholder="https://..."
    />
  </div>
)}

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => {
  setShowModal(false);
  setEditingId(null);
  setModalError("");
}}
          className="rounded-md border border-slate-200 px-4 py-2 text-sm"
        >
          Annulla
        </button>
        <button
  className="rounded-md bg-[#2B65AF] px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
  disabled={saving}
  onClick={async () => {
    setModalError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("admin_token");

      const body = { type: pubType, title, authors, description, url };

      const endpoint = editingId
  ? `${import.meta.env.VITE_API_URL}/admin/publications/${editingId}`
  : `${import.meta.env.VITE_API_URL}/admin/publications`;

const method = editingId ? "PUT" : "POST";

const res = await fetch(endpoint, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(body),
});

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Save error");
      }

      // reset campi
      setTitle("");
      setAuthors("");
      setDescription("");
      setUrl("");
      setEditingId(null);

      setShowModal(false);
      fetchPublications();
    } catch (e) {
      setModalError(e.message || "Error");
    } finally {
      setSaving(false);
    }
  }}
>
  {saving ? "Saving..." : editingId ? "Update" : "Save"}
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