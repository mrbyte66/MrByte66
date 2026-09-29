"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Article = {
  id: number;
  slug: string;
  title: string;
  content: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
};

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("mrbyte66_token");
  return token ? { authorization: `Bearer ${token}` } : {};
}

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/articles", { headers: authHeaders() });
    if (res.status === 401) {
      localStorage.removeItem("mrbyte66_token");
      router.push("/admin/login");
      return;
    }
    if (!res.ok) {
      setError("Articles could not be loaded.");
      return;
    }
    setArticles(await res.json());
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("mrbyte66_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/articles", {
        headers: { authorization: `Bearer ${token}` },
      });
      if (cancelled) {
        return;
      }
      if (res.status === 401) {
        localStorage.removeItem("mrbyte66_token");
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        setError("Articles could not be loaded.");
        return;
      }
      setArticles(await res.json());
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ slug, title, content, status: "DRAFT" }),
    });
    if (res.status === 409) {
      setError("Slug already in use.");
      return;
    }
    if (!res.ok) {
      setError("Article could not be created.");
      return;
    }
    setSlug("");
    setTitle("");
    setContent("");
    load();
  }

  async function handleToggleStatus(article: Article) {
    const next = article.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const res = await fetch(`/api/admin/articles/${article.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setError("Status could not be updated.");
      return;
    }
    load();
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) {
      setError("Article could not be deleted.");
      return;
    }
    load();
  }

  function handleLogout() {
    localStorage.removeItem("mrbyte66_token");
    router.push("/admin/login");
  }

  const inputClass =
    "w-full rounded-lg border border-solid border-black/[.08] bg-transparent px-4 py-2 text-black dark:border-white/[.145] dark:text-zinc-50";

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-6 px-8 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Articles
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
          >
            Log out
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-3 rounded-lg border border-solid border-black/[.08] p-4 dark:border-white/[.145]"
        >
          <h2 className="font-medium text-black dark:text-zinc-50">
            New article
          </h2>
          <input
            className={inputClass}
            placeholder="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={inputClass}
            placeholder="Content"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-50 dark:text-black"
          >
            Create as draft
          </button>
        </form>

        {articles === null ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading…</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {articles.map((article) => (
              <li
                key={article.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-solid border-black/[.08] px-4 py-3 dark:border-white/[.145]"
              >
                <div>
                  <span className="font-medium text-black dark:text-zinc-50">
                    {article.title}
                  </span>
                  <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
                    /{article.slug} · {article.status}
                  </span>
                </div>
                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() => handleToggleStatus(article)}
                    className="text-zinc-600 hover:underline dark:text-zinc-400"
                  >
                    {article.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
