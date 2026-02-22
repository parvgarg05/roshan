import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
const config = [
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsEslintParser,
        },
        plugins: {
            '@typescript-eslint': tsEslintPlugin,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
];

export default config;
