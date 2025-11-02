interface JumpBackInCardProps {
  img?: string;
  title: string;
  subtitle?: string;
}

export default function JumpBackInCard({ img, title, subtitle }: JumpBackInCardProps) {
  return (
    <div className="flex flex-col items-center w-28">
      <div className="w-24 h-24 rounded-full bg-gray-600 mb-2">
        {img && <img src={img} alt={title} className="w-full h-full object-cover rounded-full" />}
      </div>
      <span className="text-xs font-bold truncate">{title}</span>
      {subtitle && <span className="text-xs text-gray-400 truncate">{subtitle}</span>}
    </div>
  );
}
