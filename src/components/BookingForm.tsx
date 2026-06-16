"use client";

import { useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/data";
import { useSettings, waLink } from "./SettingsProvider";

type Status = "idle" | "loading" | "success" | "error";

const initial = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

export default function BookingForm() {
  const settings = useSettings();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setFeedback(
        data.message || "Your appointment request has been received!"
      );
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error ? err.message : "Unable to submit. Try again."
      );
    }
  }

  const field =
    "w-full rounded-xl border border-gold-400/25 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border border-gold-400/25 bg-white p-6 shadow-xl shadow-pink-900/5 sm:p-8"
    >
      <h3 className="font-serif text-2xl font-bold text-ink">
        Book Your Appointment
      </h3>
      <p className="mt-1 text-sm text-ink-muted/70">
        Fill in the details and our team will confirm your slot shortly.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
            Full Name *
          </label>
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
            Phone *
          </label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+92 3xx xxxxxxx"
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
            Service *
          </label>
          <select
            required
            value={form.service}
            onChange={update("service")}
            className={field}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
              Date *
            </label>
            <input
              required
              type="date"
              value={form.date}
              onChange={update("date")}
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
              Time *
            </label>
            <input
              required
              type="time"
              value={form.time}
              onChange={update("time")}
              className={field}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
            Message
          </label>
          <textarea
            rows={3}
            value={form.message}
            onChange={update("message")}
            placeholder="Tell us about the look you want..."
            className={field}
          />
        </div>
      </div>

      {feedback && (
        <p
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            status === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {status === "success" ? "✅ " : "⚠️ "}
          {feedback}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-600/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Request Appointment"}
        </button>
        <a
          href={waLink(settings.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-green-500/40 px-6 py-3.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          💬 Book via WhatsApp
        </a>
      </div>
    </form>
  );
}
