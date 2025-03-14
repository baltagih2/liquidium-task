/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff6b00",
        secondary: "#181818",
        textPrimary: "#ffffff",
        textSecondary: "#9ca3af",
      },
    },
  },
  plugins: [],
};
