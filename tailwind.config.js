module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [],
  theme: {
    extend: {
      animation: {
       'spin-slow': 'spin 5s linear infinite',
      }
    }
  }
};
