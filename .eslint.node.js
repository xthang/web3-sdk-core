// const { node: nodeRestrictedImports } = require('./.eslint.restrictedImports')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 'plugin:jest/recommended',
    // 'plugin:react/recommended',
    'plugin:import/typescript',
    // 'plugin:markdown/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:unicorn/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports' /*, 'simple-import-sort'*/],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'import/no-unused-modules': ['warn', { unusedExports: true }],
    'import/order': [
      'warn',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], // default: "builtin", "external", "parent", "sibling", "index"
        pathGroups: [
          {
            group: 'external',
            pattern: '@readyio/*{,/**}',
            position: 'after',
          },
          {
            group: 'external',
            pattern: '@uniswap/**',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        // 'newlines-between': 'always',
        // warnOnUnassignedImports: true,
      },
    ],
    // 'simple-import-sort/imports': 'error',
    // 'simple-import-sort/exports': 'error',
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     semi: false,
    //     singleQuote: true,
    //     printWidth: 120,
    //   },
    // ],
    'object-shorthand': ['error', 'always'],
  },
  overrides: [],
}
