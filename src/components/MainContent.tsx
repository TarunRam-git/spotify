"use client";
import { useEffect, useState } from "react";
import DailyMixCard from "./DailyMixCard";
import JumpBackInCard from "./JumpBackInCard";
import UploadMp3 from "./UploadMp3";
import { useMusicPlayer } from "@/lib/MusicPlayerContext";
import { SongListItem, Playlist } from "@/lib/types";

const CARD_COLORS = [
  "text-blue-300",
  "text-yellow-200",
  "text-orange-300",
  "text-pink-300",
  "text-green-300",
];

export default function MainContent() {
  const [songs, setSongs] = useState<SongListItem[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { setSong, setPlaying } = useMusicPlayer();

  useEffect(() => {
    fetch("/api/songs")
      .then(res => res.json())
      .then(setSongs);
  }, []);

  useEffect(() => {
    fetch("/api/playlists")
      .then(res => res.json())
      .then(setPlaylists);
  }, []);

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <div className="flex gap-4">
        {playlists.map((playlist, idx) => (
          <DailyMixCard
            key={playlist.id || idx}
            name={playlist.name}
            artists={
              playlist.songIds?.length
                ? `${playlist.songIds.length} Song${playlist.songIds.length === 1 ? "" : "s"}`
                : "No Songs"
            }
            color={CARD_COLORS[idx % CARD_COLORS.length]}
          />
        ))}
      </div>
      <section className="mt-10">
        <div className="text-xl font-bold mb-4">Jump back in</div>
        <div className="flex gap-6">
          {songs.map((song, idx) => (
            <div
              key={song.id || song.filename || idx}
              onClick={() => {
                setSong({
                  trackName: song.title,
                  artist: "Unknown",
                  albumArtUrl: "",
                  filename: song.filename,
                });
                setPlaying(true);
              }}
              className="cursor-pointer"
            >
              <JumpBackInCard title={song.title} />
            </div>
          ))}
        </div>
        <div className="mt-10 border p-7 w-[45vh] border-lime-500">
          <UploadMp3 />
        </div>
      </section>
    </div>
  );
}
