const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.200"),
            maxWidth: "85ch",
            '[class~="lead"]': {
              color: theme("colors.gray.200"),
            },
            h1: {
              color: theme("colors.gray.200"),
              fontWeight: "800",
            },
            h2: {
              color: theme("colors.gray.200"),
              fontWeight: "700",
            },
            h3: {
              color: theme("colors.gray.200"),
              fontWeight: "600",
            },
            h4: {
              color: theme("colors.gray.200"),
              fontWeight: "600",
            },

            a: {
              color: theme("colors.yellow.600"),
              "&:hover": {
                color: theme("colors.gray.50"),
              },
            },
            strong: {
              color: theme("colors.gray.200"),
            },
            "p > strong::before": {
              color: theme("colors.gray.200"),
            },
            "ol > li::before": {
              color: theme("colors.gray.200"),
            },
            code: {
              color: theme("colors.gray.50"),
            },
            "p code": {
              color: theme("colors.gray.200"),
            },
            pre: {
              color: theme("colors.gray.50"),
            },
            thead: {
              color: theme("colors.gray.50"),
            },

            // ...
          },
        },
      }),
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
