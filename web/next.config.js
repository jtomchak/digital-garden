const withxwind = require("xwind/next");

module.exports = withxwind({
  /* config options here */
  env: {
    SANTIY_PROJECT_ID: process.env.SANTIY_PROJECT_ID,
  },
});
