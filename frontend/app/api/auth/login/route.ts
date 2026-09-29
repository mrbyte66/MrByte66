import { proxyBackend } from "@/app/api/backend";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  return proxyBackend("/api/auth/login", req, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
