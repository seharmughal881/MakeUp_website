"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageUploader({
  value,
  onChange,
  adminKey,
  label = "Image",
}: {
  value: string;
  onChange: (url: string) => void;
  adminKey: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gold-400/30 bg-cream/60">
          {value ? (
            <Image
              src={value}
              alt="preview"
              fill
              sizes="64px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-xl text-ink-muted/40">
              🖼️
            </span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-cream transition-colors hover:bg-ink-soft disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "📤 Upload"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            )}
          </div>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
            className="mt-2 w-full rounded-lg border border-gold-400/25 bg-cream/60 px-3 py-1.5 text-xs outline-none focus:border-pink-400"
          />
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">⚠️ {error}</p>}
    </div>
  );
}
