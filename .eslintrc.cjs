module.exports = {
  root: true,
  env: {
    node: true,
    mongo: true,
  },
  extends: [
    // base
    "eslint:recommended",
    "airbnb-base",

    "plugin:prettier/recommended",

    "plugin:promise/recommended",

    "plugin:eslint-comments/recommended",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": "off", // i will eventually add a logger
    "import/extensions": "off",
    "consistent-return": "off",
  },
};
