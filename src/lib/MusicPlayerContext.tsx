'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Song {
  trackName: string;
  artist: string;
  albumArtUrl?: string;
  filename: string;
}

interface MusicPlayerContextType {
  song: Song;
  setSong: (song: Song) => void;
  playing: boolean;
  setPlaying: (p: boolean) => void;
  liked: boolean;
  setLiked: (v: boolean) => void;
  progress: number;
  setProgress: (v: number) => void;
  volume: number;
  setVolume: (v: number) => void;
}

const defaultSong: Song = {
  trackName: "One Dance",
  artist: "Drake, Wizkid, Kyla",
  albumArtUrl: "",
  filename: ""
};

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [song, setSong] = useState<Song>(defaultSong);
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

  return (
    <MusicPlayerContext.Provider value={{
      song, setSong,
      playing, setPlaying,
      liked, setLiked,
      progress, setProgress,
      volume, setVolume
    }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  return ctx;
}
