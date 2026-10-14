import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const URL = 'https://dummyjson.com/products?limit=0'
const CATEGORIAS = ['laptops', 'smartphones', 'tablets', 'mobile-accessories']

/* ANTES (.then, sin cleanup):
useEffect(() => {
  fetch(URL).then(res => res.json()).then(data => setProductos(data.products))
}, [])
*/

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    // useEffect no puede ser async: debe devolver la función de limpieza
    const cargarProductos = async () => {
      try {
        setCargando(true)
        const res = await fetch(URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const data = await res.json()
        setProductos(data.products.filter((p) => CATEGORIAS.includes(p.category)))
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message) // AbortError = cancelación del cleanup
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargarProductos()
    // CLEANUP: StrictMode monta → desmonta → monta; este abort cancela la 1ra petición
    return () => controller.abort()
  }, []) // [] = sin dependencias reactivas; NO significa "una sola vez" en StrictMode

  return (
    <>
      <section className="hero">
        <span className="hero-tag">✨ Nuevos ingresos 2026</span>
        <h1>Tecnología que <span className="gradient-text">impulsa</span> tu día</h1>
        <p>Laptops, smartphones, tablets y accesorios seleccionados para ti.</p>
        <input className="search" placeholder="🔍 Buscar productos..." />
      </section>

      {error && <div className="error-box">⚠️ {error}</div>}
      {!error && !cargando && <p className="results-count">{productos.length} productos</p>}

      <div className="grid">
        {cargando
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton skeleton-img" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line short" />
              </div>
            ))
          : productos.map((p) => <ProductCard key={p.id} producto={p} />)}
      </div>
    </>
  )
}

export default Catalogo