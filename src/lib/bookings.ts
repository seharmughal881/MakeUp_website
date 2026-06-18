import { getJSON, setJSON } from "./storage";

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

export async function readBookings(): Promise<Booking[]> {
  return getJSON<Booking[]>("bookings", []);
}

export async function writeBookings(bookings: Booking[]): Promise<void> {
  await setJSON("bookings", bookings);
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
