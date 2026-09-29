import Link from "next/link";
import { Reveal } from "./components/Reveal";
import { ShuffleText } from "./components/ShuffleText";
import { Typewriter } from "./components/Typewriter";

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

  return (
    <div className="flex flex-col">
      <section className="relative mx-auto flex min-h-[92vh] w-full max-w-5xl flex-col justify-center gap-7 px-6">
        <p className="font-mono text-xs tracking-[0.35em] text-muted">
          MRBYTE66 — KİŞİSEL PLATFORM
        </p>
        <h1 className="font-display text-7xl font-bold leading-[0.95] tracking-tight text-paper sm:text-8xl">
          <ShuffleText text="ÖĞREN." delay={200} />
          <br />
          <ShuffleText text="ÜRET." delay={700} />
          <br />
          <span className="text-accent">
            <ShuffleText text="PAYLAŞ." delay={1200} />
          </span>
        </h1>
        <p className="max-w-xl text-lg leading-8 text-muted">
          <Typewriter
            text="Selam! Ben Byte. Buralarda yazı ve proje biriktiriyorum — karıştır, oku, takıl."
            delay={900}
          />
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/#yazilar"
            className="rounded-full bg-paper px-7 py-2.5 text-[15px] font-semibold text-ink"
          >
            Yazıları Oku
          </Link>
          <Link href="/projects" className="link-more text-[15px]">
            Projeler →
          </Link>
          <span className="flex items-center gap-2 font-mono text-[11px] text-faint">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                online ? "live-dot bg-accent" : "bg-red-500"
              }`}
            />
            API {backendStatus}
          </span>
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
