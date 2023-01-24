import React from 'react';
import PropTypes from 'prop-types';
import Button from '@ids-ts/button';

const ProductCategorizationBanner = ({ userEmail, handleLogout }) => {
  return (
    <div className="product-categorization-engine-banner">
      <div className="sign-out-component">
        <p>Logged in as, {userEmail}</p>
        <Button onClick={handleLogout}>Sign out</Button>
      </div>
    </div>
  );
};

ProductCategorizationBanner.propTypes = {
  userEmail: PropTypes.string,
  handleLogout: PropTypes.func,
};

export default ProductCategorizationBanner;
