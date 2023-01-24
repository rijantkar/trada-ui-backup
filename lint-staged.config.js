/**
 * DISCLAIMER:
 * This file provides a basic framework for lifecycle hooks. The config is based on
 * be found https://github.intuit.com/UX-Infra/infra-scripts/blob/master/libs/configs/repo/lint-staged.config.js
 * The additions we add on top of the base config can be found
 * https://github.intuit.com/daghassi/plugin-cli/blob/master/lint-staged.config.js
 *
 * By default we check: js, json, yaml, scss, md
 *
 * You can structure this however you wish, but we advise against departing from the standard config as it will be used
 * as a means for updates and improvements to be delivered to you
 */
module.exports = {
  linters: {
    '*.{js,jsx}': ['plugin-cli lint:js', 'git add'],
    '*.md': ['plugin-cli lint:md', 'git add'],
    '*.json': ['plugin-cli lint:json', 'git add'],
    '*.yaml': ['plugin-cli lint:yaml', 'git add'],
  },
  concurrent: false,
};
