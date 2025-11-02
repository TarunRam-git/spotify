import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const playlists = await client.db().collection("playlists").find({}).toArray();
  return NextResponse.json(playlists);
}

export async function POST(req: NextRequest) {
  const playlist = await req.json();
  const client = await clientPromise;
  await client.db().collection("playlists").insertOne(playlist);
  return NextResponse.json({ message: "Playlist created" }, { status: 201 });
}
