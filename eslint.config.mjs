// eslint.config.js (ESM/flat)
import js from "@eslint/js";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended, // versão leve (sem type-check)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        __DEV__: "readonly",
        console: "readonly",
        require: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
    rules: {
      /* React básico, sem chatice */
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      /* Remover completamente as REGRAS DE HOOKS */
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",

      /* Não obrigar assinatura/retorno explícito de função */
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",

      /* Console liberado */
      "no-console": "off",

      /* Unused mais prático:
         - Desabilita checagem padrão
         - Usa plugin que REMOVE imports não usados no --fix
         - Marca variáveis/args não usados como warn (prefixo _ silencia) */
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      "unused-imports/no-unused-imports": "warn", // <-- remove imports no --fix
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
    settings: { react: { version: "detect" } },
  },
  prettier,
  {
    ignores: [
      "node_modules",
      ".expo",
      ".expo-shared",
      "dist",
      "build",
      "android",
      "ios",
    ],
  },
];
