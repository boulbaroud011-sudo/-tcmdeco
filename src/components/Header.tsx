import Link from "next/link";
import { Logo } from "@/components/Logo";
import { whatsappNumber } from "@/lib/tcm-data";

export function Header() {
  const phone = whatsappNumber();
  const message = encodeURIComponent("Salam TCM deco, bghit nsowal 3la produits dyalkom.");

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#fbf7f0]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="TCM deco home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
          <Link className="transition hover:text-slate-950" href="/">
            الرئيسية
          </Link>
          <Link className="transition hover:text-slate-950" href="/products">
            المنتجات
          </Link>
          <a className="transition hover:text-slate-950" href="#reviews">
            آراء الزبناء
          </a>
        </nav>
        <a
          href={`https://wa.me/${phone}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
        >
          واتساب
        </a>
      </div>
    </header>
  );
}
