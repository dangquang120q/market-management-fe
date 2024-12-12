module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-var-requires": "off",
    "react-hooks/exhaustive-deps": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react"],
              ["^antd", "^@?\\w"],
              // Internal packages.
              [
                "^(@|pages|components|store|hooks|hoc|services|connectors)(/.*|$)",
              ],
              ["^(@|utils|constant|resources|language)(/.*|$)"],
              ["^(@|context|machines|schema)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
};
