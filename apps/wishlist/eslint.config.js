import nestConfig from "@repo/eslint-config/nest";

/** @type {import("eslint").Linter.Config} */
export default {
  ...nestConfig,
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
