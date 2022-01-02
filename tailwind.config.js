const { getPostList } = require('./utils/post-metadata');

// Get all the posts
const postList = getPostList().reduce((total, item) => {
  total.push(item.projects);
  return total;
}, []).flat();

// Get all the thumbnail backgrounds in the post meta
const safelistBgs = [...new Set(postList.map(item => item.thumbnail_bg ? `bg-${item.thumbnail_bg}` : null))];

// Get all the thumbnail padding in the post meta
const safelistThumbPadding = [...new Set(postList.map(item => item.thumbnail_padding ? `p-${item.thumbnail_padding}` : null))];

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      margin: ['last']
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-900',
    'p-1',
    'pl-4',
    ...safelistThumbPadding,
    ...safelistBgs
  ]
}
