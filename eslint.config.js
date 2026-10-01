import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/storybook-static/**",
      "**/coverage/**",
      "scripts/**",
    ],
  },

  // Base JS recommended
  js.configs.recommended,

  // TypeScript strict
  ...tseslint.configs.strict,

  // React Hooks
  {
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },

  // JSX A11y
  {
    plugins: { "jsx-a11y": jsxA11y },
    rules: jsxA11y.flatConfigs.recommended.rules,
  },

  // React Refresh (warn only, for Vite HMR)
  {
    plugins: { "react-refresh": reactRefresh },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Project-wide overrides
  {
    rules: {
      // Allow _unused parameters
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // We use empty interfaces for component props extending HTML attrs
      "@typescript-eslint/no-empty-object-type": "off",
      // We use non-null assertions for DOM refs after guards
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // Stories and tests get relaxed rules
  {
    files: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.test.ts", "**/test/**"],
    rules: {
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },

  // MDX / config files
  {
    files: ["**/*.js", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
);
