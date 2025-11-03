"use client";

import { useState } from "react";
import UserMenu from "./UserMenu";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-[#121212] px-6 py-3">
      <input
        className="bg-[#232323] rounded-full px-4 py-2 text-white w-[30vw] focus:outline-none"
        placeholder="What do you want to play?"
      />
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-full bg-[#232323] w-9 h-9 flex items-center justify-center font-bold text-xl text-green-400 hover:bg-[#282828] transition-colors"
        >
          T
        </button>
        {isMenuOpen && <UserMenu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </div>
  );
}
