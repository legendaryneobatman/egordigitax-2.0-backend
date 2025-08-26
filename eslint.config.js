import libraryConfig from "@repo/eslint-config/library";

// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
export default {
  ...libraryConfig,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
