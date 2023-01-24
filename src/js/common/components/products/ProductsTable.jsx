/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Table } from '@ids-ts/table';
import { Pagination } from '@cgds/pagination';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import ProductsGlobalFilter from './ProductsGlobalFilter';
import { navigateToProductsPage } from '../../../utils/tradaUtils';

export const columnSorted = (column) => {
  if (column.isSorted) {
    if (column.isSortedDesc) {
      return ' ▼';
    }
    return ' ▲';
  }
  return '';
};

export default function ProductsTable({ tableInstance }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    pageCount,
    state: { pageIndex, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = tableInstance;

  return (
    <div>
      <ProductsGlobalFilter
        unfilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table {...getTableProps()} className="table table-hover">
        <Table.Header className="thead-light">
          {headerGroups.map((headerGroup) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Table.Cell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {columnSorted(column)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <Table.Row
                className="link-row"
                {...row.getRowProps()}
                onClick={() =>
                  navigateToProductsPage(
                    `${window.location.href}/${row.original.id}`,
                  )
                }
              >
                {row.cells.map((cell) => (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Table.Addons>
        <Table.Addons.Left>
          <Pagination
            totalPages={pageCount}
            activePage={pageIndex}
            onPageChange={(pageIdx) => {
              gotoPage(pageIdx);
            }}
          />
        </Table.Addons.Left>
      </Table.Addons>
    </div>
  );
}

ProductsTable.propTypes = {
  tableInstance: PropTypes.objectOf(useTable).isRequired,
};

/* eslint-enable react/jsx-props-no-spreading */
