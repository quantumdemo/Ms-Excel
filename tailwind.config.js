/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'excel-green': '#217346',
        'excel-light': '#2da061',
        'excel-dark': '#1a5c38',
        'bg-dark': '#0f1117',
        'card-dark': '#1c1f26',
      },
    },
  },
  plugins: [],
}
