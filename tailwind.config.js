import { yellow } from '@mui/material/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#262E31",
        secondary: "#FFFFFF",
        yellow: "#F8D700",
        "slate-gray": "#6D6D6D",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 35px 60px -5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
