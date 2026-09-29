import Link from "next/link";
import { ScrollProgress } from "./ScrollProgress";

const links = [
  { href: "/#yazilar", label: "Yazılar" },
  { href: "/projects", label: "Projeler" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-widest text-paper"
        >
          MRBYTE<span className="text-accent">66</span>
        </Link>
        <nav className="flex items-center gap-6 text-xs text-muted">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <ScrollProgress />
    </header>
  );
}
