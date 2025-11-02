"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import RightSidebar from "../components/RightSidebar";
import PlayerBar from "@/components/PlayerBar";

export default function HomePage() {
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <MainContent />
      </div>
      <RightSidebar />
      <PlayerBar />
    </div>
    

  );
}
