import {libraryConfig} from '@repo/eslint-config/library'

// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
export const rootConfig =  {
  ...libraryConfig,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};

export default rootConfig;
