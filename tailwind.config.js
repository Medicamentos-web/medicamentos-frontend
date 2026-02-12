module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f7ff",
          100: "#e3eeff",
          200: "#c7dcff",
          300: "#a0c2ff",
          400: "#6f9eff",
          500: "#4478ff",
          600: "#2a56db",
          700: "#2042ad",
          800: "#1d3788",
          900: "#1d2f6b",
        },
        mint: {
          50: "#effbf8",
          100: "#d7f5ee",
          200: "#b1eadb",
          300: "#7fd8c2",
          400: "#4ec5a8",
          500: "#28a68a",
          600: "#1e866f",
          700: "#1b6b5b",
          800: "#185448",
          900: "#14443b",
        },
      },
      boxShadow: {
        soft: "0 12px 30px -18px rgba(15, 23, 42, 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
