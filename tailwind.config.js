/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        'touch': '48px',
      },
      minHeight: {
        'touch': '48px',
      },
    },
  },
  plugins: [],
}
