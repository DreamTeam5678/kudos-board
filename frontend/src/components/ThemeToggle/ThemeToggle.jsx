import React, { useContext } from "react"
import { ThemeContext } from "../../context/ThemeContext"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const handleClick = () => {
    console.log("Current theme:", theme)
    toggleTheme()
    console.log("New data-theme:", document.documentElement.getAttribute("data-theme"))
  }

  return (
    <button onClick={handleClick} className="theme-toggle-btn">
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  )
}