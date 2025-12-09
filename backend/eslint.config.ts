import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	{
		ignores: ['dist', 'drizzle.config.ts', 'eslint.config.ts', 'drizzle'],
	},
	{
		files: ['**/*.ts'],
		extends: [js.configs.recommended, tseslint.configs.recommended],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: globals.node,
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
])
