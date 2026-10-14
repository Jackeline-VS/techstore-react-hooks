function Checkout() {
  return (
    <section>
      <h2 className="page-title">💳 Finalizar compra</h2>
      <p className="page-sub">Completa tus datos para procesar el pedido.</p>

      <div className="checkout">
        <form className="panel form">
          <div className="field">
            <label>Nombre completo</label>
            <input placeholder="Ej. Ana Torres" />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="ana@correo.com" />
          </div>
          <div className="field">
            <label>Dirección de envío</label>
            <textarea rows="3" placeholder="Av. Ejemplo 123, Huancayo" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            ✅ Procesar pago
          </button>
        </form>

        <aside className="panel summary">
          <h3>Resumen del pedido</h3>
          <div className="summary-row"><span>Subtotal</span><span>$0.00</span></div>
          <div className="summary-row"><span>Envío</span><span className="free">Gratis</span></div>
          <div className="summary-row total"><span>Total</span><span>$0.00</span></div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout