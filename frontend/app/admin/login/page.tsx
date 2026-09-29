"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError(
          res.status === 401
            ? "Kullanıcı adı veya parola hatalı."
            : "Giriş başarısız. Tekrar dene.",
        );
        return;
      }
      const data = await res.json();
      localStorage.setItem("mrbyte66_token", data.token);
      router.push("/admin");
    } catch {
      setError("Backend'e ulaşılamıyor.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-paper placeholder:text-faint focus:border-accent/60 focus:outline-none";

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <p className="rise font-mono text-xs tracking-[0.3em] text-accent">
        YÖNETİM
      </p>
      <h1 className="rise mt-3 font-display text-4xl font-bold tracking-tight text-paper">
        Giriş Yap
      </h1>
      <form
        onSubmit={handleSubmit}
        className="rise mt-8 flex flex-col gap-4"
        style={{ animationDelay: "90ms" }}
      >
        <input
          className={inputClass}
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-accent px-4 py-2.5 font-semibold text-ink disabled:opacity-50"
        >
          {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
