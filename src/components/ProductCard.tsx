import Link from "next/link";
import { ProductImageEditor } from "@/components/ProductImageEditor";
import { formatPrice, type ProductWithImages } from "@/lib/tcm-data";

export function ProductCard({ product }: { product: ProductWithImages }) {
  const firstImage = product.images[0];

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-xl shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10">
      {firstImage ? (
        <ProductImageEditor
          id={firstImage.id}
          kind="product"
          src={firstImage.url}
          alt={firstImage.alt}
          className="aspect-[4/3] rounded-none"
          priorityLabel={product.badge}
        />
      ) : (
        <div className="aspect-[4/3] bg-stone-100" />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black text-emerald-700">{product.category}</p>
            <h3 className="mt-2 text-xl font-black text-slate-950">{product.name}</h3>
          </div>
          <div className="text-left">
            <p className="text-lg font-black text-slate-950">{formatPrice(product.price)}</p>
            {product.oldPrice ? <p className="text-xs font-bold text-slate-400 line-through">{formatPrice(product.oldPrice)}</p> : null}
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-amber-600">★ {product.averageRating || 5} ({product.reviewCount})</span>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
          >
            شوف المنتج
          </Link>
        </div>
      </div>
    </article>
  );
}
