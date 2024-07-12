/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "regular-black": "#1c2434",
        "gray": "#8a99af",
        "light-gray": "#dee4ee",
        "opac-gray": "#313d4a",
        "light-blue": "#f1f5f9",
      },
      fontFamily: {
        'satoshi-regular': ['"sataoshi-regular"']
      }
    },
  },
  plugins: [],
};
