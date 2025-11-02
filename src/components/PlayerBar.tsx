"use client";
import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaHeart, FaRegHeart } from "react-icons/fa";
import { useMusicPlayer } from "@/lib/MusicPlayerContext";

export default function PlayerBar() {
  const {
    song, playing, setPlaying,
    liked, setLiked,
    progress, setProgress,
    volume, setVolume
  } = useMusicPlayer();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current!.duration);
      };
    }
  }, [song.filename]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play();
    else audio.pause();
  }, [playing, song.filename]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleSliderChange = (value: number) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    }
    setProgress(value);
  };

  const handleStepBackward = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };
  const handleStepForward = () => {
    if (audioRef.current && audioRef.current.duration)
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 w-full bg-[#181818] text-white flex items-center justify-between h-20 px-4 z-50 border-t border-[#232323]">
      {song.filename && (
        <audio
          ref={audioRef}
          src={`/uploads/${song.filename}`}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setPlaying(false)}
          style={{ display: "none" }}
          autoPlay
        />
      )}

      <div className="flex items-center min-w-[200px]">
        <div className="w-14 h-14 bg-gray-700 rounded overflow-hidden">
          {song.albumArtUrl ? (
            <img src={song.albumArtUrl} alt="album" className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div className="ml-3 flex flex-col">
          <span className="font-semibold">{song.trackName}</span>
          <span className="text-xs text-gray-300">{song.artist}</span>
        </div>
        <button className="ml-3" onClick={() => setLiked((s) => !s)}>
          {liked ? <FaHeart className="text-green-400" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex flex-col items-center max-w-xl">
        <div className="flex items-center gap-6 mb-1">
          <button className="p-1 hover:bg-[#232323] rounded" onClick={handleStepBackward}><FaStepBackward /></button>
          <button
            className="p-2 bg-white rounded-full text-black hover:bg-green-400"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button className="p-1 hover:bg-[#232323] rounded" onClick={handleStepForward}><FaStepForward /></button>
        </div>
        <div className="flex items-center w-full gap-3 text-xs">
          <span>{formatTime((progress / 100) * (duration || 0))}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={e => handleSliderChange(Number(e.target.value))}
            className="w-64 accent-green-500 h-1"
          />
          <span>{formatTime(duration)}</span>
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
