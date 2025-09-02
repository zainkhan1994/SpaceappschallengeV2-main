/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 60s linear infinite',
      },
      keyframes: {
        'spin-slow': {
          'from': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          'to': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        }
      }
    }
  },
  plugins: [],
}
