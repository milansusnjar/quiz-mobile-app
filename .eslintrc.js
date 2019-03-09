module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },

  plugins: ['react', 'prettier', 'react-native', 'async-await'],
  globals: {
    __DEV__: false
  },
  rules: {
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': 'warn',
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    strict: 0,
    quotes: ['warn', 'single'],
    'react-native/split-platform-components': 0,
    'react-native/no-inline-styles': 0,
    'react/display-name': 1,
    'no-console': [1, { allow: ['warn', 'error'] }]
  }
};
