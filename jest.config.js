/**
 * Defaults are provided by Plugin-CLI.
 * Use this as a place to specify your overrides, then import it into `plugin-cli.config.js` and pass it there.
 */
const {
  coveragePathIgnorePatterns,
} = require('./test/config/coveragePathIgnorePatterns');

module.exports = {
  setupFiles: ['<rootDir>/__mocks__/matchMedia.mock.js'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  coveragePathIgnorePatterns,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
