const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        DEFAULT: '.175rem',
      },
      colors: {
        lightBlack: '#30364d',
        darkGray: '#798099',
        lightWhite: '#e6e8f0',
        darkBlue: '#0a0f1d',
        lightBlue: '#0e172e',
        lightRed: '#ff4652',
        lighterRed: '#ff3c48',
      },
      fontSize: {
        large: '4rem',
        xlarge: '8rem',
        xxlarge: '15rem',
      },
      inset: {
        '-10': '-10px',
      },
      rotate: {
        225: '225deg',
      },
      scale: {
        101: '1.01',
      },
      spacing: {
        '2px': '2px',
        '30px': '30px',
        '6/5': '120%',
      },
      transitionDuration: {
        400: '400ms',
      },
      translate: {
        'no-screen': '0vw',
        screen: '100vw',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
