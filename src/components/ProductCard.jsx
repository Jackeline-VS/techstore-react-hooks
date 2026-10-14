import { memo } from 'react'
import { useCart } from '../context/CartContext'

function ProductCard({ producto }) {
  const { agregar } = useCart()

  return (
    <article className="card">
      <div className="card-img">
        <img src={producto.thumbnail} alt={producto.title} loading="lazy" />
      </div>
      <span className="card-cat">{producto.category}</span>
      <h3 className="card-title">{producto.title}</h3>
      <div className="card-rating">⭐ {producto.rating.toFixed(1)}</div>
      <div className="card-footer">
        <span className="price gradient-text">${producto.price}</span>
        <button className="btn btn-primary btn-sm" onClick={() => agregar(producto)}>
          + Agregar
        </button>
      </div>
    </article>
  )
}

// memo (Paso 4): no se re-renderiza si sus props no cambian
export default memo(ProductCard)