import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ByteCompanion } from "./components/ByteCompanion";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { SmoothScroll } from "./components/SmoothScroll";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin", "latin-ext"],
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "MrByte66 — Yazılım, Yapay Zeka ve Düşünce",
  description:
    "MrByte66 kişisel dijital platformu: teknik yazılar, projeler, kitap notları ve düşünceler.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink font-sans text-paper">
        <SmoothScroll>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <ByteCompanion />
        </SmoothScroll>
      </body>
    </html>
  );
}
