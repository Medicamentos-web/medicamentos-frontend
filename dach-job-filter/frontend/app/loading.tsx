export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4 py-20">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-teal-200 border-t-teal-600" />
        </div>
        <div className="max-w-md text-center">
          <p className="font-semibold text-slate-900">Preparando la página…</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Si ves solo esto mucho rato: para Next, en{" "}
            <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
              frontend
            </code>{" "}
            ejecuta{" "}
            <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
              npm run clean
            </code>{" "}
            y reinicia.
          </p>
        </div>
      </div>
    </div>
  );
}
