"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import { Playlist, SongListItem } from "@/lib/types";
import { useMusicPlayer } from "@/lib/MusicPlayerContext";
function SongPicker({ songs, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#232323] rounded p-6 w-96">
        <div className="font-bold mb-3 text-xl text-white">Select a song</div>
        <ul className="mb-4">
          {songs.map(song => (
            <li key={song.id} className="flex justify-between items-center py-1">
              <span className="text-white">{song.title}</span>
              <button
                className="bg-green-500 px-2 py-1 rounded text-black font-bold ml-2"
                onClick={() => onSelect(song.id)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
        <button className="mt-2 px-4 py-1 rounded bg-gray-700 text-white" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { setSong, setPlaying } = useMusicPlayer();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [songs, setSongs] = useState<{ [key: string]: SongListItem[] }>({});
  const [allSongs, setAllSongs] = useState<SongListItem[]>([]);
  const [showPicker, setShowPicker] = useState<{ playlistId: string | null }>({ playlistId: null });

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/playlists")
        .then(res => res.json())
        .then(data => setPlaylists(Array.isArray(data) ? data : []));
      fetch("/api/songs")
        .then(res => res.json())
        .then(data => setAllSongs(Array.isArray(data) ? data : []));
    }
  }, [session]);

  async function handleExpand(playlistId: string) {
    setExpanded(expanded === playlistId ? null : playlistId);
    if (!songs[playlistId]) {
      const res = await fetch(`/api/playlists/${playlistId}/songs`);
      const data = await res.json();
      setSongs(prev => ({ ...prev, [playlistId]: Array.isArray(data) ? data : [] }));
    }
  }

  function handleAddSong(playlistId: string) {
    setShowPicker({ playlistId });
  }

  async function handleSelectSong(songId: string) {
    const playlistId = showPicker.playlistId;
    if (!playlistId) return;
    await fetch(`/api/playlists/${playlistId}/songs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId }),
    });
    setShowPicker({ playlistId: null });
    handleExpand(playlistId); 
  }

  async function handleCreatePlaylist() {
    const name = window.prompt("Enter playlist name:");
    if (!name) return;
    await fetch("/api/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    fetch("/api/playlists")
      .then(res => res.json())
      .then(data => setPlaylists(Array.isArray(data) ? data : []));
  }

  if (status === "loading" || !session) return null;

  return (
    <aside className="w-64 bg-[#181818] text-white h-screen flex flex-col p-3">
      <div className="mb-4">
        <button
          className="bg-green-500 py-2 rounded w-full text-black font-bold"
          onClick={handleCreatePlaylist}
        >
          + Create
        </button>
      </div>
      <div className="grow overflow-y-auto">
        <div className="font-bold text-lg mb-2">Your Library</div>
        <ul className="space-y-1">
          {playlists.map((p) => (
            <div key={p.id}>
              <div className="flex items-center justify-between">
                <PlaylistItem
                  id={p.id}
                  name={p.name}
                  coverUrl={p.coverUrl}
                  liked={p.liked}
                  selected={expanded === p.id}
                  onSelect={() => handleExpand(p.id)}
                />
                <button
                  className="ml-2 text-green-400 font-bold"
                  onClick={() => handleAddSong(p.id)}
                >+</button>
              </div>
              {expanded === p.id && (
                <ul className="ml-6 my-2">
                  {songs[p.id]?.map(song => (
                    <li
                      key={song.id}
                      className="py-1 border-b border-[#232323] hover:bg-[#232323] cursor-pointer"
                      onClick={() => {
                        setSong({
                          trackName: song.title,
                          artist: song.artist,
                          albumArtUrl: song.albumArtUrl,
                          filename: song.filename
                        });
                        setPlaying(true);
                      }}
                    >
                      {song.title}
                    </li>
                  ))}
                </ul>
              )}
              {showPicker.playlistId === p.id && (
                <SongPicker
                  songs={allSongs}
                  onSelect={handleSelectSong}
                  onClose={() => setShowPicker({ playlistId: null })}
                />
              )}
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
}
