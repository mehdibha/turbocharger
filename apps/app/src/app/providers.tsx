"use client";

import { Toaster } from "@turbocharger/ui";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Toaster />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
