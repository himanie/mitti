import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
      },

      include: {
        images: true,
      },
    });

    return NextResponse.json({
      data: products,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}