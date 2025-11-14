/** @type {import('tailwindcss').TailwindCSSConfig} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark"], 
  },
  // @ts-ignore
  plugins: [require("daisyui")],
}