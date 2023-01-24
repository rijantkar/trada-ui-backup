import React from 'react';
import PropTypes from 'prop-types';

export default function ProductsGlobalFilter({
  unfilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = React.useState(globalFilter);

  return (
    <div className="product-filter-panel appfabric-component">
      <div className="form-row ">
        <div className="input-group appfabric-search-bar">
          <span className="btn btn-secondary appfabric-product_search_button">
            search
          </span>
          <div className="input-group-append product-left-pad">
            <input
              type="search"
              className="form-control input-group"
              value={value || ''}
              onChange={(e) => {
                setValue(e.target.value);
                setGlobalFilter(e.target.value || undefined);
              }}
              placeholder={`${unfilteredRows.length} records...`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
ProductsGlobalFilter.defaultProps = {
  unfilteredRows: [],
  globalFilter: null,
  setGlobalFilter: () => {},
};

ProductsGlobalFilter.propTypes = {
  unfilteredRows: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  globalFilter: PropTypes.object,
  setGlobalFilter: PropTypes.func,
};
