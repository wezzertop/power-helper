/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitar el modo oscuro basado en una clase en el elemento HTML
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en Fluent UI con toques modernos
        'primary-blue': '#0E7D81',
        'primary-blue-hover': '#005A9E',
        'primary-blue-light': '#15C5CB',
        'neutral-gray': {
          DEFAULT: '#605E5C', // Texto principal
          light: '#AEAEAE',   // Texto secundario, bordes
          lighter: '#F3F2F1', // Fondos claros
          dark: '#3B3A39',    // Elementos en modo claro
          darker: '#252423',  // Fondos oscuros
        },
        // Colores para modo oscuro
        'dark-bg': '#1E1E1E', // Fondo principal oscuro
        'dark-surface': '#2D2D2D', // Superficies como tarjetas, sidebar en modo oscuro
        'dark-text-primary': '#E1E1E1', // Texto principal en modo oscuro
        'dark-text-secondary': '#A0A0A0', // Texto secundario en modo oscuro
        'dark-border': '#4A4A4A', // Bordes en modo oscuro
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Lucida Console', 'monospace'],
      },
      boxShadow: {
        'header': '0 2px 4px 0 rgba(0, 0, 0, 0.10)',
        'sidebar': '2px 0 5px -2px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
}