import { useCart } from '../context/CartContext'

function Carrito({ onNavegar }) {
  const { items, quitar, vaciar, total } = useCart()

  if (items.length === 0) {
    return (
      <section>
        <h2 className="page-title">🛒 Tu carrito</h2>
        <div className="empty">
          <span className="empty-icon">🛍️</span>
          <p>Tu carrito está vacío</p>
          <small>Agrega productos desde el catálogo</small>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h2 className="page-title">🛒 Tu carrito</h2>
      <p className="page-sub">{items.length} producto(s) seleccionados.</p>
      <div className="cart-list">
        {items.map((i) => (
          <div key={i.id} className="cart-item panel">
            <img src={i.thumbnail} alt={i.title} />
            <div className="cart-info">
              <h4>{i.title}</h4>
              <span>{i.cantidad} × ${i.price}</span>
            </div>
            <strong className="gradient-text">${(i.price * i.cantidad).toFixed(2)}</strong>
            <button className="btn-icon" onClick={() => quitar(i.id)}>🗑️</button>
          </div>
        ))}
      </div>
      <div className="cart-total panel">
        <span>Total: <strong className="gradient-text">${total.toFixed(2)}</strong></span>
        <div className="cart-actions">
          <button className="btn btn-ghost" onClick={vaciar}>Vaciar</button>
          <button className="btn btn-primary" onClick={() => onNavegar('checkout')}>Ir a pagar →</button>
        </div>
      </div>
    </section>
  )
}

export default Carrito