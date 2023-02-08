/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00251A',
        secondary: '#69F0AE',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
