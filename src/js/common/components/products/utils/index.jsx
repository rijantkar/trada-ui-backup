import React from 'react';
import { ProductStatus } from '../product-status/ProductStatus';

/* eslint-disable no-unused-expressions */

export function GetHiddenColumns(products) {
  return products.length !== 0
    ? Object.keys(products.display_headers).filter(
        (item) => !products.display_headers[item],
      )
    : [];
}

/* eslint-enable no-unused-expressions */

export function GetProductRows(products) {
  return React.useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () => (products.length !== 0 ? [...products.product_info] : []),
    [products],
  );
}

/* eslint-disable react/prop-types */

export function GetProductHeaders(products) {
  return React.useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      products.length !== 0
        ? Object.keys(products.display_headers)
            .filter((key) => key !== 'id')
            .map((key) => {
              if (key === 'image')
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => (
                    <img
                      src={value}
                      className="product-image-table"
                      alt="Product Information"
                    />
                  ),
                };

              if (key === 'status')
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => ProductStatus(value),
                };

              return {
                Header: key.split('_').join(' '),
                accessor: key,
              };
            })
        : [],
    [products],
  );
}

/* eslint-enable react/prop-types */
