import { whatsappNumber } from "@/lib/tcm-data";

export function WhatsAppFloating() {
  const phone = whatsappNumber();
  const message = encodeURIComponent("Salam TCM deco, bghit nsowal 3la commande.");

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-2xl shadow-emerald-950/30 transition hover:-translate-y-1 hover:bg-emerald-700"
      aria-label="تواصل عبر واتساب"
    >
      <span className="grid size-6 place-items-center rounded-full bg-white text-emerald-700">☎</span>
      واتساب
    </a>
  );
}
