// Adding a file path here will allow us to ignore its coverage.
// TODO: Adding list files temporary, we will need to create tests as much as possible on next iterations

module.exports = {
  coveragePathIgnorePatterns: [
    'src/js/utils/fetchUtils',
    'src/js/utils/logUtil',
    'src/js/utils/sandboxUtil',
    'src/js/utils/storageUtil',
    'src/js/utils/utility',
    'src/js/components/products/utils/index',
    'src/js/components/products/constants',
    'src/js/helpers/ServiceHelper',
    'src/js/config/_getConfig',
    'src/js/config/apis',
    'src/js/components/products/reducers/ProductsReducer',
    'src/js/services/productService',
    'src/js/widgets/admin/productType/ProductTypeWidget',
    'src/js/widgets/productCategorizationEngine/*',
  ],
};
