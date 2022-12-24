/** @type {import('tailwindcss').Config} */
/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {},
}
