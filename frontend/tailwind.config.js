/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'real-red': '#e60012',
        'real-dark': '#1a1a1a',
        'real-gray': '#f5f5f5',
        "real.gr-blue" : "#0693e3"
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 