/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'f12-black': '#282A37',
        'f12-orange': '#D95F32',
        'f12-orange-light': '#EE845C',
        'f12-creame': '#FAF1C5',
        'f12-blue': '#74B7B2',
        'f12-blue-light': '#97E7E2'
      },
      fontFamily: {
        title: ["Karantina", "system-ui"],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
}

