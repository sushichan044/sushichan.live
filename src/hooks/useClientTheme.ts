import "client-only"
import { useCallback, useEffect, useState } from "react"

const useClientTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light")

  const setDark = useCallback(() => setTheme("dark"), [])
  const setLight = useCallback(() => setTheme("light"), [])
  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme],
  )

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", onChange)

    // set initial value
    setTheme(mediaQuery.matches ? "dark" : "light")
    // clean up
    return () => mediaQuery.removeEventListener("change", onChange)
  }, [])

  return { setDark, setLight, theme, toggleTheme }
}

export default useClientTheme
