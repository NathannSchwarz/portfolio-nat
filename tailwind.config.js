/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ['Unbounded', 'sans-serif'],
        lactos: ['DxLactos', 'sans-serif'],
      },
      colors: {
        colored: '#CF3434',
        coloblue: '#183FA2',
        coloyellow: '#F7BC18',
        colowhite: '#F7F2F2',
      },
      animation: {
        'spin-slow': 'spin-slow 8s linear infinite',
        'underline-grow': 'underline-grow 0.3s ease-out forwards', // Animation de soulignement
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'underline-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'spin-reverse': 'spin-reverse 13s linear infinite',
        'spin-reverse-slow': 'spin-reverse 15s linear infinite',
        'spin-slow-20': 'spin 20s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}
