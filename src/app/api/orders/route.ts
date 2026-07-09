import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { ensureTcmCatalog, formatPrice, whatsappNumber } from "@/lib/tcm-data";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

type OrderBody = {
  productSlug?: unknown;
  customerName?: unknown;
  phone?: unknown;
  address?: unknown;
  notes?: unknown;
};

function requiredString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    await ensureTcmCatalog();
    const body = (await request.json()) as OrderBody;

    const productSlug = requiredString(body.productSlug);
    const customerName = requiredString(body.customerName);
    const phone = requiredString(body.phone);
    const address = requiredString(body.address);
    const notes = requiredString(body.notes);

    if (!productSlug || !customerName || !phone || !address) {
      return Response.json({ error: "عمر الاسم، النمرة والعنوان من فضلك." }, { status: 400 });
    }

    if (phone.replace(/[^0-9+]/g, "").length < 9) {
      return Response.json({ error: "النمرة باينة ناقصة. تأكد منها من فضلك." }, { status: 400 });
    }

    const [product] = await db.select().from(products).where(eq(products.slug, productSlug)).limit(1);

    if (!product) {
      return Response.json({ error: "هاد المنتج ما لقيناهش." }, { status: 404 });
    }

    const [createdOrder] = await db
      .insert(orders)
      .values({
        productId: product.id,
        customerName,
        phone,
        address,
        notes: notes || null,
      })
      .returning({ id: orders.id });

    const whatsappText = encodeURIComponent(
      `Salam TCM deco, bghit nconfirmi commande #${createdOrder.id}\n\nProduit: ${product.name}\nPrix: ${formatPrice(product.price)}\nNom: ${customerName}\nTéléphone: ${phone}\nAdresse: ${address}\nNotes: ${notes || "-"}`,
    );

    return Response.json({
      ok: true,
      orderId: createdOrder.id,
      whatsappUrl: `https://wa.me/${whatsappNumber()}?text=${whatsappText}`,
    });
  } catch (error) {
    console.error("TCM order error", error);
    return Response.json({ error: "وقع مشكل فالسيرفر. عاود حاول من بعد." }, { status: 500 });
  }
}
