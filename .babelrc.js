/**
 * NOTE: Modifying this file will not do anything. This file is strictly for editor integration.
 * To modify plugins, do so in the `plugin-cli.config.js`.
 * See https://github.intuit.com/pages/UX-Infra/plugin-cli/#/CONFIGURING for more details
 */
module.exports = {
  presets: [require('@babel/preset-env'), require('@babel/preset-react')],
  plugins: [
    'transform-class-properties',
    'transform-object-rest-spread',
    'transform-require-context',
  ],
};
