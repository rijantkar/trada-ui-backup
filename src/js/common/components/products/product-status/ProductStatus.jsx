import React from 'react';

export const ProductStatus = (status) => {
  return (
    <span
      role="button"
      tabIndex={0}
      className={
        status
          ? 'badge badge-primary badge-pill product-status-pill product-status-pill--live '
          : 'badge badge-primary badge-pill product-status-pill product-status-pill--draft'
      }
    >
      {status ? 'Live' : 'Draft'}
    </span>
  );
};
