import { useEffect, useState } from 'react'

// Hook personalizado: encapsula fetch + estados + cleanup
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const cargar = async () => {
      try {
        setCargando(true)
        setError(null)
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`Error ${res.status}`)
        setData(await res.json())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }
    cargar()
    return () => controller.abort()
  }, [url])

  return { data, cargando, error }
}