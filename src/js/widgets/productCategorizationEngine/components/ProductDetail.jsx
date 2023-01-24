import React from 'react';
import { Card } from '@cgds/card';
import { Stack } from '@cgds/stack';
import Link from '@ids-ts/link';
import * as utility from '@cgds/utility-css';
import '../../../../sass/productCategorizationEngine.scss';
import PropTypes from 'prop-types';
import { H4, H6 } from '@ids-ts/typography';

const ProductDetail = ({ product }) => {
  const {
    productName,
    productURL,
    productDescription,
    productImageURL,
    brandName,
    productCategory,
    productSubcategory,
  } = product;
  return (
    <Card>
      <Stack
        direction="column"
        align="center"
        justify="center"
        gap={10}
        className={utility.p6}
      >
        <a href={productURL}>
          <H4>{productName}</H4>
        </a>
        <H6>
          by <b>{brandName}</b> in{' '}
          <b>
            {productCategory} / {productSubcategory}
          </b>
        </H6>
        <img src={productImageURL} alt={productName} width="600" height="600" />
      </Stack>
      <div className="product-details">
        <p>{productDescription}</p>
      </div>
    </Card>
  );
};
ProductDetail.propTypes = {
  product: PropTypes.shape({
    brandName: PropTypes.string,
    brandDescription: PropTypes.string,
    productId: PropTypes.number,
    productName: PropTypes.string,
    productDescription: PropTypes.string,
    productImageURL: PropTypes.string,
    productURL: PropTypes.string,
    productCategory: PropTypes.string,
    productSubcategory: PropTypes.string,
  }),
};
export default ProductDetail;
