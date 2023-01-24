import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductsGlobalFilter from 'src/js/common/components/products/ProductsGlobalFilter';

jest.mock('@appfabric/ui-intl');
jest.mock('src/nls');
jest.mock('react-intl');

describe('Product Main Component', () => {
  test('Renders search button', () => {
    render(<ProductsGlobalFilter />);
    const searchBox = screen.getByRole('searchbox');
    expect(searchBox.placeholder).toBe('0 records...');
  });
});
