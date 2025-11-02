import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const songs = await client.db().collection("songs").find({}).sort({ uploadedAt: -1 }).toArray();
  return NextResponse.json(songs.map(({ title, filename }) => ({ title, filename })));
}
