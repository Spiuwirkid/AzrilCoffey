/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          light: '#D4BBA3',
          DEFAULT: '#967259',
          dark: '#634832',
        },
        cream: {
          light: '#FAF6F1',
          DEFAULT: '#F5EBE0',
          dark: '#E6D5C7',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};