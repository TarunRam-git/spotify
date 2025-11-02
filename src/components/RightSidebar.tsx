export default function RightSidebar() {
  return (
    <aside className="w-80 bg-[#181818] text-white p-5 flex flex-col">
      <div className="w-full h-40 bg-gray-600 rounded mb-3"></div>
      <div className="font-bold text-lg mb-1">One Dance</div>
      <div className="mb-3">Drake, Wizkid, Kyla</div>
      <div>
        <div className="font-semibold mb-1">Related music videos</div>
        <div className="flex gap-2 mb-2">
          <div className="bg-gray-700 h-12 w-20 rounded"></div>
          <div>
            <div className="text-sm">Sticky</div>
            <div className="text-xs text-gray-400">Drake</div>
          </div>
        </div>
        <div className="font-semibold mb-1">About the artist</div>
        <div className="flex gap-2 items-center">
          <div className="bg-gray-700 h-10 w-10 rounded"></div>
          <div>
            <div className="text-xs text-gray-400">Drake</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
