import { NextResponse } from "next/server";
import {
  readBookings,
  writeBookings,
  makeId,
  type Booking,
} from "@/lib/bookings";

export const runtime = "nodejs";

function isValidString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, phone, email, service, date, time, message } = body;

  // Validation
  const required = { name, phone, service, date, time };
  for (const [key, value] of Object.entries(required)) {
    if (!isValidString(value)) {
      return NextResponse.json(
        { error: `Please provide a valid ${key}.` },
        { status: 400 }
      );
    }
  }

  const phoneDigits = String(phone).replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 }
    );
  }

  if (
    email &&
    isValidString(email) &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))
  ) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const now = new Date();
  const booking: Booking = {
    id: makeId(now.getTime()),
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: isValidString(email) ? String(email).trim() : "",
    service: String(service).trim(),
    date: String(date).trim(),
    time: String(time).trim(),
    message: isValidString(message) ? String(message).trim() : "",
    status: "pending",
    createdAt: now.toISOString(),
  };

  try {
    const bookings = await readBookings();
    bookings.push(booking);
    await writeBookings(bookings);
  } catch (err) {
    console.error("Failed to save booking:", err);
    return NextResponse.json(
      { error: "Could not save your booking. Please try again." },
      { status: 500 }
    );
  }

  // In production, also trigger email / SMS / WhatsApp notification here.
  console.log("New booking received:", booking.name, booking.service);

  return NextResponse.json(
    {
      success: true,
      message: `Thank you, ${booking.name}! Your ${booking.service} appointment request for ${booking.date} at ${booking.time} has been received. We'll confirm shortly.`,
    },
    { status: 201 }
  );
}

export async function GET() {
  // Public endpoint: returns booking count only (no personal data).
  const bookings = await readBookings();
  return NextResponse.json({ count: bookings.length });
}
