import { createContext, useCallback, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  // useCallback (Paso 4): funciones estables, no se recrean en cada render
  const agregar = useCallback((producto) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id)
      if (existe) {
        return prev.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i))
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }, [])

  const quitar = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), [])
  const vaciar = useCallback(() => setItems([]), [])

  const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0)
  const total = items.reduce((acc, i) => acc + i.price * i.cantidad, 0)

  return (
    <CartContext.Provider value={{ items, agregar, quitar, vaciar, cantidadTotal, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)