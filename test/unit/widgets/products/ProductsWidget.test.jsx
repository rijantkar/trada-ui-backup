import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from '@testing-library/react';
import ProductsWidget from 'src/js/widgets/products/ProductsWidget';
// eslint-disable-next-line import/no-unresolved
import sandbox from '__mocks__/sandbox.mock';
// eslint-disable-next-line import/no-unresolved
import MockComponent from '../../../../__mocks__/component.mock';
/**
 * Mock any files that you don't own.
 * In this case, we are calling `BaseWidget` from the `__mocks__` directory
 */
Enzyme.configure({ adapter: new Adapter() });
jest.mock('web-shell-core/widgets/BaseWidget');
jest.mock('src/js/components/products/ProductsMain', () => () => {
  return <MockComponent name="ProductsMain" />;
});

describe('Product Page Widget', () => {
  afterEach(() => jest.clearAllMocks());
  test('renders product page', () => {
    render(<ProductsWidget sandbox={sandbox} />);
    expect(screen.queryByText(/ProductsMain/)).toBeInTheDocument();
  });
});
