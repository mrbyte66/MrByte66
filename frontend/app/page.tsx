import Link from "next/link";
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
  const featuredProject = projects?.[0] ?? null;
  const restProjects = (projects ?? []).slice(1, 5);

  return (
    <div className="flex flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-6 py-16 text-center sm:py-24">
        <p
          className="rise text-sm font-semibold text-muted"
          style={{ animationDelay: "0ms" }}
        >
          MrByte66 — Kişisel Dijital Platform
        </p>
        <h1
          className="rise max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-7xl"
          style={{ animationDelay: "90ms" }}
        >
          Merakla inşa edilen dijital atölye.
        </h1>
        <p
          className="rise max-w-xl text-xl leading-8 text-muted"
          style={{ animationDelay: "180ms" }}
        >
          Teknik yazılar, projeler ve kişisel notlar. Öğren, üret, paylaş.
        </p>
        <div
          className="rise flex flex-wrap items-center justify-center gap-6"
          style={{ animationDelay: "270ms" }}
        >
          <Link
            href="/#yazilar"
            className="rounded-full bg-accent px-6 py-2.5 text-[15px] text-white"
          >
            Yazıları Oku
          </Link>
          <Link href="/projects" className="link-more text-[15px]">
            Projeleri İncele &gt;
          </Link>
        </div>
        <p className="flex items-center gap-2 text-xs text-faint">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              online ? "live-dot bg-accent" : "bg-red-500"
            }`}
          />
          API {backendStatus}
        </p>
      </section>

      {featuredProject && (
        <section className="mx-auto w-full max-w-5xl px-6 pb-4">
          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-3xl bg-black px-6 py-16 text-center sm:py-20">
              <p className="text-sm font-semibold text-accent">
                Öne Çıkan Proje
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {featuredProject.title}
              </h2>
              {featuredProject.summary && (
                <p className="max-w-xl text-lg leading-8 text-neutral-400">
                  {featuredProject.summary}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="rounded-full bg-accent px-6 py-2 text-[15px] text-white"
                >
                  Detayı Gör
                </Link>
                <Link
                  href="/projects"
                  className="link-more text-[15px]"
                >
                  Tüm Projeler &gt;
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section
        id="yazilar"
        className="mt-4 scroll-mt-24 bg-surface py-16 sm:py-20"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6">
          <Reveal>
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
                Son Yazılar
              </h2>
              <p className="max-w-lg text-lg text-muted">
                Teknik notlar, deneyimler ve düşünceler.
              </p>
            </div>
          </Reveal>
          {articles === null ? (
            <p className="text-center text-sm text-muted">
              Yazılar yüklenemedi.
            </p>
          ) : articles.length === 0 ? (
            <p className="text-center text-sm text-muted">
              Henüz yayınlanmış yazı yok.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {articles.map((article, i) => (
                <li key={article.id}>
                  <Reveal delay={(i % 4) * 70} className="h-full">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="card-lift flex h-full flex-col gap-2 rounded-3xl bg-raised p-8"
                    >
                      <p className="text-xl font-semibold tracking-tight text-paper">
                        {article.title}
                      </p>
                      <p className="link-more mt-auto pt-2 text-[15px]">
                        Okumaya devam et &gt;
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {restProjects.length > 0 && (
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:py-20">
          <Reveal>
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
                Projeler
              </h2>
              <Link href="/projects" className="link-more text-[15px]">
                Tümü &gt;
              </Link>
            </div>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {restProjects.map((project, i) => (
              <li key={project.id}>
                <Reveal delay={(i % 4) * 70} className="h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="card-lift flex h-full flex-col gap-2 rounded-3xl bg-surface p-8"
                  >
                    <p className="text-xl font-semibold tracking-tight text-paper">
                      {project.title}
                    </p>
                    {project.summary && (
                      <p className="line-clamp-2 text-[15px] leading-6 text-muted">
                        {project.summary}
                      </p>
                    )}
                    {project.technologies.length > 0 && (
                      <p className="pt-2 font-mono text-xs text-faint">
                        {project.technologies.join(" · ")}
                      </p>
                    )}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
