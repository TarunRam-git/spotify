interface PlaylistItemProps {
  name: string;
  liked?: boolean;
  artist?: string;
}

export default function PlaylistItem({ name, liked, artist }: PlaylistItemProps) {
  return (
    <li className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-[#232323] ${liked ? "bg-[#282828]" : ""}`}>
      {liked && <span className="text-green-400">♥</span>}
      <span className="truncate">{name}</span>
      {artist && <span className="text-xs text-gray-400 ml-auto">{artist}</span>}
    </li>
  );
}
