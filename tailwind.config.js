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
        'excel-green': '#34C759',
        'excel-light': '#82D9A0',
        'excel-dark': '#216A42',
        'bg-dark': '#0F1117',
        'card-dark': '#12171B',
        'surface': '#1D2025',
        'accent-orange': '#D76515',
        'text-primary': '#F5F7F7',
        'text-muted': '#818C8C',
        'text-light': '#B7BEBE',
      },
    },
  },
  plugins: [],
}
