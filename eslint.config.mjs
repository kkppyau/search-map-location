import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused vars
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin', // Built-in modules (e.g., fs, path)
                        'external', // External modules (e.g., react, lodash)
                        'internal', // Internal modules (relative paths)
                        'parent', // Parent folder imports
                        'sibling', // Sibling imports
                        'index', // Index imports
                    ],
                    'newlines-between': 'always', // Require a newline between groups
                },
            ],
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
];

export default eslintConfig;
