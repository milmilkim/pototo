/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-bg-light': '#3C424B',
        'main-bg': '#111111',
        'common': '#2A2F32',
        'primary': '#BB86FC',
      },
      aspectRatio: {
        '9/16': '9/14'
      }
    },
  },
  plugins: [],
};
