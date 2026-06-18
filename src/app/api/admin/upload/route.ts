import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/bookings";
import { saveImage } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function safeName(original: string): string {
  const dot = original.lastIndexOf(".");
  const ext = (dot >= 0 ? original.slice(dot) : ".jpg").toLowerCase();
  const base = (dot >= 0 ? original.slice(0, dot) : original)
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
    const filename = safeName(file.name);
    const bytes = Buffer.from(await file.arrayBuffer());
    const url = await saveImage(filename, bytes, file.type);
    return NextResponse.json({ success: true, url });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json(
      { error: "Could not save the image." },
      { status: 500 }
    );
  }
}
