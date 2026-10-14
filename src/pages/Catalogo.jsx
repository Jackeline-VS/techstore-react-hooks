import { useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useFetch } from '../hooks/useFetch'

const URL = 'https://dummyjson.com/products?limit=0'
const CATEGORIAS = ['laptops', 'smartphones', 'tablets', 'mobile-accessories']

function Catalogo() {
  // Paso 5: toda la lógica de fetch ahora vive en useFetch (reutilizable)
  const { data, cargando, error } = useFetch(URL)
  const productos = useMemo(
    () => (data ? data.products.filter((p) => CATEGORIAS.includes(p.category)) : []),
    [data]
  )
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const inputRef = useRef(null)
  
  // useRef: foco automático en el buscador al entrar
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // useMemo: el filtro solo se recalcula si cambian productos, busqueda o categoria
  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim()
    return productos.filter(
      (p) =>
        (categoria === 'todas' || p.category === categoria) &&
        p.title.toLowerCase().includes(texto)
    )
  }, [productos, busqueda, categoria])

  return (
    <>
      <section className="hero">
        <span className="hero-tag">✨ Nuevos ingresos 2026</span>
        <h1>Tecnología que <span className="gradient-text">impulsa</span> tu día</h1>
        <p>Laptops, smartphones, tablets y accesorios seleccionados para ti.</p>
        <input
          ref={inputRef}
          className="search"
          placeholder="🔍 Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="chips">
          {['todas', ...CATEGORIAS].map((c) => (
            <button
              key={c}
              className={`chip ${categoria === c ? 'active' : ''}`}
              onClick={() => setCategoria(c)}
            >
              {c.replace('-', ' ')}
            </button>
          ))}
        </div>
      </section>

      {error && <div className="error-box">⚠️ {error}</div>}
      {!error && !cargando && (
        <p className="results-count">{productosFiltrados.length} productos encontrados</p>
      )}

      <div className="grid">
        {cargando
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton skeleton-img" />
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line short" />
              </div>
            ))
          : productosFiltrados.map((p) => <ProductCard key={p.id} producto={p} />)}
      </div>
    </>
  )
}

export default Catalogo