"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import RightSidebar from "../components/RightSidebar";
import PlayerBar from "@/components/PlayerBar";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.replace("/auth");
    }
  }, [session, status, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null; 

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
