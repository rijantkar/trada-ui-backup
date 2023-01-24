module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    '@appfabric/eslint-config-appfabric',
    'plugin:eslint-comments/recommended',
    'plugin:import/warnings',
    'plugin:react/recommended',
  ],
  plugins: ['json', 'eslint-comments', 'import', 'react'],
  rules: {
    'multiline-comment-style': 'off',
    'no-confusing-arrow': ['error', { allowParens: false }],
    'require-jsdoc': 'off',
    'valid-jsdoc': 'error',
    'react/destructuring-assignment': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'max-classes-per-file': 'warn',
    'no-useless-constructor': 'warn',
    'no-case-declarations': 'off',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'react/no-array-index-key': 'off',
    'class-methods-use-this': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'react/require-default-props': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
