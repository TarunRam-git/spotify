import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  const client = await clientPromise;
  const usersCollection = client.db().collection("users");
  const exists = await usersCollection.findOne({ username });
  if (exists) return NextResponse.json({ error: "User exists" }, { status: 400 });
  await usersCollection.insertOne({ username, email, password });
  return NextResponse.json({ message: "User registered" }, { status: 201 });
}
