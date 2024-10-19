import { fixupPluginRules } from '@eslint/compat';
import eslintJS from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const patchedReactHooksPlugin = fixupPluginRules(eslintPluginReactHooks);
const patchedImportPlugin = fixupPluginRules(eslintPluginImport);

const baseESLintConfig = {
	name: 'eslint',
	extends: [eslintJS.configs.recommended],
	rules: {
		'no-await-in-loop': 'error',
		'no-constant-binary-expression': 'error',
		'no-duplicate-imports': 'error',
		'no-new-native-nonconstructor': 'error',
		'no-promise-executor-return': 'error',
		'no-self-compare': 'error',
		'no-template-curly-in-string': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unreachable-loop': 'error',
		'no-unused-private-class-members': 'error',
		'no-use-before-define': 'error',
		'require-atomic-updates': 'error',
		camelcase: 'error',
	},
};

const typescriptConfig = {
	name: 'typescript',
	extends: [...typescriptEslint.configs.recommendedTypeChecked],
	languageOptions: {
		parser: tsParser,
		parserOptions: {
			ecmaFeatures: { modules: true },
			ecmaVersion: 'latest',
			project: './tsconfig.json',
		},
		globals: {
			...globals.builtin,
			...globals.browser,
			...globals.es2025,
		},
	},
	linterOptions: {
		reportUnusedDisableDirectives: 'error',
	},
	plugins: {
		import: patchedImportPlugin,
	},
	rules: {
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': ['error', { default: 'generic' }],
		'@typescript-eslint/consistent-type-exports': 'error',
		// '@typescript-eslint/consistent-type-imports': 'error',
		// '@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-member-accessibility': 'error',
		// '@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/no-confusing-void-expression': 'error',
		'@typescript-eslint/no-import-type-side-effects': 'error',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-useless-empty-export': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/no-empty-object-type': 'off',
		'no-return-await': 'off',
		'@typescript-eslint/return-await': 'error',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json',
			},
		},
	},
};

const reactConfig = {
	name: 'react',
	extends: [eslintPluginReact.configs.flat['jsx-runtime']],
	plugins: {
		'react-hooks': patchedReactHooksPlugin,
		'react-refresh': eslintPluginReactRefresh,
	},
	rules: {
		'import/no-anonymous-default-export': 'error',
		'react/jsx-boolean-value': 'error',
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'react/jsx-no-target-blank': 'off',
		'react/jsx-max-props-per-line': 'off',
		'react/jsx-sort-props': [
			'error',
			{
				callbacksLast: true,
				shorthandFirst: true,
				reservedFirst: true,
				multiline: 'last',
			},
		],
		'react/no-unknown-property': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/exhaustive-deps': 'error',
		'react-refresh/only-export-components': 'off',
		...patchedReactHooksPlugin.configs.recommended.rules,
	},
};

const jsxA11yConfig = {
	name: 'jsxA11y',
	...jsxA11yPlugin.flatConfigs.recommended,
	plugins: {
		'jsx-a11y': jsxA11yPlugin,
	},
	rules: {
		'jsx-a11y/alt-text': ['error', { elements: ['img'], img: ['Image'] }],
		'jsx-a11y/aria-props': 'error',
		'jsx-a11y/aria-proptypes': 'error',
		'jsx-a11y/aria-unsupported-elements': 'error',
		'jsx-a11y/role-has-required-aria-props': 'error',
		'jsx-a11y/role-supports-aria-props': 'error',
	},
};

const importSortConfig = {
	name: 'import-sort',
	plugins: {
		'simple-import-sort': simpleImportSort,
	},
	rules: {
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					/* React imports */
					['^react', '^@react'],

					/* Third-party libraries */
					['^\\w'],

					/* Imports starting with @ */
					['^@'],

					/* Custom imports */
					[
						'^@components',
						'^@constants',
						'^@contexts',
						'^@hooks',
						'^@misc',
						'^@pages',
						'^@plugins',
						'^@public',
						'^@services',
						'^@stores',
						'^@typesDef',
						'^@utils',
					],

					/* Parent imports. Put .. last */
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],

					/* Other relative imports. Put same-folder imports and . last */
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

					/* Style imports */
					['^.+\\.?(css)$'],
				],
			},
		],
		'simple-import-sort/exports': 'error',
		'import/order': 'off', // Avoid conflicts with `simple-import-sort` plugin
		'sort-imports': 'off', // Avoid conflicts with `simple-import-sort` plugin
	},
};

const eslintConfig = typescriptEslint.config(
	baseESLintConfig,
	typescriptConfig,
	eslintConfigPrettier,
	reactConfig,
	jsxA11yConfig,
	importSortConfig
);

eslintConfig.map((config) => {
	config.files = ['src/**/*.ts', 'src/**/*.tsx'];
});

export default eslintConfig;
