"use client";
import "./globals.css";
import type { ReactNode } from "react";
import { MusicPlayerProvider } from "@/lib/MusicPlayerContext";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
          <SessionProvider>
            <MusicPlayerProvider>
            {children}
          </MusicPlayerProvider>
          </SessionProvider>
          
          
      </body>
    </html>
  );
}
