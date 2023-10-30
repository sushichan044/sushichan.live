import 'client-only'

import { useEffect, useState } from 'react'

const useClientTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const setDark = () => setTheme('dark')
  const setLight = () => setTheme('light')
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', onChange)

    // set initial value
    setTheme(mediaQuery.matches ? 'dark' : 'light')
    // clean up
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return { theme, setDark, setLight, toggleTheme }
}

export default useClientTheme
