import React, { useEffect, useState } from 'react'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDark ? (
        <span >🌞</span>
      ) : (
        <span >🌙</span>
      )}
    </button>
  )
}
