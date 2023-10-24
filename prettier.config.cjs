/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  semi: true,
  singleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;
