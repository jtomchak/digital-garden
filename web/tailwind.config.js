const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const typographyOverride = require("./styles/typography");

module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: typographyOverride,
    },
  },
  colors: {
    gray: colors.coolGray,
    blue: colors.sky,
    red: colors.rose,
    pink: colors.fuchsia,
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
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: [],
    }),
    require("@tailwindcss/ui"),
  ],
};
