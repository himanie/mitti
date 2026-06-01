import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {db} from "@/lib/db";
import { authOptions } from "@/lib/auth";



export async function POST() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Please login first" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}