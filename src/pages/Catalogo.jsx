function Catalogo() {
  return (
    <>
      <section className="hero">
        <span className="hero-tag">✨ Nuevos ingresos 2026</span>
        <h1>
          Tecnología que <span className="gradient-text">impulsa</span> tu día
        </h1>
        <p>Laptops, accesorios y gadgets seleccionados para estudiantes y profesionales.</p>
        <input className="search" placeholder="🔍 Buscar productos..." />
      </section>

      <div className="grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card">
            <div className="skeleton skeleton-img" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        ))}
      </div>
    </>
  )
}

export default Catalogo