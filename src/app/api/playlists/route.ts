import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json([], { status: 401 });

  const client = await clientPromise;
  const playlists = await client.db().collection("playlists")
    .find({ userId: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  const safePlaylists = playlists.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));

  return Response.json(safePlaylists);
}

export async function POST(req : NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json([], { status: 401 });

  const { name } = await req.json();
  if (!name || typeof name !== "string") {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  const client = await clientPromise;
  const newPlaylist = {
    name,
    userId: session.user.email,
    songIds: [],
    createdAt: new Date(),
  };

  const result = await client.db().collection("playlists").insertOne(newPlaylist);
  return Response.json({ id: result.insertedId.toString(), ...newPlaylist });
}
