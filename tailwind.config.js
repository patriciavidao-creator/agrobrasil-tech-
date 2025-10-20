/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: { xl: "12px", "2xl": "16px" },
      boxShadow: { card: "0 8px 20px rgba(0,0,0,0.06)" },
      colors: {
        brand: {
          600: "#1B7F5D",
          500: "#2BAA7C",
          400: "#51C29A",
        },
        earth: { 600: "#5A4633" },
        bg: { 50: "#F6FBF8", 950: "#0B1210" },
        text: { 900: "#0E1A16" },
        accent: { amber: "#E7B008" },
      },
    },
  },
  plugins: [],
};