/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2c3e50",
        success: "#16a34a",
        warning: "#facc15",
        danger: "#dc2626",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'lg': '0 4px 24px 0 rgba(44,62,80,0.08)',
      },
    },
  },
  plugins: [],
}
