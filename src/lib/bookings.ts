import { promises as fs } from "fs";
import path from "path";

export type BookingStatus = "pending" | "confirmed" | "done" | "cancelled";

export type Booking = {
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

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

export async function readBookings(): Promise<Booking[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

export async function writeBookings(bookings: Booking[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

/** Simple id generator (no external deps, avoids Math.random in app code). */
export function makeId(seed: number): string {
  return `bk_${seed.toString(36)}${(seed % 9973).toString(36)}`;
}

/** Admin password — set ADMIN_PASSWORD in env for production. */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "sehar-admin";
}

export function isAuthorized(req: Request): boolean {
  const key = req.headers.get("x-admin-key");
  return !!key && key === getAdminPassword();
}
