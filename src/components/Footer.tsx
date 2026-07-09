import Link from "next/link";
import { Logo } from "@/components/Logo";
import { whatsappNumber } from "@/lib/tcm-data";

export function Footer() {
  const phone = whatsappNumber();
  const message = encodeURIComponent("Salam TCM deco, bghit ndir commande aw nsowal 3la chi produit.");

  return (
    <footer className="border-t border-black/5 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-3">
            <Logo />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            TCM deco متجر ديكور مغربي: منتجات مختارة، طلب سهل، وتواصل مباشر عبر واتساب حتى توصل الكوموند لدارك.
          </p>
        </div>
        <div>
          <h3 className="font-bold">روابط سريعة</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/">الرئيسية</Link>
            <Link href="/products">كل المنتجات</Link>
            <a href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noreferrer">
              طلب عبر واتساب
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold">معلومة مهمة</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            باش تبدّل أي صورة فالموقع، دخل لصفحة المنتج وضغط على زر “بدّل الصورة”. الصورة كتتسجل فقاعدة البيانات مباشرة.
          </p>
        </div>
      </div>
    </footer>
  );
}
