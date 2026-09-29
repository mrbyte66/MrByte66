import { proxyBackend } from "@/app/api/backend";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  return proxyBackend(`/api/admin/projects/${id}`, req, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyBackend(`/api/admin/projects/${id}`, req, { method: "DELETE" });
}
