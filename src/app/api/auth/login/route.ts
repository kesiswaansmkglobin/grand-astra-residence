import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password wajib diisi" }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { username } });
    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    const token = createToken(user.id);
    return NextResponse.json({ token, name: user.name });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
