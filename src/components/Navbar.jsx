const enlaces = [
  { id: 'catalogo', label: 'Catálogo', icono: '🛍️' },
  { id: 'carrito', label: 'Carrito', icono: '🛒' },
  { id: 'checkout', label: 'Checkout', icono: '💳' },
  { id: 'lab', label: 'Lab', icono: '🧪' },
]

function Navbar({ pagina, onNavegar }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo" onClick={() => onNavegar('catalogo')}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">TechStore</span>
        </div>

        <nav className="nav-links">
          {enlaces.map((e) => (
            <button
              key={e.id}
              className={`nav-link ${pagina === e.id ? 'active' : ''}`}
              onClick={() => onNavegar(e.id)}
            >
              <span>{e.icono}</span> {e.label}
              {e.id === 'carrito' && <span className="badge">0</span>}
            </button>
          ))}
        </nav>

        {/* Funcionará en el Paso 3 con useContext */}
        <button className="theme-toggle" title="Cambiar tema">🌙</button>
      </div>
    </header>
  )
}

export default Navbar