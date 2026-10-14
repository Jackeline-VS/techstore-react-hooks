import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
  }, [tema])

  const alternarTema = () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeContext.Provider value={{ tema, alternarTema }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)