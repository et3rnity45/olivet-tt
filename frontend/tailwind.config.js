module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: "Poppins",
    },
    extend: {
      borderRadius: {
        DEFAULT: ".175rem",
      },
      boxShadow: {
        card: "0 12px 24px -6px rgba(48,54,77,.16)",
      },
      colors: {
        lightBlack: "#30364d",
        darkGray: "#798099",
        lightWhite: "#e6e8f0",
        darkBlue: "#0a0f1d",
        lightBlue: "#0e172e",
        lightRed: "#ff4652",
        lighterRed: "#ff3c48",
      },
      scale: {
        101: "1.01",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
