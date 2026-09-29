import Link from "next/link";
import { notFound } from "next/navigation";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

type ArticleDetail = {
  id: number;
  slug: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
};

async function getArticle(slug: string): Promise<ArticleDetail | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/articles/${slug}`, {
      cache: "no-store",
    });
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`Backend responded with ${res.status}`);
    }
    return (await res.json()) as ArticleDetail;
  } catch {
    throw new Error("Article could not be loaded.");
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug).catch(() => null);
  return {
    title: article ? `${article.title} | MrByte66` : "Article | MrByte66",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let article: ArticleDetail | null = null;
  let loadError = false;
  try {
    article = await getArticle(slug);
  } catch {
    loadError = true;
  }
  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex w-full max-w-3xl flex-col items-center gap-6 px-16 py-32 text-center">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Article could not be loaded.
          </h1>
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
          >
            ← Back to home
          </Link>
        </main>
      </div>
    );
  }
  if (article === null) {
    notFound();
  }

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
          {article.title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <article className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          {article.content}
        </article>
      </main>
    </div>
  );
}
