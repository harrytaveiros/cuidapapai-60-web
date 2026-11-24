/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#126E51',
        secondary: '#FBBF24',
        background: '#F8FAFC',
        card: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
