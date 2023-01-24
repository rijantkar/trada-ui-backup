/**
 * This file is used for the sandbox object mocks for the `yarn serve` command
 * It can also double as sandbox mocks for jest and other tests
 * Any unmocked functions are noops by default when doing local server development
 */

/* eslint-disable no-console */
module.exports = {
  logger: {
    // Since we need this for the server, we ignore
    log: (message) => console.log(message),
    error: (message) => console.log(message),
  },
  performance: {
    record: (instance) => console.log(instance),
    createCustomerInteraction: (interactionName) => ({
      fail: () => console.log(interactionName),
      success: () => console.log(interactionName),
    }),
  },
  analytics: {
    track: (trackingEvent) => console.log(trackingEvent),
  },
  appContext: {
    getEnvironment: jest.fn(),
  },
  extensions: {
    qbo: {
      context: {
        getEnvironmentInfo: jest.fn(),
      },
    },
  },
  pluginConfig: {
    extendedProperties: {
      isProductSearchEnabled: true,
    },
  },
};
/* eslint-enable no-console */
