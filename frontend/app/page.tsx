import Link from "next/link";

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

export default async function Home() {
  const backendStatus = await getBackendStatus();
  const online = backendStatus === "UP";
  const articles = await getArticles();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-6 px-16 py-32 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
          MrByte66
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Personal digital platform. Frontend skeleton is running.
        </p>
        <div className="flex items-center gap-2 rounded-full border border-solid border-black/[.08] px-5 py-2 text-sm dark:border-white/[.145]">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              online ? "bg-green-500" : "bg-red-500"
            }`}
          />
          Backend: {backendStatus}
        </div>
        <section className="w-full max-w-md text-left">
          <h2 className="mb-3 text-xl font-semibold text-black dark:text-zinc-50">
            Articles
          </h2>
          {articles === null ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Articles could not be loaded.
            </p>
          ) : articles.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No published articles yet.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {articles.map((article) => (
                <li
                  key={article.id}
                  className="rounded-lg border border-solid border-black/[.08] px-4 py-3 dark:border-white/[.145]"
                >
                  <Link href={`/articles/${article.slug}`} className="block">
                    <span className="font-medium text-black dark:text-zinc-50">
                      {article.title}
                    </span>
                    <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
                      /{article.slug}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
