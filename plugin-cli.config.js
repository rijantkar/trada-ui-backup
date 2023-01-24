/**
 * This file allows you to override certain functionality that Plugin CLI provides.
 * For more info on the options, see https://github.intuit.com/pages/UX-Infra/plugin-cli/#/CONFIGURING
 */
const eslintConfig = require('./.eslintrc');
const webpackConfig = require('./webpack.config');
const cypressConfig = require('./cypress.json');
const jestConfig = require('./jest.config');

module.exports = {
  lint: {
    js: {
      // Pass the rules in
      rules: eslintConfig.rules,
    },
  },
  build: {
    babel: {
      plugins: [],
    },
    webpack: webpackConfig,
  },
  test: {
    // Empty rulesets will not override anything, but we can set this up for if/when rules get added
    jest: jestConfig,
    cypress: {
      config: cypressConfig,
    },
  },
};
