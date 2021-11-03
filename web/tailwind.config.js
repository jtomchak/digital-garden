const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const typographyOverride = require("./styles/typography");

module.exports = {
  mode: "jit",
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
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
            p: {
              color: theme("colors.gray.200"),
            },
            "h1 p a": {
              color: theme("colors.gray.400"),
              fontWeight: "800",
            },
            "h2 p a": {
              color: theme("colors.gray.400"),
              fontWeight: "700",
            },
            "h3 p a": {
              color: theme("colors.gray.200"),
              fontWeight: "600",
            },
            "h4 p a": {
              color: theme("colors.gray.200"),
              fontWeight: "600",
            },
            "blockquote p": {
              color: theme("colors.gray.200"),
            },
            a: {
              color: theme("colors.gray.400"),
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
