"use client";

import { useMemo, useState } from "react";

type OrderFormProps = {
  productSlug: string;
  productName: string;
  productPrice: string;
  whatsappPhone: string;
  compact?: boolean;
};

type OrderPayload = {
  customerName: string;
  phone: string;
  address: string;
  notes: string;
};

const initialForm: OrderPayload = {
  customerName: "",
  phone: "",
  address: "",
  notes: "",
};

export function OrderForm({ productSlug, productName, productPrice, whatsappPhone, compact = false }: OrderFormProps) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const inputClass = compact
    ? "rounded-xl border border-slate-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
    : "rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10";
  const labelClass = compact ? "grid gap-1.5 text-xs font-black text-slate-700" : "grid gap-2 text-sm font-bold text-slate-700";

  const fallbackWhatsAppUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Salam TCM deco, bghit ncommander:\nProduit: ${productName}\nPrix: ${productPrice}\nNom: ${form.customerName}\nTéléphone: ${form.phone}\nAdresse: ${form.address}\nNotes: ${form.notes || "-"}`,
    );
    return `https://wa.me/${whatsappPhone}?text=${text}`;
  }, [form, productName, productPrice, whatsappPhone]);

  function updateField(field: keyof OrderPayload, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productSlug }),
      });

      const payload = (await response.json()) as { whatsappUrl?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "وقع مشكل فالكوموند.");
      }

      setStatus("success");
      setMessage("تسجلات الكوموند. غادي نفتح ليك واتساب دابا باش تكمل التأكيد.");
      window.open(payload.whatsappUrl || fallbackWhatsAppUrl, "_blank", "noopener,noreferrer");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "وقع مشكل فالكوموند.");
    }
  }

  return (
    <form
      onSubmit={submitOrder}
      className={`rounded-[1.6rem] border border-emerald-900/10 bg-white shadow-xl shadow-slate-950/10 ${
        compact ? "p-3.5 sm:p-4" : "p-5 sm:p-7"
      }`}
    >
      <div className={compact ? "mb-3" : ""}>
        <p className={compact ? "text-xs font-black text-emerald-700" : "text-sm font-black text-emerald-700"}>كوموندي دابا</p>
        <h2 className={`${compact ? "mt-1 text-lg" : "mt-2 text-2xl"} font-black text-slate-950`}>
          معلومات الطلب
        </h2>
        {!compact && (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            الاسم، النمرة، العنوان — ومن بعد زر أخضر باش تتأكد الكوموند مباشرة.
          </p>
        )}
      </div>

      <div className={`${compact ? "gap-2.5" : "mt-6 gap-4"} grid`}>
        <label className={labelClass}>
          الاسم الكامل
          <input
            required
            value={form.customerName}
            onChange={(event) => updateField("customerName", event.target.value)}
            className={inputClass}
            placeholder="الاسم"
          />
        </label>
        <label className={labelClass}>
          النمرة / téléphone
          <input
            required
            inputMode="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={inputClass}
            placeholder="06 xx xx xx xx"
          />
        </label>
        <label className={labelClass}>
          العنوان
          <textarea
            required
            rows={compact ? 2 : 3}
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="المدينة، الحي، العنوان..."
          />
        </label>
        {compact ? (
          <details className="rounded-xl bg-stone-50 px-3 py-2 text-xs font-bold text-slate-600">
            <summary className="cursor-pointer text-slate-700">زيد ملاحظة اختيارية</summary>
            <textarea
              rows={1}
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              className={`${inputClass} mt-2 w-full resize-none bg-white`}
              placeholder="اللون، القياس، وقت الاتصال..."
            />
          </details>
        ) : (
          <label className={labelClass}>
            ملاحظات اختيارية
            <textarea
              rows={2}
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="اللون، القياس، وقت الاتصال..."
            />
          </label>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full rounded-2xl bg-emerald-600 px-5 font-black text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-70 ${
          compact ? "mt-3 py-2.5 text-sm" : "mt-6 py-4 text-base"
        }`}
      >
        {status === "loading" ? "كيصيفط..." : "كوموندي عبر واتساب"}
      </button>

      <a
        href={fallbackWhatsAppUrl}
        target="_blank"
        rel="noreferrer"
        className={`mt-2 flex justify-center rounded-2xl border border-emerald-200 font-black text-emerald-700 transition hover:bg-emerald-50 ${
          compact ? "px-4 py-2 text-xs" : "px-5 py-3 text-sm"
        }`}
      >
        غير بغيت نسول فالواتساب
      </a>

      {message && (
        <p className={`mt-3 rounded-2xl px-3 py-2 text-xs font-bold ${status === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
