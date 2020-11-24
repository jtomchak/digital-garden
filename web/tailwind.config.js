const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const typographyOverride = require("./styles/typography");

module.exports = {
  theme: {
    extend: {
      typography: typographyOverride,
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
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: [],
    }),
    require("@tailwindcss/ui"),
    require("xwind/plugins/base"),
  ],
  xwind: {
    mode: "objectstyles",
  },
};
