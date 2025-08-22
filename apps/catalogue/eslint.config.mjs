import nestConfig from '@repo/eslint-config/nest.js';

/** @type {import("eslint").Linter.Config} */
export default {
  ...nestConfig,
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
