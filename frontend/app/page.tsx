import Link from "next/link";
import { Parallax } from "./components/Parallax";
import { Reveal } from "./components/Reveal";
import { Scene3D } from "./components/Scene3D";
import { Tilt } from "./components/Tilt";

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
  const featuredArticle = articles?.[0] ?? null;
  const featuredProject = projects?.[0] ?? null;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-6 py-16 sm:py-24">
      <Scene3D>
        <section className="scene-stage grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
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
              <Link
                href="/#yazilar"
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Yazıları Oku
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-line px-6 py-2.5 text-sm text-paper transition-colors duration-300 hover:border-accent/50"
              >
                Projeler
              </Link>
            </div>
          </div>

          <div className="relative hidden h-[440px] select-none lg:block">
            <div className="scene-layer absolute inset-0 flex items-center justify-center"
              data-depth="10"
              style={{ "--pz": "-160px" } as React.CSSProperties}
            >
              <span className="text-outline font-display text-[13rem] font-bold leading-none">
                66
              </span>
            </div>
            <div
              className="scene-layer absolute inset-0"
              data-depth="22"
              style={{ "--pz": "-40px" } as React.CSSProperties}
            >
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
              <div className="absolute bottom-6 right-2 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
            </div>
            {featuredArticle && (
              <div
                className="scene-layer absolute left-0 top-8 w-64"
                data-depth="34"
                style={{ "--pz": "70px" } as React.CSSProperties}
              >
                <Link
                  href={`/articles/${featuredArticle.slug}`}
                  className="glass floaty block rounded-2xl border border-line p-5"
                >
                  <p className="font-mono text-[11px] tracking-widest text-accent">
                    SON YAZI
                  </p>
                  <p className="mt-2 font-display text-base font-semibold leading-snug text-paper">
                    {featuredArticle.title}
                  </p>
                  <p className="mt-3 font-mono text-xs text-faint">
                    oku →
                  </p>
                </Link>
              </div>
            )}
            {featuredProject && (
              <div
                className="scene-layer absolute bottom-16 right-0 w-72"
                data-depth="-26"
                style={{ "--pz": "30px" } as React.CSSProperties}
              >
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="glass floaty-slow block rounded-2xl border border-line p-5"
                >
                  <p className="font-mono text-[11px] tracking-widest text-accent">
                    ÖNE ÇIKAN PROJE
                  </p>
                  <p className="mt-2 font-display text-base font-semibold leading-snug text-paper">
                    {featuredProject.title}
                  </p>
                  {featuredProject.technologies.length > 0 && (
                    <p className="mt-3 font-mono text-xs text-faint">
                      {featuredProject.technologies.slice(0, 3).join(" · ")}
                    </p>
                  )}
                </Link>
              </div>
            )}
            <div
              className="scene-layer absolute right-10 top-2"
              data-depth="48"
              style={{ "--pz": "140px" } as React.CSSProperties}
            >
              <span className="glass flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-faint">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    online ? "live-dot bg-accent" : "bg-red-500"
                  }`}
                />
                API: {backendStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-faint lg:hidden">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                online ? "live-dot bg-accent" : "bg-red-500"
              }`}
            />
            API: {backendStatus}
          </div>
        </section>
      </Scene3D>

      <section id="yazilar" className="relative flex scroll-mt-24 flex-col gap-6">
        <Parallax
          speed={0.06}
          className="pointer-events-none absolute -top-10 left-0 select-none overflow-hidden"
        >
          <span className="text-outline whitespace-nowrap font-display text-7xl font-bold tracking-tight sm:text-8xl">
            YAZILAR
          </span>
        </Parallax>
        <Reveal>
          <div className="relative flex items-baseline justify-between">
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
                <Reveal delay={(i % 4) * 70} className="h-full">
                  <Tilt className="h-full">
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
                  </Tilt>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="relative flex flex-col gap-6">
        <Parallax
          speed={0.06}
          className="pointer-events-none absolute -top-10 left-0 select-none overflow-hidden"
        >
          <span className="text-outline whitespace-nowrap font-display text-7xl font-bold tracking-tight sm:text-8xl">
            PROJELER
          </span>
        </Parallax>
        <Reveal>
          <div className="relative flex items-baseline justify-between">
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
                <Reveal delay={(i % 4) * 70} className="h-full">
                  <Tilt className="h-full">
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
                  </Tilt>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
