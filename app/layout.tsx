import type { Metadata } from "next";
import { inter, instrumentSerif, jetbrainsMono } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { GridLines } from "@/components/effects/GridLines";
import { Cursor } from "@/components/ui/Cursor";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Radlabs | AI Partners. Limitless Vision.",
  description: "Blending creativity, engineering & innovation to build intelligent solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          inter.variable,
          instrumentSerif.variable,
          jetbrainsMono.variable,
          "min-h-screen bg-[var(--color-brand-black)] font-sans antialiased text-[var(--color-text-primary)]"
        )}
      >
        <SmoothScrollProvider>
          <GridLines />
          <GrainOverlay />
          <Cursor />
          <Navbar />
          <main className="flex min-h-screen flex-col items-center justify-between">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
