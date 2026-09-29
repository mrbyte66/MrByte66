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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug).catch(() => null);
  return {
    title: project ? `${project.title} | MrByte66` : "Project | MrByte66",
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col items-center gap-6 px-16 py-32 text-center">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Project could not be loaded.
          </h1>
          <Link
            href="/projects"
            className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
          >
            ← Back to projects
          </Link>
        </main>
      </div>
    );
  }
  if (project === null) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-6 px-16 py-32">
        <Link
          href="/projects"
          className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
        >
          ← Back to projects
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {project.title}
        </h1>
        {project.technologies.length > 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {project.technologies.join(" · ")}
          </p>
        )}
        <article className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          {project.content}
        </article>
        <div className="flex gap-4 text-sm">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:underline dark:text-zinc-400"
            >
              Live demo →
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:underline dark:text-zinc-400"
            >
              Source code →
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
