import crypto from "node:crypto";
import { db } from "@/lib/db";

const SECRET = process.env.JWT_SECRET ?? process.env.ADMIN_PASSWORD ?? "change-me-in-production";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const derived = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === derived;
}

export function createToken(userId: number): string {
  const payload = `${userId}:${Date.now() + 86400000}`;
  const hmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64");
}

export function verifyToken(token: string): number | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [userIdStr, expiry, hmac] = decoded.split(":");
    const payload = `${userIdStr}:${expiry}`;
    const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    if (hmac !== expected) return null;
    if (Date.now() > parseInt(expiry)) return null;
    return parseInt(userIdStr);
  } catch {
    return null;
  }
}

export async function authenticate(request: Request): Promise<boolean> {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  const userId = verifyToken(token);
  if (!userId) return false;
  const user = await db.user.findUnique({ where: { id: userId } });
  return user !== null;
}
