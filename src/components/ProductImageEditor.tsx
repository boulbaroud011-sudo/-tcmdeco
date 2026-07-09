"use client";

import { useRef, useState } from "react";

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
  id,
  kind,
  src,
  alt,
  className = "aspect-[4/3]",
  imageClassName = "object-cover",
  buttonLabel = "بدّل الصورة",
  priorityLabel,
}: ProductImageEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function saveImage(imageUrl: string) {
    setIsSaving(true);
    setMessage(null);

    const response = await fetch("/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, kind, imageUrl }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(payload?.error || "تعذر حفظ الصورة");
    }
  }

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setMessage("اختار غير الصور من فضلك.");
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      setMessage("الصورة كبيرة بزاف. نقص الحجم لأقل من 2.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result !== "string") {
        setMessage("صيغة الصورة غير مدعومة.");
        return;
      }

      const previousSrc = currentSrc;
      setCurrentSrc(reader.result);

      try {
        await saveImage(reader.result);
        setMessage("تبدلات الصورة وتخزّنت بنجاح.");
      } catch (error) {
        setCurrentSrc(previousSrc);
        setMessage(error instanceof Error ? error.message : "وقع مشكل فالحفظ.");
      } finally {
        setIsSaving(false);
      }
    };
    reader.onerror = () => setMessage("ما قدرناش نقراو الصورة.");
    reader.readAsDataURL(file);
  }

  return (
    <div className={`group relative overflow-hidden rounded-[2rem] bg-stone-100 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={currentSrc} alt={alt} className={`h-full w-full ${imageClassName}`} />
      <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-3">
        {priorityLabel ? (
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-800 shadow-sm backdrop-blur">
            {priorityLabel}
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isSaving}
          className="rounded-full bg-slate-950/85 px-3 py-2 text-xs font-black text-white shadow-lg backdrop-blur transition hover:bg-slate-900 disabled:cursor-wait disabled:opacity-70"
        >
          {isSaving ? "كيحفظ..." : buttonLabel}
        </button>
      </div>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
          event.currentTarget.value = "";
        }}
      />
      {message && (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 px-4 py-3 text-xs font-bold text-slate-700 shadow-xl backdrop-blur">
          {message}
        </div>
      )}
    </div>
  );
}
