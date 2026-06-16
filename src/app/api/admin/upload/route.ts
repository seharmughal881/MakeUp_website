import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthorized } from "@/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function safeName(original: string): string {
  const ext = (path.extname(original) || ".jpg").toLowerCase();
  const base = path
    .basename(original, path.extname(original))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${Date.now()}-${base || "image"}${ext}`;
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WEBP, GIF or AVIF images are allowed." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image too large (max 5 MB)." },
      { status: 400 }
    );
  }

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const filename = safeName(file.name);
    const bytes = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, filename), bytes);
    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json(
      { error: "Could not save the image." },
      { status: 500 }
    );
  }
}
