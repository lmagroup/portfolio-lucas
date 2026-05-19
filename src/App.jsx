function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Skip link accessibilité */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      <main id="main-content" className="container-main py-16">
        {/* Test palette brand */}
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Design System — Test tokens</h1>
        <p className="text-lg text-neutral-500 mb-12 font-mono">
          Vite 5 · React 18 · TailwindCSS 3
        </p>

        {/* Palette brand */}
        <section className="mb-10" aria-label="Palette brand">
          <h2 className="text-xl font-semibold text-neutral-700 mb-4">Palette brand</h2>
          <div className="flex flex-wrap gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
              <div key={shade} className="flex flex-col items-center gap-1">
                <div
                  className={`w-12 h-12 rounded-md shadow-soft bg-brand-${shade}`}
                  aria-hidden="true"
                />
                <span className="text-xs text-neutral-500">{shade}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Accent */}
        <section className="mb-10" aria-label="Couleur accent">
          <h2 className="text-xl font-semibold text-neutral-700 mb-4">Accent</h2>
          <div className="w-12 h-12 rounded-md shadow-soft bg-accent-500" aria-hidden="true" />
        </section>

        {/* Ombres */}
        <section className="mb-10" aria-label="Box shadows">
          <h2 className="text-xl font-semibold text-neutral-700 mb-4">Ombres</h2>
          <div className="flex flex-wrap gap-6">
            {['shadow-soft', 'shadow-card', 'shadow-pop'].map((s) => (
              <div
                key={s}
                className={`w-24 h-16 rounded-lg bg-neutral-0 ${s} flex items-center justify-center`}
              >
                <span className="text-xs text-neutral-500">{s.replace('shadow-', '')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Typographie */}
        <section className="mb-10" aria-label="Typographie">
          <h2 className="text-xl font-semibold text-neutral-700 mb-4">Typographie Inter</h2>
          <p className="text-6xl font-bold text-neutral-900 leading-none mb-2">text-6xl / 60px</p>
          <p className="text-5xl font-bold text-neutral-900 mb-2">text-5xl / 48px</p>
          <p className="text-4xl font-semibold text-neutral-800 mb-2">text-4xl / 36px</p>
          <p className="text-3xl font-semibold text-neutral-800 mb-2">text-3xl / 30px</p>
          <p className="text-2xl text-neutral-700 mb-2">text-2xl / 24px</p>
          <p className="text-xl text-neutral-700 mb-2">text-xl / 20px</p>
          <p className="text-base text-neutral-600 mb-2">text-base / 16px — corps du texte</p>
          <p className="text-sm text-neutral-500 mb-2">text-sm / 14px — métadonnées</p>
          <p className="text-xs text-neutral-400">text-xs / 12px — captions</p>
        </section>

        {/* Mono */}
        <section aria-label="Typographie mono">
          <h2 className="text-xl font-semibold text-neutral-700 mb-4">JetBrains Mono</h2>
          <p className="font-mono text-base text-brand-600 bg-brand-50 px-4 py-2 rounded-md inline-block">
            const portfolio = &#123; quality: &apos;premium&apos; &#125;
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
