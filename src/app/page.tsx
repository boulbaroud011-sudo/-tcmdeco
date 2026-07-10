import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { ProductImageEditor } from "@/components/ProductImageEditor";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { formatPrice, getFeaturedProducts, getLatestReviews, whatsappNumber } from "@/lib/tcm-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProducts, latestReviews] = await Promise.all([getFeaturedProducts(), getLatestReviews(3)]);
  const phone = whatsappNumber();
  const message = encodeURIComponent("Salam TCM deco, bghit catalogue dyal produits déco.");

  return (
    <main>
      <Header />
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-sm backdrop-blur">
              <span className="grid size-7 place-items-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
              TCM deco — ديكور يوصل حتى لدارك
            </div>
            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
         أناقة وفخامة لكل زاوية
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">
             .اكتشف تشكيلة مختارة من الديكورات والإكسسوارات الحديدية العصرية، بتصاميم راقية وجودة عالية، باش تضيف لمسة ديال الأناقة والفخامة لكل زاوية فدارك.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-1 hover:bg-slate-800"
              >
                شوف المنتجات
              </Link>
              <a
                href={`https://wa.me/${phone}?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-emerald-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-emerald-900/20 transition hover:-translate-y-1 hover:bg-emerald-700"
              >
                سولنا فالواتساب
              </a>
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["+600", "كوموندات"],
                ["4.9/5", "تقييم"],
                ["24h", "رد سريع"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl bg-white/80 p-4 text-center shadow-sm backdrop-blur">
                  <dt className="text-2xl font-black text-slate-950">{value}</dt>
                  <dd className="mt-1 text-xs font-bold text-slate-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 -z-10 size-44 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="rounded-[3rem] border border-black/5 bg-white p-6 shadow-2xl shadow-slate-950/10">
              <div className="rounded-[2.5rem] bg-[#fbf7f0] p-8">
                <div className="mx-auto flex max-w-sm justify-center rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-950/5">
                  <Logo />
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {featuredProducts.slice(0, 2).map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-1">
                      <p className="text-xs font-black text-emerald-700">{product.badge}</p>
                      <h3 className="mt-2 font-black text-slate-950">{product.name}</h3>
                      <p className="mt-2 text-sm font-bold text-slate-500">{formatPrice(product.price)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black text-emerald-700">Produits populaires</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">منتجات مميزة من TCM deco</h2>
            </div>
            <Link href="/products" className="font-black text-slate-950 underline decoration-emerald-500 decoration-4 underline-offset-8">
              كل المنتجات
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-4">
            {[
              ["01", "اختار المنتج", "دخل للمنتج وشوف الصور، التفاصيل والريفيوهات."],
              ["02", "عمر الخانات", "كتب الاسم، النمرة، والعنوان في form ديال الطلب."],
              ["03", "كوموندي", "ضغط على الزر الأخضر وغادي يتفتح واتساب بتفاصيل الطلب."],
              ["04", "توصل وتصور", "منين يوصل المنتج صيفط لينا صورتك ونزيدوها فالريفيوهات."],
            ].map(([step, title, text]) => (
              <div key={step} className="rounded-[2rem] bg-white/8 p-5 ring-1 ring-white/10">
                <span className="text-sm font-black text-emerald-300">{step}</span>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black text-emerald-700">Reviews dyal clients</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">ناس كومونداو، وصلهم المنتج، وصوّروه لينا</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latestReviews.map((review) => (
              <article key={review.id} className="rounded-[2rem] bg-white p-4 shadow-xl shadow-slate-950/5">
                <ProductImageEditor
                  id={review.id}
                  kind="review"
                  src={review.imageUrl}
                  alt={`Review ${review.customerName}`}
                  className="aspect-[4/3]"
                  priorityLabel="Review"
                />
                <div className="p-3">
                  <p className="text-sm font-bold text-amber-600">{"★".repeat(review.rating)}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">“{review.comment}”</p>
                  <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                    <span className="font-black text-slate-950">{review.customerName} - {review.city}</span>
                    <Link href={`/products/${review.productSlug}`} className="font-black text-emerald-700">
                      {review.productName}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloating />
    </main>
  );
}
