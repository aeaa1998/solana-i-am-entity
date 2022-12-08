const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.red,
        secondary: colors.yellow,
        ...colors
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
  safelist: [
    'text-gray-700',
    'text-gray-400'
  ]
}
