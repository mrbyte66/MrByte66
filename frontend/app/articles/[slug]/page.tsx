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

type ArticleSummary = {
  slug: string;
  title: string;
};

async function getNeighbors(
  slug: string,
): Promise<{ prev: ArticleSummary | null; next: ArticleSummary | null }> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/articles`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return { prev: null, next: null };
    }
    const list = (await res.json()) as ArticleSummary[];
    const i = list.findIndex((a) => a.slug === slug);
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
  const article = await getArticle(slug).catch(() => null);
  return {
    title: article ? `${article.title} | MrByte66` : "Yazı | MrByte66",
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
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-bold text-paper">
          Yazı yüklenemedi.
        </h1>
        <Link
          href="/#yazilar"
          className="nav-link text-sm text-muted"
        >
          ← Yazılara dön
        </Link>
      </div>
    );
  }
  if (article === null) {
    notFound();
  }
  const { prev, next } = await getNeighbors(slug);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16 sm:py-24">
      <Link href="/#yazilar" className="nav-link w-fit text-sm text-muted">
        ← Yazılara dön
      </Link>
      <p className="rise font-mono text-xs tracking-[0.3em] text-accent">
        YAZI
      </p>
      <h1 className="rise font-display text-4xl font-bold leading-tight tracking-tight text-paper sm:text-5xl">
        {article.title}
      </h1>
      <p className="rise font-mono text-xs text-faint">
        {new Date(article.createdAt).toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <article className="rise whitespace-pre-wrap text-lg leading-9 text-paper/85">
        {article.content}
      </article>
      {(prev || next) && (
        <nav className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
          {prev && (
            <Link href={`/articles/${prev.slug}`} className="group w-fit">
              <p className="font-mono text-[11px] tracking-widest text-faint">
                ← ÖNCEKİ
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-paper blur-[2px] transition-all duration-500 group-hover:blur-none">
                {prev.title}
              </p>
            </Link>
          )}
          {next && (
            <Link href={`/articles/${next.slug}`} className="group w-fit self-end text-right">
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
