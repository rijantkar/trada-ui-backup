import { nlsLoaderFactory as NlsLoaderFactory } from '@appfabric/ui-intl';

const nlsLoader = new NlsLoaderFactory(
  // Webpack Context for Root NLS files
  require.context('./', false, /\.json$/, 'lazy'),
  // Webpack Context for locale NLS files as promises
  require.context('./', true, /\w+\/[\w-]+\.json$/, 'lazy'),
);

export default nlsLoader;
