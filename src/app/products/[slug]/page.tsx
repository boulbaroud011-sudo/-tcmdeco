import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OrderForm } from "@/components/OrderForm";
import { ProductCard } from "@/components/ProductCard";
import { ProductImageEditor } from "@/components/ProductImageEditor";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { formatPrice, getProductBySlug, getRelatedProducts, whatsappNumber } from "@/lib/tcm-data";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.slug, product.category);
  const phone = whatsappNumber();
  const directMessage = encodeURIComponent(`Salam TCM deco, bghit nsowal 3la ${product.name}.`);

  return (
    <main>
      <Header />
      <section className="px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-slate-950">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-slate-950">
              المنتجات
            </Link>
            <span>/</span>
            <span className="text-slate-950">{product.name}</span>
          </nav>

          <div className="rounded-[2.25rem] border border-black/5 bg-white p-3 shadow-2xl shadow-slate-950/8 sm:p-4 lg:p-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start xl:grid-cols-[minmax(0,1fr)_420px]">
              <div className="grid gap-3">
                {product.images[0] ? (
                  <ProductImageEditor
                    id={product.images[0].id}
                    kind="product"
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    className="aspect-[4/3] rounded-[1.75rem] shadow-xl shadow-slate-950/10 lg:max-h-[520px]"
                    imageClassName="object-cover"
                    priorityLabel="الصورة الرئيسية"
                  />
                ) : null}
                <p className="px-2 text-xs font-bold leading-6 text-emerald-700">
                  تقدر تبدّل صورة المنتج من زر “بدّل الصورة” اللي فوق الصورة.
                </p>
              </div>

              <aside className="rounded-[1.8rem] bg-[#fbf7f0] p-3 sm:p-4 lg:max-h-[620px] lg:overflow-auto">
                <div className="mb-3 rounded-[1.4rem] bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-[11px] font-black text-emerald-800">{product.badge}</span>
                    <span className="rounded-full bg-stone-100 px-3 py-1.5 text-[11px] font-black text-slate-700">{product.category}</span>
                    <span className="rounded-full bg-amber-100 px-3 py-1.5 text-[11px] font-black text-amber-700">
                      ★ {product.averageRating || 5} ({product.reviewCount})
                    </span>
                  </div>
                  <h1 className="mt-3 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">{product.name}</h1>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
                  <div className="mt-3 flex flex-wrap items-end gap-3">
                    <span className="text-3xl font-black text-slate-950">{formatPrice(product.price)}</span>
                    {product.oldPrice ? <span className="pb-1 text-sm font-bold text-slate-400 line-through">{formatPrice(product.oldPrice)}</span> : null}
                  </div>
                </div>

                <OrderForm
                  productSlug={product.slug}
                  productName={product.name}
                  productPrice={formatPrice(product.price)}
                  whatsappPhone={phone}
                  compact
                />
              </aside>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-6">
              <h2 className="text-2xl font-black text-slate-950">تفاصيل المنتج</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{product.description}</p>
              <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-2xl bg-stone-50 px-4 py-3">
                  <span className="font-bold text-slate-500">القياس</span>
                  <p className="mt-2 font-black text-slate-900">{product.dimensions}</p>
                </div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3">
                  <span className="font-bold text-slate-500">الماتريال</span>
                  <p className="mt-2 font-black text-slate-900">{product.material}</p>
                </div>
                <div className="rounded-2xl bg-stone-50 px-4 py-3">
                  <span className="font-bold text-slate-500">التوصيل</span>
                  <p className="mt-2 font-black text-slate-900">تأكيد عبر واتساب</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-6">
              <h2 className="text-2xl font-black text-slate-950">صور أخرى للمنتج</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {product.images.slice(1).map((image, index) => (
                  <ProductImageEditor
                    key={image.id}
                    id={image.id}
                    kind="product"
                    src={image.url}
                    alt={image.alt}
                    className="aspect-[4/3]"
                    priorityLabel={`صورة ${index + 2}`}
                  />
                ))}
              </div>
              <a
                href={`https://wa.me/${phone}?text=${directMessage}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700 transition hover:bg-emerald-100"
              >
                سول على هاد المنتج فالواتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black text-emerald-700">Reviews</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">تصاور الزبناء منين وصلهم المنتج</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              هاد section معمولة باش تحط فيها صور الناس اللي كومونداو من عندكم ووصلهم المنتج حتى للدار.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {(product.reviews || []).map((review) => (
              <article key={review.id} className="rounded-[2rem] bg-white p-4 shadow-xl shadow-slate-950/5">
                <ProductImageEditor
                  id={review.id}
                  kind="review"
                  src={review.imageUrl}
                  alt={`${review.customerName} review`}
                  className="aspect-[4/3]"
                  priorityLabel="صورة الزبون"
                />
                <div className="p-3">
                  <p className="text-sm font-bold text-amber-600">{"★".repeat(review.rating)}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">“{review.comment}”</p>
                  <p className="mt-4 text-sm font-black text-slate-950">{review.customerName} — {review.city}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-black text-slate-950">منتجات أخرى ممكن تعجبك</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
      <WhatsAppFloating />
    </main>
  );
}
