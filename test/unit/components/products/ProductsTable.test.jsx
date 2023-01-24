import { columnSorted } from 'src/js/common/components/products/ProductsTable';

describe('Testing Products Table', () => {
  const columnDesc = {
    isSorted: true,
    isSortedDesc: true,
  };
  test('If the columns has property isSortedDesc true, icon should be  ▼', () => {
    expect(columnSorted(columnDesc)).toBe(' ▼');
  });

  const columnAsc = {
    isSorted: true,
    isSortedDesc: false,
  };

  test('If the columns has property isSortedDesc false, icon should be  ▲', () => {
    expect(columnSorted(columnAsc)).toBe(' ▲');
  });
});
