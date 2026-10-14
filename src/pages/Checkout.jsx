import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useForm } from '../hooks/useForm'

const validar = (v) => {
  const e = {}
  if (!v.nombre.trim()) e.nombre = 'Ingresa tu nombre'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Email no válido'
  if (v.direccion.trim().length < 5) e.direccion = 'Dirección muy corta'
  return e
}

function Checkout() {
  const { items, total, vaciar } = useCart()
  const nombreRef = useRef(null)
  const [pedidoOk, setPedidoOk] = useState(false)
  const { valores, errores, handleChange, handleSubmit, reset } = useForm(
    { nombre: '', email: '', direccion: '' },
    validar
  )

  useEffect(() => {
    nombreRef.current?.focus() // useRef: foco sin re-render
  }, [])

  const procesar = () => {
    setPedidoOk(true)
    vaciar()
    reset()
  }

  // Reglas de Hooks: este return condicional va DESPUÉS de todos los hooks
  if (pedidoOk) {
    return (
      <div className="panel success">
        <span className="success-icon">🎉</span>
        <h2 className="page-title">¡Pedido confirmado!</h2>
        <p className="page-sub">Gracias por comprar en TechStore.</p>
      </div>
    )
  }

  return (
    <section>
      <h2 className="page-title">💳 Finalizar compra</h2>
      <p className="page-sub">Completa tus datos para procesar el pedido.</p>

      <div className="checkout">
        <form className="panel form" onSubmit={handleSubmit(procesar)} noValidate>
          <div className="field">
            <label>Nombre completo</label>
            <input ref={nombreRef} name="nombre" value={valores.nombre} onChange={handleChange} placeholder="Ej. Ana Torres" />
            {errores.nombre && <small className="field-error">{errores.nombre}</small>}
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={valores.email} onChange={handleChange} placeholder="ana@correo.com" />
            {errores.email && <small className="field-error">{errores.email}</small>}
          </div>
          <div className="field">
            <label>Dirección de envío</label>
            <textarea name="direccion" rows="3" value={valores.direccion} onChange={handleChange} placeholder="Av. Ejemplo 123, Huancayo" />
            {errores.direccion && <small className="field-error">{errores.direccion}</small>}
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={items.length === 0}>
            {items.length === 0 ? 'Agrega productos al carrito' : '✅ Procesar pago'}
          </button>
        </form>

        <aside className="panel summary">
          <h3>Resumen del pedido</h3>
          {items.map((i) => (
            <div key={i.id} className="mini-item">
              <span>{i.cantidad}× {i.title}</span>
              <span>${(i.price * i.cantidad).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Envío</span><span className="free">Gratis</span></div>
          <div className="summary-row total">
            <span>Total</span>
            <span className="gradient-text">${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout