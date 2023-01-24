import React from 'react';
import BaseWidget from 'web-shell-core/widgets/BaseWidget';
import ProductCategorizationEngineMain from './components/ProductCategorizationEngineMain';
import '../../../sass/productCategorizationEngine.scss';

const GOOGLE_IDENTITY_SERVICE_URL = 'https://accounts.google.com/gsi/client';
const GOOGLE_APIS_URL = 'https://apis.google.com/js/api.js';

export default class ProductCategorizationEngine extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      isGapiLoaded: false,
      isGisLoaded: false,
    };
    this.componentIsReady = this.componentIsReady.bind(this);
    this.gapiLoaded = this.gapiLoaded.bind(this);
    this.gisLoaded = this.gisLoaded.bind(this);
  }

  /**
   * Callback after api.js is loaded.
   */
  gapiLoaded() {
    this.setState({ isGapiLoaded: true });
    this.componentIsReady();
  }

  gisLoaded() {
    this.setState({ isGisLoaded: true });
    this.componentIsReady();
  }

  /**
   * Mounts the component, see React docs.
   * @returns {void}
   */
  componentDidMount() {
    const gisScript = document.createElement('script');
    gisScript.src = GOOGLE_IDENTITY_SERVICE_URL;
    gisScript.async = true;
    gisScript.onload = this.gisLoaded;
    document.body.appendChild(gisScript);
    const gapiScript = document.createElement('script');
    gapiScript.src = GOOGLE_APIS_URL;
    gapiScript.async = true;
    gapiScript.onload = this.gapiLoaded;
    document.body.appendChild(gapiScript);
    this.ready();
  }

  componentIsReady() {
    const { isGisLoaded, isGapiLoaded } = this.state;
    if (isGapiLoaded && isGisLoaded) {
      this.ready();
    }
  }

  /**
   * Renders the widget
   * @returns {void} -
   */
  render() {
    const { sandbox } = this.props;
    const { isGapiLoaded, isGisLoaded } = this.state;
    return (
      <div className="product-categorization-engine">
        {isGapiLoaded && isGisLoaded && (
          <ProductCategorizationEngineMain
            sandbox={sandbox}
            isGapiLoaded={isGapiLoaded}
            isGisLoaded={isGisLoaded}
          />
        )}
      </div>
    );
  }
}
