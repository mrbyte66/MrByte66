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

type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  content: string;
  technologies: string[];
  demoUrl: string | null;
  sourceUrl: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
};

type Tab = "articles" | "projects";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("mrbyte66_token");
  return token ? { authorization: `Bearer ${token}` } : {};
}

async function fetchAdminList(path: string): Promise<{
  status: number;
  data: Article[] | Project[] | null;
}> {
  const res = await fetch(path, { headers: authHeaders() });
  if (!res.ok) {
    return { status: res.status, data: null };
  }
  return { status: res.status, data: await res.json() };
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("articles");
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [technologies, setTechnologies] = useState("");

  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem("mrbyte66_token");
    router.push("/admin/login");
  }, [router]);

  const loadArticles = useCallback(async () => {
    const { status, data } = await fetchAdminList("/api/admin/articles");
    if (status === 401) {
      handleUnauthorized();
      return;
    }
    if (data === null) {
      setError("Articles could not be loaded.");
      return;
    }
    setArticles(data as Article[]);
  }, [handleUnauthorized]);

  const loadProjects = useCallback(async () => {
    const { status, data } = await fetchAdminList("/api/admin/projects");
    if (status === 401) {
      handleUnauthorized();
      return;
    }
    if (data === null) {
      setError("Projects could not be loaded.");
      return;
    }
    setProjects(data as Project[]);
  }, [handleUnauthorized]);

  useEffect(() => {
    const token = localStorage.getItem("mrbyte66_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    let cancelled = false;
    (async () => {
      const [articleRes, projectRes] = await Promise.all([
        fetch("/api/admin/articles", {
          headers: { authorization: `Bearer ${token}` },
        }),
        fetch("/api/admin/projects", {
          headers: { authorization: `Bearer ${token}` },
        }),
      ]);
      if (cancelled) {
        return;
      }
      if (articleRes.status === 401 || projectRes.status === 401) {
        localStorage.removeItem("mrbyte66_token");
        router.push("/admin/login");
        return;
      }
      if (articleRes.ok) {
        setArticles(await articleRes.json());
      } else {
        setError("Articles could not be loaded.");
      }
      if (projectRes.ok) {
        setProjects(await projectRes.json());
      } else {
        setError("Projects could not be loaded.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleCreateArticle(event: React.FormEvent) {
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
    loadArticles();
  }

  async function handleCreateProject(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const techList = technologies
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({
        slug,
        title,
        summary: summary || null,
        content,
        technologies: techList,
        status: "DRAFT",
      }),
    });
    if (res.status === 409) {
      setError("Slug already in use.");
      return;
    }
    if (!res.ok) {
      setError("Project could not be created.");
      return;
    }
    setSlug("");
    setTitle("");
    setContent("");
    setSummary("");
    setTechnologies("");
    loadProjects();
  }

  async function handleToggleArticle(article: Article) {
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
    loadArticles();
  }

  async function handleToggleProject(project: Project) {
    const next = project.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const res = await fetch(`/api/admin/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setError("Status could not be updated.");
      return;
    }
    loadProjects();
  }

  async function handleDeleteArticle(id: number) {
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) {
      setError("Article could not be deleted.");
      return;
    }
    loadArticles();
  }

  async function handleDeleteProject(id: number) {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) {
      setError("Project could not be deleted.");
      return;
    }
    loadProjects();
  }

  function handleLogout() {
    localStorage.removeItem("mrbyte66_token");
    router.push("/admin/login");
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-paper placeholder:text-faint focus:border-accent/60 focus:outline-none";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <main className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-bold tracking-tight text-paper">
            Admin
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-muted hover:text-paper hover:underline"
          >
            Çıkış
          </button>
        </div>

        <div className="flex gap-4 text-sm">
          {(["articles", "projects"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "font-semibold text-paper underline decoration-accent underline-offset-4"
                  : "text-muted hover:text-paper hover:underline"
              }
            >
              {t === "articles" ? "Yazılar" : "Projeler"}
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {tab === "articles" ? (
          <>
            <form
              onSubmit={handleCreateArticle}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5"
            >
              <h2 className="font-display font-semibold text-paper">
                Yeni yazı
              </h2>
              <input
                className={inputClass}
                placeholder="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Başlık"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className={inputClass}
                placeholder="İçerik"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-xl bg-accent px-4 py-2.5 font-semibold text-ink"
              >
                Taslak olarak oluştur
              </button>
            </form>

            {articles === null ? (
              <p className="text-sm text-muted">
                Yükleniyor…
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {articles.map((article) => (
                  <li
                    key={article.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3"
                  >
                    <div>
                      <span className="font-display font-semibold text-paper">
                        {article.title}
                      </span>
                      <span className="ml-2 font-mono text-xs text-faint">
                        /{article.slug} · {article.status}
                      </span>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <button
                        onClick={() => handleToggleArticle(article)}
                        className="text-muted hover:text-paper hover:underline"
                      >
                        {article.status === "PUBLISHED"
                          ? "Yayından kaldır"
                          : "Yayınla"}
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-400 hover:underline"
                      >
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <form
              onSubmit={handleCreateProject}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5"
            >
              <h2 className="font-display font-semibold text-paper">
                Yeni proje
              </h2>
              <input
                className={inputClass}
                placeholder="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Başlık"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Özet (opsiyonel)"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <textarea
                className={inputClass}
                placeholder="İçerik"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Teknolojiler (virgülle ayır)"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-xl bg-accent px-4 py-2.5 font-semibold text-ink"
              >
                Taslak olarak oluştur
              </button>
            </form>

            {projects === null ? (
              <p className="text-sm text-muted">
                Yükleniyor…
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3"
                  >
                    <div>
                      <span className="font-display font-semibold text-paper">
                        {project.title}
                      </span>
                      <span className="ml-2 font-mono text-xs text-faint">
                        /{project.slug} · {project.status}
                      </span>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <button
                        onClick={() => handleToggleProject(project)}
                        className="text-muted hover:text-paper hover:underline"
                      >
                        {project.status === "PUBLISHED"
                          ? "Yayından kaldır"
                          : "Yayınla"}
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-400 hover:underline"
                      >
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}
