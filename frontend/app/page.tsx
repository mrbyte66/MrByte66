import Link from "next/link";
import { Constellation, type GraphNode } from "./components/Constellation";
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

function Chapter({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-accent">{index}</span>
        <h2 className="font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

export default async function Home() {
  const [backendStatus, articles, projects] = await Promise.all([
    getBackendStatus(),
    getArticles(),
    getProjects(),
  ]);
  const online = backendStatus === "UP";

  const graph: GraphNode[] = [
    { id: "hub", label: "MrByte66", href: "/", kind: "hub" },
    ...(articles ?? []).slice(0, 6).map((a) => ({
      id: `a-${a.id}`,
      label: a.title.length > 26 ? `${a.title.slice(0, 26)}…` : a.title,
      href: `/articles/${a.slug}`,
      kind: "article" as const,
    })),
    ...(projects ?? []).slice(0, 6).map((p) => ({
      id: `p-${p.id}`,
      label: p.title.length > 26 ? `${p.title.slice(0, 26)}…` : p.title,
      href: `/projects/${p.slug}`,
      kind: "project" as const,
    })),
  ];

  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[92vh] flex-col overflow-hidden">
        <Constellation nodes={graph} />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center gap-4 px-6 pt-28 text-center">
          <p className="rise font-mono text-xs tracking-[0.35em] text-accent">
            BİLGİ TAKIMYILDIZI
          </p>
          <h1
            className="rise font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            <span className="text-gradient-sky">Düşünce</span>
            <span className="text-paper"> ağı.</span>
          </h1>
          <p
            className="rise max-w-md leading-7 text-muted"
            style={{ animationDelay: "240ms" }}
          >
            Her düğüm bir yazı, bir proje. Sürükle, yakından bak, tıklayıp
            içine gir.
          </p>
        </div>
        <div className="absolute bottom-6 left-6 flex items-center gap-2 font-mono text-[11px] text-faint">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              online ? "live-dot bg-accent" : "bg-red-500"
            }`}
          />
          API {backendStatus}
        </div>
        <div className="absolute bottom-6 right-6 hidden font-mono text-[11px] text-faint sm:block">
          mavi · yazı&ensp;&ensp;amber · proje
        </div>
      </section>

      <section
        id="yazilar"
        className="relative mx-auto flex w-full max-w-5xl scroll-mt-24 flex-col gap-8 px-6 py-28"
      >
        <Chapter index="01" title="Yazılar" />
        {articles === null ? (
          <p className="text-sm text-muted">Yazılar yüklenemedi.</p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-muted">Henüz yayınlanmış yazı yok.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {articles.map((article, i) => (
              <li key={article.id}>
                <Reveal delay={(i % 4) * 70} className="h-full">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="card-lift glass block h-full rounded-2xl border border-line p-7"
                  >
                    <p className="font-mono text-[11px] tracking-widest text-accent">
                      YAZI · {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold leading-snug text-paper">
                      {article.title}
                    </p>
                    <p className="link-more mt-4 text-[15px]">
                      Okumaya devam et →
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-28">
        <Chapter index="02" title="Projeler" />
        {projects === null ? (
          <p className="text-sm text-muted">Projeler yüklenemedi.</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-muted">Henüz yayınlanmış proje yok.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, i) => (
              <li key={project.id}>
                <Reveal delay={(i % 4) * 70} className="h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="card-lift glass block h-full rounded-2xl border border-line p-7"
                  >
                    <p className="font-mono text-[11px] tracking-widest text-accent">
                      PROJE · {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold leading-snug text-paper">
                      {project.title}
                    </p>
                    {project.summary && (
                      <p className="mt-2 line-clamp-2 text-[15px] leading-7 text-muted">
                        {project.summary}
                      </p>
                    )}
                    {project.technologies.length > 0 && (
                      <p className="mt-4 font-mono text-xs text-faint">
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
  );
}
