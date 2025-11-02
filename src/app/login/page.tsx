"use client";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    await signIn("credentials", { username, password, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center">
      <div className="bg-[#181818] p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Sign in to Spotify</h1>
        <form onSubmit={handleLogin}>
          <input name="username" placeholder="Username" className="w-full mb-3 p-2 rounded bg-[#232323] text-white" required />
          <input type="password" name="password" placeholder="Password" className="w-full mb-4 p-2 rounded bg-[#232323] text-white" required />
          <button className="w-full py-2 px-4 rounded bg-green-500 text-black font-bold hover:bg-green-400">Login</button>
        </form>
      </div>
    </div>
  );
}
