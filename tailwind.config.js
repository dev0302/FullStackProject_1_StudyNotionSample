/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // inter: ["Inter", "sans-serif"],
        // "edu-sa": ["Edu SA Beginner", "cursive"],
        // mono: ["Roboto Mono", "monospace"],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        white: "#fff",
        black: "#000",
        transparent: "#ffffff00",

        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          50: "#C5C7D4",
          100: "#AFB2BF",
          200: "#999DAA",
          300: "#838894",
          400: "#6E727F",
          500: "#585D69",
          600: "#424854",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },

        pink: {
          200: "#EF476F",
        },

        yellow: {
          50: "#FFD60A",
        },
      },

      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
    },
  },
  plugins: [],
}