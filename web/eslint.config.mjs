import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/tina/__generated__/**",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          tabWidth: 2,
          useTabs: false,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
]);
