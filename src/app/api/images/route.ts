import { db } from "@/db";
import { productImages, productReviews } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

type ImageBody = {
  id?: unknown;
  kind?: unknown;
  imageUrl?: unknown;
};

function isAllowedImageUrl(value: string) {
  return value.startsWith("data:image/") || value.startsWith("https://") || value.startsWith("http://") || value.startsWith("/");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ImageBody;
    const id = typeof body.id === "number" ? body.id : Number(body.id);
    const kind = body.kind;
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

    if (!Number.isInteger(id) || id <= 0 || (kind !== "product" && kind !== "review")) {
      return Response.json({ error: "طلب تبديل الصورة غير صحيح." }, { status: 400 });
    }

    if (!imageUrl || !isAllowedImageUrl(imageUrl)) {
      return Response.json({ error: "رابط/ملف الصورة غير مقبول." }, { status: 400 });
    }

    if (imageUrl.length > 3_500_000) {
      return Response.json({ error: "الصورة كبيرة بزاف. استعمل صورة أصغر." }, { status: 413 });
    }

    const updated =
      kind === "product"
        ? await db.update(productImages).set({ url: imageUrl }).where(eq(productImages.id, id)).returning({ id: productImages.id })
        : await db.update(productReviews).set({ imageUrl }).where(eq(productReviews.id, id)).returning({ id: productReviews.id });

    if (updated.length === 0) {
      return Response.json({ error: "ما لقيناش هاد الصورة." }, { status: 404 });
    }

    return Response.json({ ok: true, id: updated[0].id });
  } catch (error) {
    console.error("TCM image update error", error);
    return Response.json({ error: "ما قدرناش نبدلو الصورة دابا." }, { status: 500 });
  }
}
