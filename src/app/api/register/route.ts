import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      gender,
      password,
      confirmPassword,
    } = await req.json();

  


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }


    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      return Response.json(
        { message: "Phone number must be 10 digits" },
        { status: 400 }
      );
    }


    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
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


    const user = await db.user.create({
      data: {
        firstname,
        lastname,
        email,
        phone,
        gender,
        passwordHash: hashedPassword,
      },
    });

    console.log("==>", user);

    return Response.json({
      message: "Registration successful",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}