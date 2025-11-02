export default function Navbar() {
  return (
    <div className="flex items-center justify-between bg-[#121212] px-6 py-3">
      <input
        className="bg-[#232323] rounded-full px-4 py-2 text-white w-[30vw] focus:outline-none"
        placeholder="What do you want to play?"
      />
      <div className="flex items-center gap-3">
        <button className="rounded-full bg-[#232323] w-9 h-9 flex items-center justify-center font-bold text-xl text-green-400">T</button>
      </div>
    </div>
  );
}
