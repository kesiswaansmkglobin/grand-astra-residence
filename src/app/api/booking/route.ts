import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, preferredType, budget, surveyDate, notes } = body;

    if (!fullName || !phone || !email || !preferredType || !budget || !surveyDate) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    await db.bookingInquiry.create({
      data: {
        fullName,
        phone,
        email,
        preferredType,
        budget: parseFloat(budget),
        surveyDate,
        notes: notes || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
