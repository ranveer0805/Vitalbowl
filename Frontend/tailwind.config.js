/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        avocadoDarkBrown: "#2E2A1F",  // dark brown
        avocadoDarkGreen: "#3E5B0A",  // dark olive green
        avocadoGreen: "#7A9A2E",      // olive green
        avocadoLightGreen: "#C3D3A3", // light olive green
        avocadoCream: "#E6E2C3",      // cream
      },
    },
  },
  plugins: [],
};
