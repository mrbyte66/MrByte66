import Link from "next/link";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  technologies: string[];
  status: string;
};

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

export const metadata = {
  title: "Projeler | MrByte66",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:py-24">
      <p className="rise font-mono text-xs tracking-[0.3em] text-accent">
        PORTFÖY
      </p>
      <h1 className="rise font-display text-5xl font-bold tracking-tight text-paper sm:text-6xl">
        Projeler
      </h1>
      <p className="rise max-w-xl leading-7 text-muted">
        Üzerinde çalıştığım işler: kullanılan teknolojiler, kararlar ve
        kaynak kodlarıyla birlikte.
      </p>
      {projects === null ? (
        <p className="text-sm text-muted">Projeler yüklenemedi.</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-muted">Henüz yayınlanmış proje yok.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li
              key={project.id}
              className="rise"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="card-lift block rounded-2xl border border-line bg-surface p-6"
              >
                <p className="font-display text-xl font-semibold leading-snug text-paper">
                  {project.title}
                </p>
                {project.summary && (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {project.summary}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <p className="mt-4 font-mono text-xs text-faint">
                    {project.technologies.join(" · ")}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
