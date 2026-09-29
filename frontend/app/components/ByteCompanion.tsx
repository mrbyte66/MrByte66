"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MonitorStage } from "./MonitorStage";

const QUIPS: { match: (path: string) => boolean; lines: string[] }[] = [
  {
    match: (p) => p === "/",
    lines: [
      "Selam! Ben Byte.",
      "Fareyi oynat, gözlerim seni takip eder.",
      "Aşağıda yazılar var — dal ister misin?",
    ],
  },
  {
    match: (p) => p.startsWith("/projects"),
    lines: ["Projelerimi beğendin mi?", "Hepsini tek tek derledim."],
  },
  {
    match: (p) => p.startsWith("/articles"),
    lines: ["İyi okumalar!", "Bu yazıyı ben de seviyorum."],
  },
  {
    match: (p) => p.startsWith("/admin"),
    lines: ["Kolay gelsin patron.", "Taslakları unutma!"],
  },
];

const FALLBACK = ["Buralardayım.", "Tıkla, selam vereyim."];

export function ByteCompanion() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [quip, setQuip] = useState(0);

  const lines =
    QUIPS.find((q) => q.match(pathname))?.lines ?? FALLBACK;

  useEffect(() => {
    const t = window.setTimeout(() => setQuip(0), 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const show = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(show);
  }, []);

  useEffect(() => {
    if (dismissed) {
      return;
    }
    const id = window.setInterval(() => {
      setQuip((q) => (q + 1) % lines.length);
    }, 9000);
    return () => window.clearInterval(id);
  }, [dismissed, lines.length]);

  if (!visible || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-2">
      <div className="flex flex-col items-end gap-2">
        <div
          key={`${pathname}-${quip}`}
          className="rise glass max-w-52 rounded-2xl rounded-br-sm border border-line p-3 text-[13px] leading-5 text-paper"
        >
          {lines[quip]}
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Kapat"
          className="font-mono text-[11px] text-faint hover:text-muted"
        >
          kapat
        </button>
      </div>
      <button
        onClick={() => setQuip((q) => (q + 1) % lines.length)}
        aria-label="Byte ile konuş"
        className="glass h-24 w-24 shrink-0 overflow-hidden rounded-full border border-line"
      >
        <MonitorStage className="h-full w-full" />
      </button>
    </div>
  );
}
