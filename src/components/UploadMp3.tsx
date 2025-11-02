"use client";
import { useRef, useState } from "react";

interface UploadMp3Props {
  onUploaded?: () => void;
}

export default function UploadMp3({ onUploaded }: UploadMp3Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      setMessage("Upload successful!");
      onUploaded?.();
    } else {
      setMessage("Error uploading song.");
    }
  };

  return (
    <form onSubmit={handleUpload} className="flex gap-2 items-center">
      <input ref={fileInput} type="file" accept=".mp3,audio/mp3" required />
      <button className="bg-green-500 px-3 py-1 rounded text-black font-bold">Upload MP3</button>
      {message && <span>{message}</span>}
    </form>
  );
}
