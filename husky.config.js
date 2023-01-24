/**
 * DISCLAIMER:
 * This file provides a basic framework for lifecycle hooks. The config this extends can
 * be found https://github.intuit.com/UX-Infra/infra-scripts/blob/master/libs/configs/repo/husky.config.js
 *
 * You can structure this however you wish, but we advise against departing from the standard config as it will be used
 * as a means for updates and improvements to be delivered to you
 */

module.exports = {
  hooks: {
    'commit-msg': 'commitlint -e $GIT_PARAMS',
    'pre-commit': 'lint-staged',
    'post-checkout': '',
    // Cypress is very heavy to make every user do it on precommit. Let the PR handle that.
    'pre-push': 'yarn lint && yarn test:jest',
  },
};
