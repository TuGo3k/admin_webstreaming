/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file types
  ],
  theme: {
    extend: {
      colors: {
        "regal-blue" : "#002E6B",
      },
      fontFamily: {
        rokkitt: ['Rokkitt', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        rockwell: ['Rockwell', 'serif'],
      },
      boxShadow: {
        'inner-custom': 'inset -2px -2px 4px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(170, 170, 204, 0.25), inset 5px 5px 10px rgba(170, 170, 204, 0.5), inset -5px -5px 10px #FFFFFF',
        'custom-light': '-8px -8px 16px 0px #FFFFFF',
        'custom-dark': '8px 8px 16px 0px #C9D9E8',
      },
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.1)',
        'DEFAULT': '2px 2px 4px rgba(0, 0, 0, 0.2)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.3)',
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.4)',
        '2xl': '5px 5px 10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
