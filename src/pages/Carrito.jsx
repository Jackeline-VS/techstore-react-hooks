function Carrito() {
  return (
    <section>
      <h2 className="page-title">🛒 Tu carrito</h2>
      <p className="page-sub">Revisa tus productos antes de pagar.</p>
      <div className="empty">
        <span className="empty-icon">🛍️</span>
        <p>Tu carrito está vacío</p>
        <small>Agrega productos desde el catálogo</small>
      </div>
    </section>
  )
}

export default Carrito