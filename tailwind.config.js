/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'spin-slower': 'spin 16s linear infinite',
        'spin-reverse': 'spin-reverse 12s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}
