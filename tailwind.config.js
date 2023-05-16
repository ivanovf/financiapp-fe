/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'bg-risk-color': '#fcd34d',
        'bg-safety-color': '#a3e635',
      },
    },
  },
  plugins: [],
}

