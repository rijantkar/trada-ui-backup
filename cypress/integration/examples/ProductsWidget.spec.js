// / <reference types="Cypress" />

/**
 * Checks if version is greater than 1.0.0
 * @param {String} version Version against which checks are done
 * @returns {boolean} true if version greater than 1.0.0
 */
const isHigherVersion = (version) => {
  const startVersion = 100; // corresponding to 1.0.0
  return Number(version.slice(0, 5).split('.').join('')) > startVersion;
};

context('ProductsWidget.jsx', () => {
  // If cypress intends to run against a remote shell - invoke a simple test and eject early
  const { USE_REMOTE, PLUGIN_URL, PLUGIN_VERSION } = Cypress.env();
  if (USE_REMOTE) {
    it('if using remote shell configuration, cypress can visit the local build ', () => {
      cy.request('GET', PLUGIN_URL).then((resp) => {
        expect(resp.headers).to.have.property('content-type');
        expect(resp.body).to.have.property('id', 'trada-ui');
      });
    });
  }
  it.skip('Performance Metrics Validations', () => {
    const testAppUrl = 'https://plugin-test.app.intuit.com/app';
    const pluginId = 'trada-webplugin-test';
    const routeExt = 'hello';
    const metricsInterested = ['FCP', 'shellLoad'];
    const marksInterested = [];

    if (
      PLUGIN_VERSION &&
      (PLUGIN_VERSION.length > 5 || isHigherVersion(PLUGIN_VERSION))
    ) {
      const url = `${testAppUrl}/${pluginId}/${routeExt}?plugin.${pluginId}=${PLUGIN_VERSION}`;
      cy.visit(url);
      cy.preparePerfAudit(metricsInterested, marksInterested, 6000).as(
        'perfValidator',
      );

      cy.get('@perfValidator').then({ timeout: 20000 }, (perfValidator) => {
        return Cypress.Promise.all([
          perfValidator.metric('FCP').lt(4000),
          perfValidator.metric('shellLoad').lt(4000),
        ]);
      });
    }
  });
});
