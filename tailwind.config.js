const defaultTheme = require('tailwindcss/defaultTheme');
const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './packages/frontend/src/**/*.{tsx,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    daisyui
  ],
}

