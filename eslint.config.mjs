import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import { dirname } from 'path';
import typescriptEslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import eslintJS from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize compatibility
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** Base Configuration */
const baseConfig = {
  name: 'base',
  extends: [eslintJS.configs.recommended],
  rules: {
    'no-unused-vars': 'error',
    'no-await-in-loop': 'error',
    'no-duplicate-imports': 'error',
    'no-use-before-define': 'error',
    'require-atomic-updates': 'error',
  },
};

/** TypeScript Configuration */
const typescriptConfig = {
  name: 'typescript',
  extends: [...typescriptEslint.configs.recommendedTypeChecked],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      project: './tsconfig.json',
    },
    globals: {
      ...globals.browser,
      ...globals.es2025,
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    'no-use-before-define': 'off',
    'no-await-in-loop': 'off',
  },
};

/** React Configuration */
const reactConfig = {
  name: 'react',
  extends: [eslintPluginReact.configs.flat['jsx-runtime']],
  rules: {
    'react/jsx-boolean-value': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-sort-props': [
      'error',
      { callbacksLast: true, shorthandFirst: true, multiline: 'last' },
    ],
    'react-hooks/exhaustive-deps': 'warn',
  },
};

/** JSX A11y Configuration */
const jsxA11yConfig = {
  name: 'jsx-a11y',
  ...jsxA11yPlugin.flatConfigs.recommended,
  plugins: { 'jsx-a11y': jsxA11yPlugin },
  rules: {
    'jsx-a11y/alt-text': ['error', { img: ['Image'] }],
    'jsx-a11y/role-has-required-aria-props': 'error',
  },
};

/** Import Sort Configuration */
const importSortConfig = {
  name: 'import-sort',
  plugins: { 'simple-import-sort': simpleImportSort },
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@react', '^next', '^@next'], // React & Nextjs imports
          ['^\\w'], // Third-party libraries
          ['^@'], // Imports starting with @
          ['^\\./'], // Relative imports
          ['^.+\\.(css|scss)$'], // Style imports
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/order': 'off', // Avoid conflicts with `simple-import-sort` plugin
    'sort-imports': 'off', // Avoid conflicts with `simple-import-sort` plugin
  },
};

/** Next.js Configuration */
const nextConfig = compat.extends('next/core-web-vitals', 'next/typescript');

const eslintConfig = typescriptEslint.config(
  baseConfig,
  typescriptConfig,
  reactConfig,
  jsxA11yConfig,
  importSortConfig,
  eslintConfigPrettier,
  nextConfig
);

// Uncomment to modify the config files
// eslintConfig.map((config) => {
//   config.files = ["src/**/*.ts", "src/**/*.tsx"];
// });

export default eslintConfig;
