import { useState } from 'react'

function Hijo({ texto }) {
  return (
    <div className="lab-child">
      👶 Componente hijo · prop: <strong>{texto}</strong>
    </div>
  )
}

function RenderLab() {
  const [contador, setContador] = useState(0)

  // Batching: 3 actualizaciones en un mismo evento = 1 solo render
  const sumarTres = () => {
    setContador((c) => c + 1)
    setContador((c) => c + 1)
    setContador((c) => c + 1)
  }

  return (
    <section>
      <h2 className="page-title">🧪 Laboratorio de render</h2>
      <p className="page-sub">Paso 1: observa en el Profiler cuántos commits genera un solo clic.</p>

      <div className="panel lab">
        <div className="lab-counter gradient-text">{contador}</div>
        <button className="btn btn-primary" onClick={sumarTres}>
          +3 (tres setState en un clic)
        </button>
        <Hijo texto="valor fijo" />
      </div>
    </section>
  )
}

export default RenderLab