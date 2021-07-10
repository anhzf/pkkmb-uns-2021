const { resolve } = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'next',
    'next/core-web-vitals',
    // 'plugin:@next/next/recomended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  globals: {
    React: true,
    JSX: true,
  },
  rules: {
    // import related
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    // react
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'always' }],
    // code style
    'max-len': ['warn', { code: 150 }],
    'no-underscore-dangle': 'off',
  },
};
