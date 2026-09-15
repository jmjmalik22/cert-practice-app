import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist", "node_modules"] },
  js.configs.recommended,
  {
    // .mjs included so the Node build scripts (scripts/*.mjs) get Node
    // globals. Without it they matched no config block, fell back to bare
    // recommended rules with no globals defined, and reported `console` and
    // `URL` as undefined.
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      // "latest" rather than a pinned year so the parser keeps up with syntax
      // Node already runs — import attributes (`with { type: "json" }`) parse
      // under ES2025 but not 2022.
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
    settings: { react: { version: "detect" } },
  },
];
