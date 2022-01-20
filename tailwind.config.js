module.exports = {
  mode: "jit",
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './applications/**/*.{js,ts,jsx,tsx}',
    './post/**/*.{md,mdx}'
  ],
  media: false, // or 'media' or 'class'
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
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './applications/**/*.{js,ts,jsx,tsx}',
    './projects/**/*.{md,mdx}', 
  ],
  safelist: [
    'ml-4', 'max-w-2xs', 'p-0', 'shrink-0',
    'bg-gray-900', 'rounded-2xl', 'mr-4', 'shadow-lg',
    'mb-4', 'p-2', 'xl:mr-4', 'justify-center', 'flex-col-reverse'
  ]
}
