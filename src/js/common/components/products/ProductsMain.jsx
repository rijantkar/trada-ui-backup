import React, { useState, useCallback, useEffect } from 'react';
import {
  useSortBy,
  useTable,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { wrapWithIntlProvider } from '@appfabric/ui-intl';
import ServiceHelper from 'src/js/helpers/ServiceHelper';
import PropTypes from 'prop-types';
import { GetProductRows, GetProductHeaders, GetHiddenColumns } from './utils';
import nls from '../../../../nls';
import ProductsTable from './ProductsTable';
import {
  getPageCount,
  getTradaProductsRoute,
  getHostOrigin,
} from '../../../utils/tradaUtils';

const ProductsMain = ({ sandbox }) => {
  const pageSize = getPageCount(sandbox);
  const endPoint = getTradaProductsRoute(sandbox);
  const hostOrigin = getHostOrigin();

  const serviceHelper = new ServiceHelper();

  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const response = await serviceHelper
      .getSimpleData(hostOrigin + endPoint)
      .catch((err) => {
        /* eslint-disable no-console */
        console.log(err);
        return <></>;
        /* eslint-enable no-console */
      });

    if (response.ok) {
      const p = await response.json();
      setProducts(p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productsRows = GetProductRows(products);
  const productsHeaders = GetProductHeaders(products);
  const hiddenColumns = GetHiddenColumns(products);

  const tableInstance = useTable(
    {
      columns: productsHeaders,
      data: productsRows,
      initialState: {
        hiddenColumns,
        pageIndex: 0,
        pageSize,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return <ProductsTable tableInstance={tableInstance} />;
};

export default wrapWithIntlProvider(
  ProductsMain,
  nls.requireNlsForLocale('products'),
);

ProductsMain.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sandbox: PropTypes.object.isRequired,
};
