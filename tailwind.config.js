module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    cursor: {
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
      pointer: 'pointer'
    },
    screens: {
      'xl': '1184px'
    }
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      margin: ['last']
    },
  },
  plugins: [],
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], 
    safelist: [
      'ml-4', 'max-w-2xs'
    ]
  }
}
