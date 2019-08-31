const { resolve } = require('path');
const aliasesResolver = resolve('./eslintAliasesResolver.js');
const aliases = require('./aliases.config');

module.exports = {
  root: true, // So parent files don't get applied
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'plugin:import/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: ['babel', 'react-hooks'],
  settings: {
    'import/resolver': {
      [aliasesResolver]: aliases,
    },
  },
  rules: {
    'no-alert': 'error',
    //    'no-console': 'error',
    'no-constant-condition': 'error',
    'no-param-reassign': 'off',
    'no-prototype-builtins': 'off',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-autofocus': 'off',

    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-handler-names': [
      'error',
      {
        // airbnb is disabling this rule
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/no-danger': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'off',
    'react/require-default-props': 'off',
    'react/sort-prop-types': 'error',
    'react/jsx-props-no-spreading': 'off',

    'import/namespace': ['error', { allowComputed: true }],
    'import/order': [
      'error',
      {
        groups: [
          ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'],
        ],
        'newlines-between': 'never',
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['**/docs/**/*.jsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
