import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TCM deco | Store déco marocain",
    template: "%s | TCM deco",
  },
  description: "TCM deco: متجر ديكور فيه منتجات فخمة، طلب مباشر، مراجعات الزبناء، وتواصل عبر واتساب.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#fbf7f0] text-slate-900 antialiased">{children}</body>
    </html>
  );
}
