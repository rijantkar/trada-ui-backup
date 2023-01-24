/**
 * This file provides a basic mock of BaseWidget for unit tests
 */
let React = require('react');

// If we are in a jest test, we may have things mocked so we require the actual React
if (process.env.NODE_ENV === 'test') {
  React = jest.requireActual('react');
}

/**
 * Mock of BaseWidget for tests
 */
class BaseWidget extends React.Component {
  /**
   * Called when the widget is complete and ready to render
   * @returns {Object} `this`
   */
  ready() {
    return this;
  }

  /**
   * Called when the widget has an error
   * @returns {Object} `this`
   */
  err() {
    return this;
  }

  /**
   * Called when the widget is complete its operation
   * @returns {Object} `this`
   */
  done() {
    return this;
  }

  /**
   * Called when the widget cancels an operation
   * @returns {Object} `this`
   */
  cancel() {
    return this;
  }

  /**
   * Called when the widget is indicating it is in a wait state
   * @returns {Object} `this`
   */
  waitStart() {
    return this;
  }

  /**
   * Called when the widget is indicating it is exiting the wait state
   * @returns {Object} `this`
   */
  waitFinish() {
    return this;
  }
}

export default BaseWidget;
