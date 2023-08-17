/* eslint-disable  */
const path = require("path");

const COMMON_EXTENSIONS = "**/*.{ts,tsx,html}";

module.exports = {
  createOldCatalogs: false,
  locales: ["ko", "jp", "en"],
  output: path.join(__dirname, "public", "locales", "$LOCALE", "$NAMESPACE.json"),

  input: [
    `src/components/${COMMON_EXTENSIONS}`,
    `src/pages/${COMMON_EXTENSIONS}`,
    "!**/node_modules/**",
    "!.next/**"
  ]
};
