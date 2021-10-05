const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const typographyOverride = require("./typography");

module.exports = {
  mode: "jit",
  purge: {
    content: ["_site/**/*.html"],
    options: {
      safelist: [],
    },
  },
  theme: {
    extend: {
      typography: typographyOverride,
      colors: {
        change: "black",
      },
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
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
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: [],
    }),
    require("@tailwindcss/ui"),
  ],
};
