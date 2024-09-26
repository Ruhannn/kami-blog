/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'text': 'var(--text)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
      },
      keyframes: {
        boo: {
          '0%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            opacity: '0.3',
            transform: 'translate3d(0, -1rem, 0)',
          },
        },
      },
      animation: {
        boo: '0.9s boo infinite alternate',
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/typography"),],
}

