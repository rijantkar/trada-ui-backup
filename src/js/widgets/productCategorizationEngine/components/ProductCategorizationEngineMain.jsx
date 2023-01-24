import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Theme } from '@design-systems/theme';
import { CardCollection } from '@cgds/card';
import { H2, H4 } from '@ids-ts/typography';
import { gapi } from 'gapi-script';
import Button from '@ids-ts/button';
import { Activity } from '@ids-ts/loader';
import ProductSelector from './ProductSelector';
import ProductCategorizationBanner from './ProductCategorizationBanner';
import {
  getEmailAddress,
  getSingleProduct,
  listProductTypes,
  productObject,
  saveProductClassification,
} from '../util';
import ProductDetail from './ProductDetail';
import { getStorage, storageKey } from '../../../utils/storageUtil';

const ProductCategorizationEngineMain = ({
  sandbox,
  isGapiLoaded,
  isGisLoaded,
}) => {
  const [productTypes, setProductTypes] = useState([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [product, setProduct] = useState(productObject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const storage = getStorage();
  const {
    clientId,
    scope,
    discoveryDocs,
    apiKey,
  } = sandbox.pluginConfig.extendedProperties.googleSpreadsheetConstants;

  // eslint-disable-next-line no-undef
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope,
    callback: '', // defined later
  });

  const fetchData = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialRowId = searchParams.get('rowId');
    setProductTypes(await listProductTypes(sandbox, initialRowId));
    setProduct(await getSingleProduct(sandbox));
    setUserEmail(await getEmailAddress());
  };

  const handleSignInClick = () => {
    if (tokenClient) {
      tokenClient.callback = async (tokenResponse) => {
        if (tokenResponse.error !== undefined) {
          throw tokenResponse;
        }
        if (tokenResponse && tokenResponse.access_token) {
          const token = {
            access_token: tokenResponse.access_token,
            expires: Date.now() + tokenResponse.expires_in * 1000,
          };
          storage.setItem(storageKey.ACCESS_TOKEN, JSON.stringify(token));
        }
        setIsSigningIn(true);
        await fetchData();
        setIsSigningIn(false);
        setIsSignedIn(true);
      };

      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
      }
    }
  };

  useEffect(() => {
    gapi.load('client', async () => {
      await gapi.client.init({
        apiKey,
        discoveryDocs,
      });
      let token = storage.getItem('accessToken');
      if (token) {
        token = JSON.parse(token);
        if (token.expires > Date.now()) {
          setIsSigningIn(true);
          gapi.client.setToken(token);
          await fetchData();
          setIsSigningIn(false);
          setIsSignedIn(true);
        }
      }
    });
  }, []);

  const handleLogout = () => {
    const token = gapi.client.getToken();
    if (token !== null) {
      // eslint-disable-next-line no-undef
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
    }
    storage.removeItem(storageKey.ACCESS_TOKEN);
    setUserEmail('');
    setIsSignedIn(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const values = [[userEmail], [product.productId], [selectedProductType]];
    await saveProductClassification(sandbox, values);
    setProduct(await getSingleProduct(sandbox));
    setSelectedProductType('');
    setIsSubmitting(false);
  };

  const handleSkip = async () => {
    setIsSkipping(true);
    setProduct(await getSingleProduct(sandbox));
    setSelectedProductType('');
    setIsSkipping(false);
  };

  return isSignedIn ? (
    <>
      <Theme theme="quickbooks">
        <CardCollection size="medium">
          <ProductDetail product={product} />
          <ProductSelector
            productTypes={productTypes}
            selectedProductType={selectedProductType}
            setSelectedProductType={setSelectedProductType}
            onSubmit={handleSubmit}
            onSkipHandler={handleSkip}
            isSubmitting={isSubmitting}
            isSkipping={isSkipping}
          />
        </CardCollection>
      </Theme>
      <ProductCategorizationBanner
        userEmail={userEmail}
        handleLogout={handleLogout}
      />
    </>
  ) : (
    <div className="main-intro-wrapper">
      <span className="intro-header">
        <H2>Welcome to Trada product classification tool,</H2>
        <br />
        <H4>To begin with tell us who you are</H4>
        <br />
      </span>
      <Button
        id="sign-in-button"
        aria-label="Sign in button"
        isLoading={isSigningIn || !isGapiLoaded || !isGisLoaded}
        loadingComponent={<Activity shape="dots" size="small" />}
        onClick={handleSignInClick}
        priority="primary"
        purpose="standard"
        size="medium"
      >
        <span className="button-text">Sign in with Google</span>
      </Button>
      <pre id="content" style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  );
};

ProductCategorizationEngineMain.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sandbox: PropTypes.object,
  isGapiLoaded: PropTypes.bool,
  isGisLoaded: PropTypes.bool,
};

export default ProductCategorizationEngineMain;
