const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'post': '1fr 42px',
      },
      width: {
        'sp-1': 'min(100% - 20px, 375px)',
        'post': 'min(100% - 20px, 420px)',
      },
      keyframes: {
        gradient: {
            "0%, 100%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        gradient: "gradient 8s linear infinite",
      }
    },
    fontFamily: {
      dev: ["Dev Gothic", "system-ui", "sans-serif"],
    },
    colors: {
      'primary': {
        0: '#171717',
        300: '#fddc75',
        400: '#bc4b27',
        900: '#d9d9d9',
        999: '#ffffff',
        'blue': {
          'dark': '#101720',
        },
      },
      'extra': {
        'gray': {
          50: 'rgb(224 224 224 / 0.5)',
        },
      },
    }
  },
  plugins: [],
});