import Link from "next/link";

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

export default async function Home() {
  const [articles, projects] = await Promise.all([
    getArticles(),
    getProjects(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-16 px-6 py-20 sm:py-28">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-paper">
          MrByte66
        </h1>
        <p className="leading-7 text-muted">
          Yazılım, yapay zeka ve düşünce üzerine yazılar; arada projeler.
          Burası kişisel arşivim.
        </p>
        <div className="flex gap-5 text-[15px]">
          <Link href="/projects" className="link-more">
            Projeler
          </Link>
          <Link href="/admin" className="link-more">
            Admin
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-mono text-xs tracking-[0.25em] text-faint">
          YAZILAR
        </h2>
        {articles.length === 0 ? (
          <p className="py-4 text-sm text-muted">Henüz yazı yok.</p>
        ) : (
          <ul>
            {articles.map((article) => (
              <li key={article.id} className="border-t border-line py-4">
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex items-baseline justify-between gap-4"
                >
                  <span className="text-[17px] text-paper group-hover:underline">
                    {article.title}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-faint">
                    {formatDate(article.createdAt)}
                  </span>
                </Link>
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
              <li key={project.id} className="border-t border-line py-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col gap-1"
                >
                  <span className="text-[17px] text-paper group-hover:underline">
                    {project.title}
                  </span>
                  {project.technologies.length > 0 && (
                    <span className="font-mono text-xs text-faint">
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
  );
}
