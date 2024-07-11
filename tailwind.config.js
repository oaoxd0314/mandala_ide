/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue, js,ts,jsx,tsx}',
    './src/style/**/*.{css,scss,sass}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'highlight-primary': 'rgba(173, 216, 230, 0.5) 0px 54px 55px, rgba(173, 216, 230, 0.4) 0px -12px 30px, rgba(173, 216, 230, 0.4) 0px 4px 6px, rgba(173, 216, 230, 0.5) 0px 12px 13px, rgba(173, 216, 230, 0.3) 0px -3px 5px',
        'highlight-danger': 'rgba(255, 99, 71, 0.5) 0px 54px 55px, rgba(255, 99, 71, 0.4) 0px -12px 30px, rgba(255, 99, 71, 0.4) 0px 4px 6px, rgba(255, 99, 71, 0.5) 0px 12px 13px, rgba(255, 99, 71, 0.3) 0px -3px 5px',
        'highlight-green': 'rgba(144, 238, 144, 0.5) 0px 54px 55px, rgba(144, 238, 144, 0.4) 0px -12px 30px, rgba(144, 238, 144, 0.4) 0px 4px 6px, rgba(144, 238, 144, 0.5) 0px 12px 13px, rgba(144, 238, 144, 0.3) 0px -3px 5px',
      },
    },
  },
  plugins: [],
};