import { promises as fs } from "fs";
import path from "path";

/* ============================================================
   Storage abstraction.

   • On Vercel (serverless, read-only FS):
       - JSON data  -> Upstash Redis / Vercel KV
       - images     -> Vercel Blob
   • Locally / on a persistent-disk host (no env vars set):
       - JSON data  -> data/<key>.json
       - images     -> public/uploads/<file>

   This lets the same code run in both places with zero changes.
   ============================================================ */

const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const hasRedis = Boolean(REDIS_URL && REDIS_TOKEN);
const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

type RedisLike = {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: unknown) => Promise<unknown>;
};

let redisClient: RedisLike | null = null;
async function getRedis(): Promise<RedisLike | null> {
  if (!hasRedis) return null;
  if (!redisClient) {
    const { Redis } = await import("@upstash/redis");
    redisClient = new Redis({ url: REDIS_URL!, token: REDIS_TOKEN! });
  }
  return redisClient;
}

const DATA_DIR = path.join(process.cwd(), "data");
const filePath = (key: string) => path.join(DATA_DIR, `${key}.json`);

/** Read a JSON document by key (Redis on Vercel, file locally). */
export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  const redis = await getRedis();
  if (redis) {
    const value = await redis.get(key); // @upstash/redis auto-parses JSON
    return (value ?? fallback) as T;
  }
  try {
    const raw = await fs.readFile(filePath(key), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Persist a JSON document by key. */
export async function setJSON<T>(key: string, value: T): Promise<void> {
  const redis = await getRedis();
  if (redis) {
    await redis.set(key, value as unknown); // auto-serialised to JSON
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath(key), JSON.stringify(value, null, 2), "utf-8");
}

/** Save an uploaded image and return its public URL. */
export async function saveImage(
  filename: string,
  data: Buffer,
  contentType: string
): Promise<string> {
  if (hasBlob) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${filename}`, data, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    });
    return blob.url;
  }
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), data);
  return `/uploads/${filename}`;
}

export const storageMode = {
  data: hasRedis ? "redis" : "file",
  images: hasBlob ? "blob" : "file",
};
