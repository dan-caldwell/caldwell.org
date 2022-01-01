const { getPostList } = require('./utils/navigation');

// Get all the posts
const postList = getPostList().reduce((total, item) => {
  total.push(item.projects);
  return total;
}, []).flat();

// Get all the backgrounds in the post meta
const safelistBgs = [...new Set(postList.map(item => `bg-${item.thumbnail_bg}`))];

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-blue-900',
    ...safelistBgs
  ]
}
