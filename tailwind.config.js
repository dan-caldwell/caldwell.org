module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'ml-4', 'max-w-2xs', 'p-0', 'shrink-0',
    'bg-black', 'bg-sky-800', 'bg-amber-900', 'bg-blue-900', 'bg-pink-900', 'bg-gray-900', 'bg-gray-300',
    'bg-slate-800', 'bg-stone-800', 'bg-emerald-500', 'bg-fuchsia-800', 'bg-red-800', 'bg-yellow-400', 'bg-yellow-500',
  ]
}
