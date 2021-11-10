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
      inset: {
        "-10": "-10px",
      },
      rotate: {
        225: "225deg",
      },
      scale: {
        101: "1.01",
      },
      spacing: {
        "2px": "2px",
        "30px": "30px",
        "6/5": "120%",
      },
      transitionDuration: {
        400: "400ms",
      },
      translate: {
        "no-screen": "0vw",
        screen: "100vw",
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
