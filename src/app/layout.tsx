"use client";
import "./globals.css";
import type { ReactNode } from "react";
import { MusicPlayerProvider } from "@/lib/MusicPlayerContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
          <MusicPlayerProvider>
            {children}
          </MusicPlayerProvider>
          
      </body>
    </html>
  );
}
