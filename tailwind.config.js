/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'group-hover/room:block',
    'group-hover/room:bg-gray-50',
    'group-hover/room:text-pink-400'
  ]
}

