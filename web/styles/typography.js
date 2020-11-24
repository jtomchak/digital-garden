const typographyOverride = (theme) => ({
  DEFAULT: {
    css: {
      color: theme("colors.gray.200"),
      maxWidth: "85ch",
      '[class~="lead"]': {
        color: theme("colors.gray.200"),
      },
      h1: {
        color: theme("colors.gray.400"),
        fontWeight: "800",
      },
      h2: {
        color: theme("colors.gray.400"),
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
      blockquote: {
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
});

module.exports = typographyOverride;
