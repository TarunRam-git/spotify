"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/");
    }
  }, [status, session, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="flex h-screen items-center justify-center bg-[#181818]">
      <button
        className="bg-green-500 text-black px-8 py-4 rounded font-bold text-xl"
        onClick={() => signIn("github")}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
