import { render, screen } from '@testing-library/react';
import { ProductStatus } from 'src/js/common/components/products/product-status/ProductStatus';

describe('Product Status Component', () => {
  test('renders product status as live correctly', () => {
    render(ProductStatus(true));
    const pageText = screen.getByText(/Live/);
    expect(pageText).toBeInTheDocument();
  });

  test('renders product statusas draft correctly', () => {
    render(ProductStatus(false));
    const pageText = screen.getByText(/Draft/);
    expect(pageText).toBeInTheDocument();
  });
});
