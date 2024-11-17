/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: '#1E3A8A',
          700: '#1D4ED8',
        },
      },
    },
  },
  plugins: [],
}