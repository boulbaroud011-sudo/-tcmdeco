export const dynamic = "force-dynamic";

export async function POST() {
  return Response.json({ error: "غير مسموح." }, { status: 403 });
}
