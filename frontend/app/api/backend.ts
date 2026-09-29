const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

export async function proxyBackend(
  path: string,
  req: Request,
  init: RequestInit = {},
) {
  let backendRes: Response;
  try {
    backendRes = await fetch(`${BACKEND_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
        ...(req.headers.get("authorization")
          ? { authorization: req.headers.get("authorization") as string }
          : {}),
      },
      cache: "no-store",
    });
  } catch {
    return Response.json({ error: "Backend unreachable" }, { status: 502 });
  }
  const data = await backendRes.json().catch(() => ({}));
  if (backendRes.status === 204) {
    return new Response(null, { status: 204 });
  }
  return Response.json(data, { status: backendRes.status });
}
