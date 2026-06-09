import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET() {
  const properties = await db.property.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(
    properties.map((p) => ({
      ...p,
      features: JSON.parse(p.features),
      images: JSON.parse(p.images),
    }))
  );
}

export async function POST(request: Request) {
  if (!(await authenticate(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const property = await db.property.create({
      data: {
        ...body,
        features: JSON.stringify(body.features ?? []),
        images: JSON.stringify(body.images ?? []),
      },
    });
    return NextResponse.json({
      ...property,
      features: JSON.parse(property.features),
      images: JSON.parse(property.images),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
