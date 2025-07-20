import js from '@eslint/js';
import globals from 'globals';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import plugin from 'eslint-plugin-prettier';
import config from 'eslint-config-prettier';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { js, plugin },
		extends: ['js/recommended'],
	},
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: { globals: globals.browser },
	},
	{
		files: ['**/*.css'],
		plugins: { css, plugin },
		language: 'css/css',
		extends: ['css/recommended'],
	},
	config,
]);
