const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      zIndex: {
        "-10": "-10"
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"]
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
