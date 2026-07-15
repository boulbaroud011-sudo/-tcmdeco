import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductImageEditor } from "@/components/ProductImageEditor";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { getFeaturedProducts, getLatestReviews, whatsappNumber } from "@/lib/tcm-data";

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
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-sm backdrop-blur">
            <span className="grid size-7 place-items-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
            TCM deco — جودة وفخامة توصلك لدارك
          </div>
          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            أناقة وفخامة لكل زاوية
          </h1>
          <p dir="rtl" className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">
            اكتشف تشكيلة مختارة من الديكورات والإكسسوارات الحديدية العصرية، بتصاميم راقية وجودة عالية، باش تضيف لمسة ديال الأناقة والفخامة لكل زاوية فدارك.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-1 hover:bg-slate-800">
              شوف المنتجات
            </Link>
            <a href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-emerald-900/20 transition hover:-translate-y-1 hover:bg-emerald-700">
              سولنا فالواتساب
            </a>
          </div>
          <dl className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-3">
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
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "دفع عند الاستلام",
              text: "خلّص فقط منين توصلك السلعة لدارك.",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-7">
                  <path d="M3 12h4l2-2 3 3 3-3 3 3h3" />
                  <path d="M4 12v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6" />
                  <path d="M8 12V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5" />
                </svg>
              ),
            },
            {
              title: "توصيل مجاني",
              text: "التوصيل مجاني لجميع الطلبات فالمغرب كامل.",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-7">
                  <path d="M3 6h11v9H3z" />
                  <path d="M14 9h4l3 3v3h-7" />
                  <circle cx="7" cy="18" r="1.6" />
                  <circle cx="17" cy="18" r="1.6" />
                </svg>
              ),
            },
            {
              title: "خدمة 24/24",
              text: "حنا هنا فأي وقت باش نجاوبوك.",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-7">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              ),
            },
            {
              title: "7/7 أيام",
              text: "خدمة متاحة كل أيام الأسبوع.",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-7">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                  <path d="M9 15l2 2 4-4" />
                </svg>
              ),
            },
          ].map((feature) => (
            <div key={feature.title} className="flex flex-col items-center rounded-[2rem] border border-emerald-100 bg-white p-6 text-center shadow-sm">
              <span className="grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-lg font-black text-slate-950">{feature.title}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{feature.text}</p>
            128 |             </div>
  129 |      
> 130 |           <div className="max-w-2xl">
      |                ^^^^^^^^^
  131 |             <p className="text-sm font-black text-emerald-700">Reviews dyal clients</p>
  132 |             <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">ناس كومون...
  133 |           </div> </div>
     
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
