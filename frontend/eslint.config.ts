// eslint.config.ts
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: [
      "coverage/**",
      "dist/**",
      "build/**",
      "eslint.config.*",
      "jest.config.*",
      "vitest.config.*",
    ],
  },

  js.configs.recommended,

  {
    files: ["src/**/*.{ts,tsx,js,jsx}", "tests/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },
    rules: {
      ...(tsPlugin.configs.recommended.rules ?? {}),
      indent: ["error", 2, { SwitchCase: 1 }], // ⬅️ 2 spaces
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];

  // tests anywhere (adjust if you want)
  // {
  //   files: [
  //     "**/*.test.{ts,tsx,js,jsx}",
  //     "**/*.spec.{ts,tsx,js,jsx}",
  //   ],
  //   languageOptions: {
  //     parser: tsParser,
  //     parserOptions: {
  //       ecmaVersion: "latest",
  //       sourceType: "module",
  //       project: "./tsconfig.json",
  //       tsconfigRootDir: __dirname,
  //     },
  //     globals: {
  //       ...globals.browser,
  //       ...globals.node,
  //       process: "readonly",
  //       vi: "readonly",
  //       describe: "readonly",
  //       it: "readonly",
  //       expect: "readonly",
  //       beforeEach: "readonly",
  //       afterEach: "readonly",
  //       beforeAll: "readonly",
  //       afterAll: "readonly",
  //     },
  //   },
  //   plugins: {
  //     "@typescript-eslint": tsPlugin,
  //     react: reactPlugin,
  //   },
  // },
