"use client";

import { useCallback, useEffect, useState } from "react";
import { useSettings } from "../SettingsProvider";

type BookingStatus = "pending" | "confirmed" | "done" | "cancelled";

type Booking = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
};

const STATUS_STYLE: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const STATUSES: BookingStatus[] = ["pending", "confirmed", "done", "cancelled"];

/** Customer-facing message based on the booking's current status. */
function notifyText(b: Booking, salon: string): string {
  const hi = `Dear ${b.name},`;
  switch (b.status) {
    case "confirmed":
      return `${hi}\n\nYour ${b.service} appointment on ${b.date} at ${b.time} is CONFIRMED ✅. We look forward to pampering you!\n\n— ${salon}`;
    case "done":
      return `${hi}\n\nThank you for visiting ${salon}! 💕 We hope you loved your ${b.service}. Your feedback means a lot to us — and we'd be delighted to see you again soon!`;
    case "cancelled":
      return `${hi}\n\nWe're sorry — your ${b.service} appointment on ${b.date} at ${b.time} has been cancelled. Please reply to reschedule at a time that suits you.\n\n— ${salon}`;
    default:
      return `${hi}\n\nWe've received your ${b.service} appointment request for ${b.date} at ${b.time}. Our team will confirm it shortly. Thank you!\n\n— ${salon}`;
  }
}

export default function BookingsPanel({ adminKey }: { adminKey: string }) {
  const settings = useSettings();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/bookings", {
        headers: { "x-admin-key": adminKey },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load bookings.");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error.");
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: BookingStatus) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id, status }),
    });
  }

  async function remove(id: string) {
    if (!confirm("Delete this booking permanently?")) return;
    setBookings((prev) => prev.filter((b) => b.id !== id));
    await fetch(`/api/admin/bookings?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-key": adminKey },
    });
  }

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    done: bookings.filter((b) => b.status === "done").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted/70">
          {counts.all} total appointment{counts.all === 1 ? "" : "s"}
        </p>
        <button
          onClick={load}
          className="rounded-full border border-gold-400/40 px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-400/10"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
              filter === s
                ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                : "border border-gold-400/30 bg-white text-ink-muted hover:bg-gold-400/10"
            }`}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">⚠️ {error}</p>}

      <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-gold-400/20 bg-white shadow-lg">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-ink text-cream">
            <tr>
              <th className="px-4 py-4 font-medium">Client</th>
              <th className="px-4 py-4 font-medium">Service</th>
              <th className="px-4 py-4 font-medium">Date / Time</th>
              <th className="px-4 py-4 font-medium">Contact</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-4 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-ink-muted/60">
                  {loading ? "Loading..." : "No bookings found."}
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr
                  key={b.id}
                  className="border-t border-gold-400/10 align-top hover:bg-pink-50/30"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-ink">{b.name}</p>
                    {b.message && (
                      <p className="mt-1 max-w-[200px] text-xs text-ink-muted/60">
                        “{b.message}”
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4 text-ink-muted">{b.service}</td>
                  <td className="px-4 py-4 text-ink-muted">
                    {b.date}
                    <br />
                    <span className="text-xs text-pink-500">{b.time}</span>
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={`tel:${b.phone}`}
                      className="block text-ink-muted hover:text-pink-600"
                    >
                      📞 {b.phone}
                    </a>
                    <a
                      href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-green-600 hover:underline"
                    >
                      💬 WhatsApp
                    </a>
                    {b.email && (
                      <a
                        href={`mailto:${b.email}`}
                        className="block text-xs text-ink-muted/60 hover:text-pink-600"
                      >
                        ✉️ {b.email}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        STATUS_STYLE[b.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {b.status || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <select
                        value={b.status || "pending"}
                        onChange={(e) =>
                          updateStatus(b.id, e.target.value as BookingStatus)
                        }
                        className="rounded-lg border border-gold-400/30 bg-cream/60 px-2 py-1.5 text-xs outline-none focus:border-pink-400"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="capitalize">
                            {s}
                          </option>
                        ))}
                      </select>

                      {/* Notify the customer with a status-based message */}
                      <a
                        href={`https://wa.me/${b.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                          notifyText(b, settings.name)
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Send the customer a WhatsApp message for this status"
                        className="rounded-lg bg-[#25D366] px-2 py-1.5 text-center text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
                      >
                        💬 Notify (WhatsApp)
                      </a>
                      {b.email && (
                        <a
                          href={`mailto:${b.email}?subject=${encodeURIComponent(
                            `Your ${b.service} appointment — ${settings.name}`
                          )}&body=${encodeURIComponent(notifyText(b, settings.name))}`}
                          title="Email the customer for this status"
                          className="rounded-lg border border-gold-400/40 px-2 py-1.5 text-center text-xs font-semibold text-ink transition-colors hover:bg-gold-400/10"
                        >
                          ✉️ Notify (Email)
                        </a>
                      )}

                      <button onClick={() => remove(b.id)} className="rounded-lg border border-red-200 px-2 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
