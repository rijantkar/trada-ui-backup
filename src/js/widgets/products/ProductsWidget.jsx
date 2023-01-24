import React from 'react';
import BaseWidget from 'web-shell-core/widgets/BaseWidget';
import ProductsMain from '../../common/components/products/ProductsMain';

/**
 * Entry point into the products page for tradamarket
 */
export default class ProductsWidget extends BaseWidget {
  /**
   * Mounts the component, see React docs.
   * @returns {void}
   */
  componentDidMount() {
    this.ready();
  }

  /**
   * Renders the widget
   * @returns {void} -
   */
  render() {
    const { sandbox } = this.props;
    return (
      <div className="trada-ui">
        <ProductsMain sandbox={sandbox} />
      </div>
    );
  }
}
