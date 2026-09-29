import Link from "next/link";
import { Reveal } from "./components/Reveal";
import { ShuffleText } from "./components/ShuffleText";
import { TopoMap } from "./components/TopoMap";
import { Typewriter } from "./components/Typewriter";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

type Article = {
  id: number;
  slug: string;
  title: string;
  status: string;
  createdAt: string;
};

type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  technologies: string[];
};

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/articles`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    return (await res.json()) as Article[];
  } catch {
    return [];
  }
}

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    return (await res.json()) as Project[];
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function RowArrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    >
      →
    </span>
  );
}

export default async function Home() {
  const [articles, projects] = await Promise.all([
    getArticles(),
    getProjects(),
  ]);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <TopoMap className="absolute inset-0 h-full w-full opacity-90" />
        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-5xl flex-col justify-center gap-6 px-6 py-24">
          <p className="font-mono text-xs tracking-[0.35em] text-muted">
            MRBYTE66 — KAYIP YÜZEYİ HARİTALANDI
          </p>
          <h1 className="font-display text-7xl font-bold leading-[0.92] tracking-tight text-paper sm:text-8xl">
            <ShuffleText text="ÖĞREN." delay={200} />
            <br />
            <ShuffleText text="ÜRET." delay={650} />
            <br />
            <span className="text-accent">
              <ShuffleText text="PAYLAŞ." delay={1100} />
            </span>
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted">
            <Typewriter
              text="Selam! Ben Byte. Her yazı bir iterasyon, her proje bir minimum — kaydır ve inişe katıl."
              delay={800}
            />
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#yazilar"
              className="rounded-full bg-paper px-7 py-2.5 text-[15px] font-semibold text-ink"
            >
              İnişe Başla
            </Link>
            <Link href="/projects" className="link-more text-[15px]">
              Projeler →
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-16 px-6 py-20">
        <section className="flex flex-col gap-2">
          <h2 className="font-mono text-xs tracking-[0.25em] text-faint">
            YAZILAR
          </h2>
          {articles.length === 0 ? (
            <p className="py-4 text-sm text-muted">Henüz yazı yok.</p>
          ) : (
            <ul>
              {articles.map((article, i) => (
                <li key={article.id} className="border-t border-line">
                  <Reveal delay={Math.min(i, 3) * 60}>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-300 hover:bg-white/[0.025]"
                    >
                      <span className="flex items-baseline gap-3 text-[17px] text-paper">
                        <RowArrow />
                        <span className="group-hover:underline">
                          {article.title}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-xs text-faint">
                        {formatDate(article.createdAt)}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </section>

        {projects.length > 0 && (
          <section className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <h2 className="font-mono text-xs tracking-[0.25em] text-faint">
                PROJELER
              </h2>
              <Link href="/projects" className="link-more text-sm">
                Tümü
              </Link>
            </div>
            <ul>
              {projects.map((project) => (
                <li key={project.id} className="border-t border-line">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex flex-col gap-1 py-4 transition-colors duration-300 hover:bg-white/[0.025]"
                  >
                    <span className="flex items-baseline gap-3 text-[17px] text-paper">
                      <RowArrow />
                      <span className="group-hover:underline">
                        {project.title}
                      </span>
                    </span>
                    {project.technologies.length > 0 && (
                      <span className="pl-7 font-mono text-xs text-faint">
                        {project.technologies.join(" · ")}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
