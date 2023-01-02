/** @type {import('tailwindcss').Config} */
/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'grey' : '#9D9D9D',
    },
  },
}
