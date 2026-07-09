export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-slate-950">
      <div className="relative grid size-14 place-items-center rounded-full border-2 border-slate-900 bg-white shadow-sm">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-serif text-3xl leading-none">T</span>
        <span className="font-serif text-3xl leading-none tracking-[-0.18em]">CM</span>
      </div>
      {!compact && (
        <div className="leading-none">
          <p className="font-serif text-2xl tracking-[0.22em]">TCM</p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.45em] text-slate-500">deco</p>
        </div>
      )}
    </div>
  );
}
