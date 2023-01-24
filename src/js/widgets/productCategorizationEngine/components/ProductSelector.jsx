import React from 'react';
import { Card } from '@cgds/card';
import { Stack } from '@cgds/stack';
import * as utility from '@cgds/utility-css';
import { Field } from '@cgds/field';
import PropTypes from 'prop-types';
import Button from '@ids-ts/button';
import { Activity } from '@ids-ts/loader';
import { DropdownTypeaheadWrapper } from '../../../common/components/dropdownTypeahead/DropdownTypeaheadWrapper';

const ProductSelector = (props) => {
  const {
    isValid,
    productTypes,
    triggerInvalid,
    onSubmit,
    onSkipHandler,
    selectedProductType,
    setSelectedProductType,
    isSubmitting,
    isSkipping,
  } = props;
  return (
    <Card>
      <Stack
        direction="column"
        align="center"
        justify="center"
        gap={10}
        className={utility.p12}
      >
        <Field
          style={{
            width: '450px',
          }}
        >
          <DropdownTypeaheadWrapper
            className="ids-dropdown-wrapper"
            data-automation-id="product-type-selector"
            dataSource={productTypes.map((item) => ({
              value: item.productTypeId,
              label: item.productType,
            }))}
            value={selectedProductType}
            productType={selectedProductType}
            label="Product Type"
            placeholder="Choose a Product Type"
            onChange={setSelectedProductType}
            requiredText="Required"
            isValid={isValid && !triggerInvalid}
            nlsKeyPrefix="productType"
            idsTheme="quickbooks"
          />
        </Field>
        <Button
          purpose="standard"
          priority="primary"
          theme="quickbooks"
          onClick={onSubmit}
          isLoading={isSubmitting}
          loadingComponent={<Activity shape="dots" size="small" />}
        >
          Submit & Continue
        </Button>
        <Button
          purpose="standard"
          priority="secondary"
          theme="quickbooks"
          onClick={onSkipHandler}
          isLoading={isSkipping}
          loadingComponent={<Activity shape="dots" size="small" />}
        >
          Skip
        </Button>
      </Stack>
    </Card>
  );
};

ProductSelector.propTypes = {
  isValid: PropTypes.bool,
  productTypes: PropTypes.array,
  triggerInvalid: PropTypes.bool,
  setSelectedProductType: PropTypes.func,
  selectedProductType: PropTypes.string,
  onSubmit: PropTypes.func,
  onSkipHandler: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isSkipping: PropTypes.bool,
};

ProductSelector.defaultProps = {
  isValid: true,
  triggerInvalid: false,
  productTypes: [],
  isSubmitting: false,
  isSkipping: false,
};

export default ProductSelector;
