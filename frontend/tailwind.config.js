/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#6C5CE7',
          600: '#635BFF',
          700: '#4C1D95',
          800: '#312E81',
          900: '#1E1B4B',
        },
        surface: '#F8F9FD',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(99, 91, 255, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(99, 91, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
