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

export default async function Home() {
  const backendStatus = await getBackendStatus();
  const online = backendStatus === "UP";

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
      </main>
    </div>
  );
}
