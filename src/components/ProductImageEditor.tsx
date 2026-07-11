type EditableKind = "product" | "review";

type ProductImageEditorProps = {
  id: number;
  kind: EditableKind;
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  buttonLabel?: string;
  priorityLabel?: string;
};

export function ProductImageEditor({
  src,
  alt,
  className = "aspect-[4/3]",
  imageClassName = "object-cover",
  priorityLabel,
}: ProductImageEditorProps) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] bg-stone-100 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`h-full w-full ${imageClassName}`} />
      {priorityLabel ? (
        <div className="absolute inset-x-3 top-3 flex items-start">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-800 shadow-sm backdrop-blur">
            {priorityLabel}
          </span>
        </div>
      ) : null}
    </div>
  );
}
