import Link from "next/link";
import { notFound } from "next/navigation";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

type ProjectDetail = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  content: string;
  technologies: string[];
  demoUrl: string | null;
  sourceUrl: string | null;
  status: string;
  createdAt: string;
};

async function getProject(slug: string): Promise<ProjectDetail | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects/${slug}`, {
      cache: "no-store",
    });
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`Backend responded with ${res.status}`);
    }
    return (await res.json()) as ProjectDetail;
  } catch {
    throw new Error("Project could not be loaded.");
  }
}

type ProjectSummary = {
  slug: string;
  title: string;
};

async function getNeighbors(
  slug: string,
): Promise<{ prev: ProjectSummary | null; next: ProjectSummary | null }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/projects`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return { prev: null, next: null };
    }
    const list = (await res.json()) as ProjectSummary[];
    const i = list.findIndex((p) => p.slug === slug);
    if (i === -1) {
      return { prev: null, next: null };
    }
    return {
      prev: i > 0 ? list[i - 1] : null,
      next: i < list.length - 1 ? list[i + 1] : null,
    };
  } catch {
    return { prev: null, next: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug).catch(() => null);
  return {
    title: project ? `${project.title} | MrByte66` : "Proje | MrByte66",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project: ProjectDetail | null = null;
  let loadError = false;
  try {
    project = await getProject(slug);
  } catch {
    loadError = true;
  }
  if (loadError) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-bold text-paper">
          Proje yüklenemedi.
        </h1>
        <Link href="/projects" className="nav-link text-sm text-muted">
          ← Projelere dön
        </Link>
      </div>
    );
  }
  if (project === null) {
    notFound();
  }
  const { prev, next } = await getNeighbors(slug);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16 sm:py-24">
      <Link href="/projects" className="nav-link w-fit text-sm text-muted">
        ← Projelere dön
      </Link>
      <p className="rise font-mono text-xs tracking-[0.3em] text-accent">
        PROJE
      </p>
      <h1 className="rise font-display text-4xl font-bold leading-tight tracking-tight text-paper sm:text-5xl">
        {project.title}
      </h1>
      {project.summary && (
        <p className="rise text-lg leading-8 text-muted">{project.summary}</p>
      )}
      {project.technologies.length > 0 && (
        <div className="rise flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      <article className="rise whitespace-pre-wrap text-lg leading-9 text-paper/85">
        {project.content}
      </article>
      <div className="rise flex gap-5 text-sm">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-accent px-5 py-2 font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            Canlı Demo →
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-5 py-2 text-paper transition-colors duration-300 hover:border-accent/50"
          >
            Kaynak Kod →
          </a>
        )}
      </div>
      {(prev || next) && (
        <nav className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
          {prev && (
            <Link href={`/projects/${prev.slug}`} className="group w-fit">
              <p className="font-mono text-[11px] tracking-widest text-faint">
                ← ÖNCEKİ
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-paper blur-[2px] transition-all duration-500 group-hover:blur-none">
                {prev.title}
              </p>
            </Link>
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group w-fit self-end text-right">
              <p className="font-mono text-[11px] tracking-widest text-faint">
                SONRAKİ →
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-paper transition-colors duration-300 group-hover:text-accent">
                {next.title}
              </p>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
