import { NextResponse } from "next/server";
import {
  readBookings,
  writeBookings,
  isAuthorized,
  type BookingStatus,
} from "@/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_STATUS: BookingStatus[] = [
  "pending",
  "confirmed",
  "done",
  "cancelled",
];

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** List all bookings (newest first). Requires admin key. */
export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();
  const bookings = await readBookings();
  bookings.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ bookings });
}

/** Update a booking's status. Requires admin key. */
export async function PATCH(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  let body: { id?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const { id, status } = body;
  if (!id || !status || !VALID_STATUS.includes(status as BookingStatus)) {
    return NextResponse.json(
      { error: "Provide a valid id and status." },
      { status: 400 }
    );
  }

  const bookings = await readBookings();
  const target = bookings.find((b) => b.id === id);
  if (!target) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  target.status = status as BookingStatus;
  await writeBookings(bookings);
  return NextResponse.json({ success: true, booking: target });
}

/** Delete a booking by id (?id=...). Requires admin key. */
export async function DELETE(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const bookings = await readBookings();
  const next = bookings.filter((b) => b.id !== id);
  if (next.length === bookings.length) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  await writeBookings(next);
  return NextResponse.json({ success: true });
}
