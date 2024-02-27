/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
    "./views/*.ejs"
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      colors: {
        'default': '#0053ab',
        'black': '#030303',
        'grey': '#5c5c5c',
        'darkGrey': '#A2A2A2',
        'dark': '#202020'
      }
    }
  },
  plugins: [],
}