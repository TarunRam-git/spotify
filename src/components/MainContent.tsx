"use client";
import { useEffect, useState } from "react";
import DailyMixCard from "./DailyMixCard";
import JumpBackInCard from "./JumpBackInCard";
import UploadMp3 from "./UploadMp3";
import { useMusicPlayer } from "@/lib/MusicPlayerContext";

interface SongListItem {
  title: string;
  filename: string;
}

export default function MainContent() {
  const [songs, setSongs] = useState<SongListItem[]>([]);
  const { setSong, setPlaying } = useMusicPlayer();

  function refreshSongList() {
    fetch("/api/songs")
      .then((res) => res.json())
      .then(setSongs);
  }

  useEffect(() => {
    refreshSongList();
  }, []);

  return (
    <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex gap-4">
          <DailyMixCard name="Daily Mix 01" artists="A.R. Rahman, Harris J..." color="text-blue-300" />
          <DailyMixCard name="Daily Mix 02" artists="Taylor Swift, Billie E..." color="text-yellow-200" />
          <DailyMixCard name="Daily Mix 03" artists="Eminem, Kendrick Lamar..." color="text-orange-300" />
          <DailyMixCard name="Daily Mix 04" artists="Ed Sheeran, Harry Sty..." color="text-pink-300" />
          <DailyMixCard name="Daily Mix 05" artists="XXX... BoyWithUke..." color="text-green-300" />
        </div>      <section className="mt-10">
        <div className="text-xl font-bold mb-4">Jump back in</div>
        <div className="flex gap-6">
          {songs.map((song) => (
            <div
              key={song.filename}
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
