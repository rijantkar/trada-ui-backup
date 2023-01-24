export const LOG_MESSAGE = {
  CAUGHT_BY_ERROR_BOUNDARY: 'CaughtByErrorBoundary',
  CONFIG_INIT_ERROR: 'ConfigInitError',
  WIDGET_LOAD_ERROR: 'WidgetLoadError',
  WIDGET_ERROR: 'WidgetError',
};

export const LOG_LEVELS = {
  FATAL: 'fatal',
  ERROR: 'error',
  WARN: 'warn',
  LOG: 'log',
  DEBUG: 'debug',
};

const LogUtil = {
  /**
   * Logs values using sandbox logger
   * @param {object} sandbox widget-specific sandbox
   * @param {string} message of log
   * @param {string} level Type of log level from LOG_LEVELS constant
   * @param {array} properties array containing values for log data
   */
  _send: (sandbox, message, level) => {
    // eslint-disable-next-line no-unused-expressions
    sandbox && sandbox.logger && sandbox.logger[level](message);
  },

  /**
   * Logs exception using sandbox logger
   * @param {object} sandbox widget-specific sandbox
   * @param {string} message of log
   * @param {error} exception error object
   * @param {array} properties array containing values for log data
   */
  exception: (sandbox, message, exception, properties) => {
    if (sandbox && sandbox.logger && sandbox.logger.logException) {
      if (exception instanceof Error) {
        sandbox.logger.logException(message, exception, properties);
      }
    }
  },

  /**
   * Logs a fatal error [Log level 5/5] & sends to Splunk
   * @param {object} sandbox widget-specific sandbox
   * @param {string} message of log
   * @param {object} errorDetail Passes message prop if an Error object, otherwise whole object
   * @param {array} [extraValues] array containing extra values for log data
   */
  fatal: (sandbox, message, errorDetail, extraValues) => {
    LogUtil._send(sandbox, message, LOG_LEVELS.FATAL, extraValues);
  },

  /**
   * Logs a non-fatal error [Log Level 4/5] & sends to Splunk
   * @param {object} sandbox widget-specific sandbox
   * @param {string} message of Log, usually from LOG_MESSAGE constant
   * @param {object} errorDetail Passes message prop if an Error object, otherwise whole object
   * @param {object} [extraValues] Object containing extra values for log data
   */
  error: (sandbox, message, errorDetail, extraValues) => {
    LogUtil._send(sandbox, message, LOG_LEVELS.ERROR, extraValues);
  },

  /**
   * Log a warning [Log Level 3/5] & sends to Splunk
   * @param {object} sandbox widget-specific sandbox
   * @param {string} [message] A separate warning message to display
   * @param {object} [extraValues] Object containing extra values for log data
   */
  warn: (sandbox, message, extraValues) => {
    LogUtil._send(sandbox, message, LOG_LEVELS.WARN, extraValues);
  },

  /**
   * Log a normal log message [Log Level 2/5] (not sent to Splunk)
   * @param {object} sandbox widget-specific sandbox
   * @param {string} [message] A separate message to display
   * @param {object} [extraValues] Object containing extra values for log data
   */
  log: (sandbox, message, extraValues) => {
    LogUtil._send(sandbox, message, LOG_LEVELS.LOG, extraValues);
  },

  /**
   * Log a normal debug message [Log Level 1/5] (not sent to Splunk)
   * @param {object} sandbox widget-specific sandbox
   * @param {string} [message] A separate message to display
   * @param {object} [extraValues] Object containing extra values for log data
   */
  debug: (sandbox, message, extraValues) => {
    LogUtil._send(sandbox, message, LOG_LEVELS.DEBUG, extraValues);
  },

  /*
   * For logging actual network errors where client didn't get valid service response, probably
   * should not call outside src/js/utilities.
   */
  networkError: (sandbox, error, servicePath, serviceMethod) => {
    const values = {
      servicePath,
      serviceMethod,
    };
    // window.fetch throws a TypeError, cleaner logs if its a type error
    if (error instanceof TypeError) {
      error = {
        errorMessage: error.message,
        errorStack: error.stack,
      };
    }
    LogUtil.error(sandbox, LOG_MESSAGE.NETWORK_ERROR, error, values);
  },

  /*
   * For logging API service errors defined in the response, probably should not call outside
   * src/js/utilities.
   */
  serviceError: (
    sandbox,
    error,
    servicePath,
    serviceMethod,
    serviceResponse,
  ) => {
    const values = {
      servicePath,
      serviceMethod,
      serviceResponse,
    };

    LogUtil.error(sandbox, LOG_MESSAGE.SERVICE_ERROR, error, values);
  },

  widgetLoadError: (sandbox, error, widgetId) => {
    LogUtil.error(sandbox, LOG_MESSAGE.WIDGET_LOAD_ERROR, error, { widgetId });
  },

  widgetError: (sandbox, error, widgetId) => {
    LogUtil.error(sandbox, LOG_MESSAGE.WIDGET_ERROR, error, { widgetId });
  },
};

export default LogUtil;
