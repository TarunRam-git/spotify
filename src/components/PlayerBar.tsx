"use client";
import { useState } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaHeart, FaRegHeart } from "react-icons/fa";

interface PlayerBarProps {
  trackName?: string;
  artist?: string;
  albumArtUrl?: string;
  liked?: boolean;
}

export default function PlayerBar({
  trackName = "One Dance",
  artist = "Drake, Wizkid, Kyla",
  albumArtUrl,
  liked = true,
}: PlayerBarProps) {
  const [playing, setPlaying] = useState(true);
  const [likedState, setLikedState] = useState(liked);
  const [progress, setProgress] = useState(46);
  const [volume, setVolume] = useState(70);

  return (
    <div className="fixed bottom-0 w-full bg-[#181818] text-white flex items-center justify-between h-20 px-4 z-50 border-t border-[#232323]">
      <div className="flex items-center min-w-[200px]">
        <div className="w-14 h-14 bg-gray-700 rounded overflow-hidden">
          {albumArtUrl ? <img src={albumArtUrl} alt="album" className="w-full h-full object-cover" /> : null}
        </div>
        <div className="ml-3 flex flex-col">
          <span className="font-semibold">{trackName}</span>
          <span className="text-xs text-gray-300">{artist}</span>
        </div>
        <button className="ml-3" onClick={() => setLikedState((s) => !s)}>
          {likedState ? <FaHeart className="text-green-400" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex flex-col  items-center  max-w-xl">
        <div className="flex items-center gap-6 mb-1">
          <button className="p-1 hover:bg-[#232323] rounded"><FaStepBackward /></button>
          <button className="p-2 bg-white rounded-full text-black hover:bg-green-400"
            onClick={() => setPlaying((p) => !p)}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button className="p-1 hover:bg-[#232323] rounded"><FaStepForward /></button>
        </div>
        <div className="flex items-center w-full gap-3 text-xs">
          <span>{Math.floor((progress/100)*2.53)}:00</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={e => setProgress(Number(e.target.value))}
            className="w-64 accent-green-500 h-1"
          />
          <span>2:53</span>
        </div>
      </div>

      <div className="flex items-center gap-3 min-w-[180px] justify-end">
        <FaVolumeUp />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="w-20 accent-green-500 h-1"
        />
      </div>
    </div>
  );
}
