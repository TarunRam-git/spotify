interface DailyMixCardProps {
  img?: string;
  name: string;
  artists: string;
  color?: string;
}

export default function DailyMixCard({ img, name, artists, color = "text-green-400" }: DailyMixCardProps) {
  return (
    <div className="w-36 bg-[#232323] rounded-lg overflow-hidden shadow hover:scale-105 transition">
      <div className="bg-gray-700 h-36 mb-2">{img && <img src={img} alt={name} className="object-cover h-full w-full" />}</div>
      <div className={`font-bold ${color}`}>{name}</div>
      <div className="text-xs text-gray-400 mb-2">{artists}</div>
    </div>
  );
}
