import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest, context) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json([], { status: 401 });
  const params = await context.params; 
  const { playlistId } = params;
  const client = await clientPromise;

  const playlist = await client.db().collection("playlists").findOne({
    _id: ObjectId.createFromHexString(playlistId),
    userId: session.user.email,
  });
  if (!playlist || !playlist.songIds) return Response.json([], { status: 404 });

  const songObjectIds = playlist.songIds.map(id =>  ObjectId.createFromHexString(id));
  const songs = await client.db().collection("songs").find({
    _id: { $in: songObjectIds },
    userId: session.user.email
  }).toArray();

  return Response.json(songs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest })));
}

export async function POST(req, context) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json([], { status: 401 });
  const params = await context.params; 
  const { playlistId } = params;
  const { songId } = await req.json();
  const client = await clientPromise;

  const song = await client.db().collection("songs").findOne({
    _id: new ObjectId(songId),
    userId: session.user.email,
  });
  if (!song) return Response.json({ error: "Song not found" }, { status: 404 });

  await client.db().collection("playlists").updateOne(
    { _id: new ObjectId(playlistId), userId: session.user.email },
    { $addToSet: { songIds: songId } }
  );
  return Response.json({ added: true });
}
