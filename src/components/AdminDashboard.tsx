"use client";

import { useCallback, useEffect, useState } from "react";
import BookingsPanel from "./admin/BookingsPanel";
import ContentPanel from "./admin/ContentPanel";

const KEY_STORAGE = "sehar_admin_key";
type Tab = "bookings" | "content";

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("bookings");

  const verify = useCallback(async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/bookings", {
        headers: { "x-admin-key": key },
        cache: "no-store",
      });
      if (res.status === 401) {
        setError("Wrong password. Try again.");
        sessionStorage.removeItem(KEY_STORAGE);
        return;
      }
      if (!res.ok) throw new Error("Could not connect.");
      setAdminKey(key);
      setAuthed(true);
      sessionStorage.setItem(KEY_STORAGE, key);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_STORAGE);
    if (saved) verify(saved);
  }, [verify]);

  function logout() {
    sessionStorage.removeItem(KEY_STORAGE);
    setAuthed(false);
    setAdminKey("");
  }

  if (!authed) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-5 py-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verify(adminKey);
          }}
          className="w-full max-w-sm rounded-[2rem] border border-gold-400/25 bg-white p-8 shadow-xl"
        >
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold-400/50 text-2xl">
              🔐
            </span>
            <h1 className="mt-4 font-serif text-2xl font-bold text-ink">
              Admin Login
            </h1>
            <p className="mt-1 text-sm text-ink-muted/70">
              Manage bookings & website content.
            </p>
          </div>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Admin password"
            className="mt-6 w-full rounded-xl border border-gold-400/25 bg-cream/60 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
          />
          {error && <p className="mt-3 text-sm text-red-600">⚠️ {error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Checking..." : "Login"}
          </button>
          <p className="mt-4 text-center text-xs text-ink-muted/50">
            Default: <code className="text-pink-500">sehar-admin</code> (change via
            ADMIN_PASSWORD)
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">
            Sehar Admin Panel
          </h1>
          <p className="mt-1 text-sm text-ink-muted/70">
            Manage your salon&apos;s bookings and website content.
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-ink-soft"
        >
          Logout
        </button>
      </div>

      {/* Top-level tabs */}
      <div className="mt-6 flex gap-2 border-b border-gold-400/20">
        {(
          [
            { key: "bookings", label: "📅 Bookings" },
            { key: "content", label: "🎨 Website Content" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
              tab === t.key
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "bookings" ? (
          <BookingsPanel adminKey={adminKey} />
        ) : (
          <ContentPanel adminKey={adminKey} />
        )}
      </div>
    </div>
  );
}
