import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthorized } from "@/lib/bookings";
import {
  getContent,
  updateSection,
  CONTENT_SECTIONS,
  OBJECT_SECTIONS,
  type ContentSection,
} from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Return all editable website content. Requires admin key. */
export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();
  const content = await getContent();
  return NextResponse.json({ content });
}

/** Replace one section (services | gallery | showcase | pricing | testimonials). */
export async function PUT(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  let body: { section?: string; value?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const { section, value } = body;
  if (!section || !CONTENT_SECTIONS.includes(section as ContentSection)) {
    return NextResponse.json({ error: "Unknown section." }, { status: 400 });
  }
  const isObjectSection = OBJECT_SECTIONS.includes(section as ContentSection);
  const validShape = isObjectSection
    ? value && typeof value === "object" && !Array.isArray(value)
    : Array.isArray(value);
  if (!validShape) {
    return NextResponse.json(
      { error: `Invalid value for ${section}.` },
      { status: 400 }
    );
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = await updateSection(section as ContentSection, value as any);
    // Refresh all content-driven pages so changes appear instantly (no manual reload).
    revalidatePath("/", "layout");
    for (const p of [
      "/",
      "/about",
      "/services",
      "/gallery",
      "/pricing",
      "/reviews",
      "/contact",
      "/bridal-makeup",
      "/hair-styling",
      "/skin-care",
    ]) {
      revalidatePath(p);
    }
    return NextResponse.json({ success: true, content });
  } catch (err) {
    console.error("Content save failed:", err);
    return NextResponse.json(
      { error: "Could not save content." },
      { status: 500 }
    );
  }
}
