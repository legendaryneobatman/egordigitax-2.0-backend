const turboConfig = require("eslint-config-turbo");
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config} */
export default {
  root: true,
  ...turboConfig,
  ...prettierConfig,
  plugins: [
    tsPlugin,
    prettierPlugin,
  ],
  parser: tsParser,
};
