import Link from "next/link";
import { HeroCanvas } from "./components/HeroCanvas";
import { Magnetic } from "./components/Magnetic";
import { Marquee } from "./components/Marquee";
import { Reveal } from "./components/Reveal";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

async function getBackendStatus(): Promise<string> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return "DOWN";
    }
    const data = await res.json();
    return data.status ?? "UNKNOWN";
  } catch {
    return "UNREACHABLE";
  }
}

type Article = {
  id: number;
  slug: string;
  title: string;
  status: string;
};

type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  technologies: string[];
};

async function getArticles(): Promise<Article[] | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/articles`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as Article[];
  } catch {
    return null;
  }
}

async function getProjects(): Promise<Project[] | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as Project[];
  } catch {
    return null;
  }
}

export default async function Home() {
  const [backendStatus, articles, projects] = await Promise.all([
    getBackendStatus(),
    getArticles(),
    getProjects(),
  ]);
  const online = backendStatus === "UP";

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <HeroCanvas />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-20 sm:py-32">
          <p
            className="rise font-mono text-xs tracking-[0.3em] text-accent"
            style={{ animationDelay: "0ms" }}
          >
            YAZILIM · YAPAY ZEKA · DÜŞÜNCE
          </p>
          <h1
            className="rise font-display text-5xl font-bold leading-[1.05] tracking-tight text-paper sm:text-7xl"
            style={{ animationDelay: "90ms" }}
          >
            Merakla inşa
            <br />
            edilen bir
            <br />
            dijital atölye.
          </h1>
          <p
            className="rise max-w-xl text-lg leading-8 text-muted"
            style={{ animationDelay: "180ms" }}
          >
            MrByte66; teknik yazıların, projelerin ve kişisel notların
            biriktiği yaşayan bir arşiv. Öğren, üret, paylaş — hepsi tek
            çatıda.
          </p>
          <div
            className="rise flex flex-wrap items-center gap-4"
            style={{ animationDelay: "270ms" }}
          >
            <Magnetic>
              <Link
                href="/#yazilar"
                className="block rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-ink"
              >
                Yazıları Oku
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/projects"
                className="block rounded-full border border-line px-6 py-2.5 text-sm text-paper transition-colors duration-300 hover:border-accent/50"
              >
                Projeler
              </Link>
            </Magnetic>
            <span className="flex items-center gap-2 font-mono text-xs text-faint">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  online ? "live-dot bg-accent" : "bg-red-500"
                }`}
              />
              API: {backendStatus}
            </span>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "YAZILIM",
          "YAPAY ZEKA",
          "TASARIM",
          "KİTAP",
          "DÜŞÜNCE",
          "PROJELER",
        ]}
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-6 py-16 sm:py-24">
        <section id="yazilar" className="flex scroll-mt-24 flex-col gap-6">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
                Son Yazılar
              </h2>
              <span className="font-mono text-xs text-faint">
                {articles?.length ?? 0} yayın
              </span>
            </div>
          </Reveal>
          {articles === null ? (
            <p className="text-sm text-muted">Yazılar yüklenemedi.</p>
          ) : articles.length === 0 ? (
            <p className="text-sm text-muted">Henüz yayınlanmış yazı yok.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {articles.map((article, i) => (
                <li key={article.id}>
                  <Reveal delay={(i % 4) * 70}>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="card-lift block h-full rounded-2xl border border-line bg-surface p-5"
                    >
                      <p className="font-mono text-[11px] tracking-widest text-accent">
                        YAZI
                      </p>
                      <p className="mt-2 font-display text-lg font-semibold leading-snug text-paper">
                        {article.title}
                      </p>
                      <p className="mt-3 font-mono text-xs text-faint">
                        /{article.slug} →
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="flex flex-col gap-6">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
                Öne Çıkan Projeler
              </h2>
              <Link
                href="/projects"
                className="nav-link font-mono text-xs text-muted"
              >
                TÜMÜ →
              </Link>
            </div>
          </Reveal>
          {projects === null ? (
            <p className="text-sm text-muted">Projeler yüklenemedi.</p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-muted">Henüz yayınlanmış proje yok.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {projects.slice(0, 4).map((project, i) => (
                <li key={project.id}>
                  <Reveal delay={(i % 4) * 70}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="card-lift block h-full rounded-2xl border border-line bg-surface p-5"
                    >
                      <p className="font-mono text-[11px] tracking-widest text-accent">
                        PROJE
                      </p>
                      <p className="mt-2 font-display text-lg font-semibold leading-snug text-paper">
                        {project.title}
                      </p>
                      {project.summary && (
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">
                          {project.summary}
                        </p>
                      )}
                      {project.technologies.length > 0 && (
                        <p className="mt-3 font-mono text-xs text-faint">
                          {project.technologies.join(" · ")}
                        </p>
                      )}
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
