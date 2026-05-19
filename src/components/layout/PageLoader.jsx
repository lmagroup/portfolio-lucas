export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true">
      <div
        className="w-8 h-8 rounded-full border-2 border-brand-200 border-t-brand-500 animate-spin"
        role="status"
        aria-label="Chargement…"
      />
    </div>
  )
}
