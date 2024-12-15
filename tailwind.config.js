/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "rm-green": "#39ff14",
        "rm-dark": "#1a1a1a",
        "rm-light": "#97ce4c",
      },
    },
  },
  plugins: [],
};
