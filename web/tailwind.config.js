const defaultTheme = require("tailwindcss/defaultTheme");
const typographyOveride = require("./styles/typography");
module.exports = {
  darkMode: "media",
  // mode: "jit",
  purge: {
    purge: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  },
  theme: {
    extend: {
      colors: {
        dark: "#24283b",
      },

      typography: typographyOveride,
    },
  },
  extend: {
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: ["hover", "focus"],
  },
  variants: {
    wordBreak: ["responsive", "group-hover"],
    textOverflow: ["responsive", "group-hover"],
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
