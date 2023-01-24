export const getTradaProductsRoute = (sandbox) => {
  return `${sandbox.pluginConfig.extendedProperties.tradaProductsRoute}`;
};

export const getPageCount = (sandbox) => {
  return sandbox.pluginConfig.extendedProperties.pageCount;
};

export const navigateToProductsPage = (URL) => {
  window.location.assign(URL);
};

export const getHostOrigin = () => {
  return `${window.location.origin}`;
};
