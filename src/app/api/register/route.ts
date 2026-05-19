import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  {db}  from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } =
      await req.json();

    if (!name || !email || !password || !confirmPassword) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

 
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return Response.json({
      message: "Registration successful",
    });

  } catch (error) {
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}