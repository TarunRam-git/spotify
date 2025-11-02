"use client";
import PlaylistItem from "./PlaylistItem";

interface Playlist {
  name: string;
  liked?: boolean;
  artist?: string;
}

export default function Sidebar() {
  const playlists: Playlist[] = [
    { name: "Liked Songs", liked: true },
    { name: "sve" }, { name: "n" }, { name: "t" }, { name: "h" },
    { name: "Top 50 - Global" }, { name: "Guitar" }, { name: "Alarm" },
    { name: "Back In Black", artist: "AC/DC" }, { name: "Your Top Songs 2022" },
    { name: "lofi" }, { name: "party" }, { name: "gansta" }
  ];

  return (
    <aside className="w-64 bg-[#181818] text-white h-screen flex flex-col p-3">
      <div className="mb-4">
        <button className="bg-green-500 py-2 rounded w-full text-black font-bold">+ Create</button>
      </div>
      <div className="grow overflow-y-auto">
        <div className="font-bold text-lg mb-2">Your Library</div>
        <ul className="space-y-1">
          {playlists.map((p, i) => (
            <PlaylistItem key={i} {...p} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
