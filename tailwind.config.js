/* eslint-disable global-require */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: {
          'lighten-1': '#FAB335',
          'lighten-2': '#FDE951',
          'darken-1': '#F49004',
          'darken-2': '#871C0A',
          100: '#F9B233',
          200: '#FAB02D',
          300: '#F4A261',
          400: '#F39200',
          500: '#E76F51',
          600: '#E94E1B',
          700: '#BE1622',
          800: '#8F3200',
          900: '#990100',
        },
        brand: {
          1: '#782400',
          2: '#FEE331',
          3: '#356B1D',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
