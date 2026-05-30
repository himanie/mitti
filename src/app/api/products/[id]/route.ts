import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });

  return NextResponse.json({
    success: true,
    data: product,
  });
}