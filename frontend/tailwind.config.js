/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    options: {
      safelist: [], // Specify the classes that should not be removed by purge
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
