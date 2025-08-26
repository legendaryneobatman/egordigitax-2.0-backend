import {config as baseConfig} from './base.js'
import { resolve } from 'node:path';

const project = resolve(process.cwd(), 'tsconfig.json');


/** @type {import("eslint").Linter.Config} */
export const libraryConfig = {
  ...baseConfig,
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  }
};
