const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      dev: ["Dev Gothic", "system-ui", "sans-serif"],
    },
    colors: {
      'primary': {
        300: '#fddc75',
        400: '#bc4b27',
      }
    }
  },
  plugins: [],
});