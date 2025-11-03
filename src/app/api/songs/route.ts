import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; 
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const client = await clientPromise;
  const songs = await client.db().collection("songs")
    .find({ userId: session.user.email })
    .sort({ uploadedAt: -1 })
    .toArray();

  return NextResponse.json(
    songs.map(({ _id, title, filename }) => ({
      id: _id.toString(),
      title,
      filename
    }))
  );
}
