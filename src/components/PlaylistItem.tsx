"use client";
import { Playlist } from "@/lib/types";

interface PlaylistItemProps extends Playlist {
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export default function PlaylistItem({
  id, name, coverUrl, liked, selected, onSelect
}: PlaylistItemProps) {
  return (
    <li
      className={`flex items-center gap-2 px-2 py-1 rounded h-[4vh] w-full cursor-pointer
        hover:bg-[#232323]
        ${liked ? "bg-[#282828]" : ""}
        ${selected ? "ring-2 ring-green-400" : ""}`
      }
      onClick={() => onSelect?.(id)}
    >
      {coverUrl && (
        <img src={coverUrl} alt={name} className="w-7 h-7 rounded object-cover" />
      )}
      {liked && <span className="text-green-400">♥</span>}
      <span className="truncate">{name}</span>
    </li>
  );
}
