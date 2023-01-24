import { productsJson } from '__mocks__/productData';
import {
  GetHiddenColumns,
  GetProductRows,
  GetProductHeaders,
} from 'src/js/common/components/products/utils/index';

jest.mock('@appfabric/ui-intl');
jest.mock('src/nls');
jest.mock('react-intl');

describe('Testing index.js helper functions ', () => {
  test('Check which columns are hidden', () => {
    const hiddenCols = ['id', 'sku', 'tags'];
    expect(GetHiddenColumns(productsJson)).toEqual(hiddenCols);
  });

  test('Checkout what is the type of GetProductsRows is ', () => {
    expect(typeof GetProductRows).toBe('function');
  });

  test('Checkout what is the type of GetProductsHeaders is ', () => {
    expect(typeof GetProductHeaders).toBe('function');
  });
});
