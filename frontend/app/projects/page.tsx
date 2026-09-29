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
  title: "Projects | MrByte66",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-6 px-16 py-32">
        <Link
          href="/"
          className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
        >
          ← Back to home
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Projects
        </h1>
        {projects === null ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Projects could not be loaded.
          </p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No published projects yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className="rounded-lg border border-solid border-black/[.08] px-4 py-3 dark:border-white/[.145]"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block"
                >
                  <span className="font-medium text-black dark:text-zinc-50">
                    {project.title}
                  </span>
                  {project.summary && (
                    <span className="block text-sm text-zinc-600 dark:text-zinc-400">
                      {project.summary}
                    </span>
                  )}
                  {project.technologies.length > 0 && (
                    <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">
                      {project.technologies.join(" · ")}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
