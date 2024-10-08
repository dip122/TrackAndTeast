/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'cyan' : colors.sky,
        'teal' : colors.emerald
      }
    },
  },
  plugins: [],
}

