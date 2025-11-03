"use client";

import { signOut } from "next-auth/react";

export default function UserMenu() {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div
      
      className="absolute top-16 right-70 bg-[#282828] rounded-lg shadow-lg z-50 w-48"
    >
      <div className="p-2">
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-2 text-white hover:bg-[#3e3e3e] rounded transition-colors text-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
