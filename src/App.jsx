import { useState } from 'react'
import Navbar from './components/Navbar'
import Carrito from './pages/Carrito'
import Catalogo from './pages/Catalogo'
import Checkout from './pages/Checkout'
import RenderLab from './pages/RenderLab'

function App() {
  const [pagina, setPagina] = useState('catalogo')

  return (
    <>
      <Navbar pagina={pagina} onNavegar={setPagina} />

      <main className="container">
        {pagina === 'catalogo' && <Catalogo />}
        {pagina === 'carrito' && <Carrito onNavegar={setPagina} />}
        {pagina === 'checkout' && <Checkout />}
        {pagina === 'lab' && <RenderLab />}
      </main>

      <footer className="footer">
        ⚡ TechStore · Práctica Semana 07 — React Hooks · UNCP
      </footer>
    </>
  )
}

export default App