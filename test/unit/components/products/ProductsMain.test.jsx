import React from 'react';
import { render, screen } from '@testing-library/react';
import sandbox from '__mocks__/sandbox.mock';
import ProductsMain from '../../../../src/js/common/components/products/ProductsMain';

jest.mock('@appfabric/ui-intl');
jest.mock('src/nls');
jest.mock('react-intl');

describe('Product Main Component', () => {
  test('Renders search button', () => {
    render(<ProductsMain sandbox={sandbox} />);
    const searchText = screen.getByText(/search/i);
    expect(searchText).toBeInTheDocument();
  });

  test('Renders search bar', () => {
    render(<ProductsMain sandbox={sandbox} />);
    const searchBox = screen.getByRole('searchbox');
    expect(searchBox).toBeInTheDocument();
  });
});
