import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await db.property.findUnique({ where: { slug } });
  if (!property) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    ...property,
    features: JSON.parse(property.features),
    images: JSON.parse(property.images),
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await authenticate(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  try {
    const body = await request.json();
    const property = await db.property.update({
      where: { slug },
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

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await authenticate(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  await db.property.delete({ where: { slug } });
  return NextResponse.json({ success: true });
}
