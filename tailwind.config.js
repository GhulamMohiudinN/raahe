/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F7F2EA",
          light: "#FDFBF7",
          dark: "#EDE5D6",
        },
        teal: {
          DEFAULT: "#014958",
          light: "#0B6376",
          dark: "#012F38",
        },
        gold: {
          DEFAULT: "#C6A46A",
          light: "#E8D3A7",
          dark: "#A8834E",
        },
        ink: "#0E1512",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-jost)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(1, 73, 88, 0.25)",
        gold: "0 10px 40px -10px rgba(198, 164, 106, 0.45)",
      },
      backgroundImage: {
        "gold-line":
          "linear-gradient(90deg, transparent, #C6A46A, transparent)",
      },
    },
  },
  plugins: [],
};
