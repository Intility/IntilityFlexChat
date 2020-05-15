module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended", // Should be last in the 'extends' array.
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module" // Allows for the use of imports
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/prop-types": "off",
        "prettier/prettier": ["error", {
            "endOfLine":"auto"
          }],
    }
};