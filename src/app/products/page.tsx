import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import { getProducts } from "@/lib/tcm-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Produits",
  description: "كل منتجات TCM deco مصنفين ومنظمين مع طلب مباشر عبر واتساب.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <main>
      <Header />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[3rem] bg-white p-6 shadow-2xl shadow-slate-950/5 sm:p-10">
            <p className="text-sm font-black text-emerald-700">Catalogue TCM deco</p>
            <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-4xl font-black text-slate-950 sm:text-6xl">كل المنتجات مرتبين</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  هنا غادي تلقى المنتجات ديال البراند. كل produit عندو page ديالو فيها الصور، التفاصيل، reviews، وفورم الطلب.
                </p>
              </div>
              <Link
                href="/#reviews"
                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
              >
                شوف آراء الزبناء
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <a key={category} href={`#${category}`} className="rounded-full bg-stone-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-800">
                  {category}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-12">
            {categories.map((category) => {
              const categoryProducts = products.filter((product) => product.category === category);
              return (
                <section key={category} id={category} className="scroll-mt-28">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Catégorie</p>
                      <h2 className="mt-2 text-3xl font-black text-slate-950">{category}</h2>
                    </div>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-600 shadow-sm">
                      {categoryProducts.length} produits
                    </span>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFloating />
    </main>
  );
}
