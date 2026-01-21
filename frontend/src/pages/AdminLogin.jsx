import { useState } from "react";
import Header from "../components/Header";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      if (res.status === 401) throw new Error("Invalid Credentials");
      throw new Error("Server Error");
    }

    const data = await res.json();
    localStorage.setItem("admin_token", data.access_token);
    window.location.href = "/admin/dashboard";
  } catch (err) {
    setError(err.message || "Error");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* Header */}
      <Header rightLinkLabel="Homepage" rightLinkHref="/" />

      {/* Body */}
      <main className="mx-auto grid max-w-6xl place-items-center px-6 py-16">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="text-2xl font-bold">Admin Access</div>
          <p className="mt-2 text-sm text-slate-600">
            Enter your credentials to access the dashboard.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-[#2B65AF] focus:ring-2"
                placeholder="xxx@yyy.zzz"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-[#2B65AF] focus:ring-2"
                placeholder="********"
                required
              />
            </div>

            {error ? (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-[#2B65AF] px-4 py-3 text-sm font-semibold text-white hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Access..." : "Log in"}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-[#0f172a] py-8 text-center text-sm text-slate-300">
        © 2024 Portal PRIN 2022 - SCORET. Tutti i diritti riservati.
      </footer>
    </div>
  );
}