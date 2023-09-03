/* eslint-disable */
const path = require("path");

module.exports = {
  i18n: {
    locales: ["ko", "jp", "en"],
    defaultLocale: "ko",
    localeDetection: false,
    localePath: path.resolve("./public/locales")
  }
};
