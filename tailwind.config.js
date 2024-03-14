/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bug: "var(--bug)",
        dark: "var(--dark)",
        dragon: "var(--dragon)",
        electric: "var(--electric)",
        fire: "var(--fire)",
        fairy: "var(--fairy)",
        fighting: "var(--fighting)",
        flying: "var(--flying)",
        ghost: "var(--ghost)",
        grass: "var(--grass)",
        ground: "var(--ground)",
        ice: "var(--ice)",
        normal: "var(--normal)",
        poison: "var(--poison)",
        psychic: "var(--psychic)",
        rock: "var(--rock)",
        steel: "var(--steel)",
        water: "var(--water)",
      },
      fontFamily: {
        plex: ["IBM Plex Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
