const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    // extends: [
    //   "eslint:recommended",
    //   "plugin:security/recommended",
    //   "plugin:prettier/recommended",
    // ],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      //   "prettier/prettier": [
      //     "error",
      //     {
      //       endOfLine: "auto",
      //       singleQuote: true,
      //       semi: true,
      //       printWidth: 80,
      //       tabWidth: 2,
      //     },
      //   ],
    },
  },
];
