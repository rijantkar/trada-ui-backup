import React from 'react';
import PropTypes from 'prop-types';

/**
 * MockComponent
 */
class MockComponent extends React.Component {
  /**
   * constructor
   * @param {Object} props props
   */
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.data = data;
  }

  /**
   * render component
   * @returns {Object} JSX
   */
  render() {
    const { name, children } = this.props;
    return (
      <div>
        <div className="mock">Mock {name} component</div>
        {children}
      </div>
    );
  }
}

MockComponent.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  children: PropTypes.node,
};

MockComponent.defaultProps = {
  data: {},
  name: 'unnamed',
  children: undefined,
};

export default MockComponent;
