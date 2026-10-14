import { useState } from 'react'

// Hook personalizado: maneja valores, cambios, validación y reset de un formulario
export function useForm(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValores((v) => ({ ...v, [name]: value }))
  }

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault()
    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length === 0) onSubmit(valores)
  }

  const reset = () => {
    setValores(valoresIniciales)
    setErrores({})
  }

  return { valores, errores, handleChange, handleSubmit, reset }
}