import uuidv4 from 'uuid/v4';
// import utility from './utility';

export default {
  /**
   *
   *
   * @param {*} url url
   * @param {*} headers headers
   * @param {Object} sandbox sandbox API
   * @returns {Object} new headers
   */
  addAuthHeaders(url, headers /* sandbox */) {
    const newHeaders = {};

    return Object.assign(newHeaders, headers);
  },

  /**
   *
   *
   * @param {*} headers headers
   * @param {*} headerKey header key
   * @param {*} defaultValue default value
   * @returns {String} existingheaderkey
   */
  getHeaderOrDefault(headers, headerKey, defaultValue) {
    const lowerCaseHeaderKey = headerKey.toLowerCase();
    const existingHeaderKey = Object.keys(headers).find(
      (key) => key.toLowerCase() === lowerCaseHeaderKey,
    );
    return existingHeaderKey ? headers[existingHeaderKey] : defaultValue;
  },

  /**
   *
   *
   * @param {*} args Arguments
   * @returns {Object} companyIdHeader
   */
  getCompanyIdHeader(args) {
    return this.getHeaderOrDefault(
      args.headers,
      'intuit-company-id',
      undefined,
    );
  },

  /**
   *
   *
   * @param {*} args Arguments
   * @returns {Object} companyUserIdHeader
   */
  getCompanyUserIdHeader(args) {
    return this.getHeaderOrDefault(args.headers, 'intuit-user-id', undefined);
  },

  /**
   * @param {Object} sandbox Sandbox
   * @returns {String} Tid Rum Data
   */
  getTidRumData(sandbox) {
    // eslint-disable-next-line no-underscore-dangle
    const data = sandbox && sandbox._rumActionTidData;

    let eaid = '';

    let etid = '';

    let result;

    let actionData;

    let i;

    let aid;

    let tid;

    let metaData;

    if (data) {
      // eslint-disable-next-line no-plusplus
      for (i = 0; i < data.length; i++) {
        actionData = data[i];
        if (i === data.length - 1) {
          ({ aid, tid, metaData } = actionData);
        } else {
          eaid += `${actionData.aid} ,`;
          etid += `${actionData.tid} ,`;
        }
      }

      result = {
        aid,
        tid,
        metaData,
      };

      if (eaid) {
        result.eaid = eaid.substring(0, eaid.length - 1);
      }

      if (etid) {
        result.etid = etid.substring(0, etid.length - 1);
      }

      return result;
    }
    return null;
  },

  /**
   *
   *
   * @param {*} sandbox sandbox
   * @returns {string} tid
   * TODO requestTid
   */
  getTid(sandbox) {
    const data = this.getTidRumData(sandbox);

    return data ? data.tid : null;
  },

  /**
   *
   *
   * @param {*} args Arguments
   * @returns {Object} Rid from request arguments
   * TODO requestTid
   */
  getRidFromRequestArgs(args) {
    return args && args.headers && args.headers.intuit_requestid
      ? args.headers.intuit_requestid
      : null;
  },

  /**
   *
   *
   * @param {*} args Arguments
   * @returns {String} Generate random uuid
   * TODO requestTid
   */
  generateRid(args) {
    return this.getRidFromRequestArgs(args) || uuidv4();
  },

  /**
   *
   *
   * @param {*} args Arguments
   * @returns {String} generate random uuid
   * TODO requestTid
   */
  getIntuitRid(args) {
    /*
     * if (isProdEnv()) {
     *     return this.generateRid(args);
     * } else {
     *     let testToken = getTestToken();
     *     if (testToken) {
     *         //QBO-109959: If global variable intuitTestToken is set in preprod prepend the intuitTestToken to the UUID
     *         return generateRidWithTestToken(args, testToken);
     *     } else {
     *         return generateRid(args);
     *     }
     * }
     */
    return this.generateRid(args);
  },

  /**
   *
   *
   * @param {*} options Options
   * @returns {String} querystring
   * TODO: utility
   */
  objectToQuery(options) {
    const queryString = Object.keys(options)
      .map((key) => `${key}=${options[key]}`)
      .join('&');

    return queryString;
  },

  /**
   *
   *
   * @param {*} error Error
   * @param {*} sandbox Sandbox APIs
   * @returns {void}
   */
  handleRejected(error, sandbox) {
    const log = sandbox.logger;
    // Only log status 0 failures as those are failures to connect to the server
    if (error && error.message && error.response && error.response.url) {
      log.error(
        `Fetch failure! fetchStaus=0; URL=${error.response.url}; Error Message='${error.message}';`,
      );
    }

    throw error;
  },
  /**
   * A thin wrapper that adds the following behavior:
   *  show wait cursor
   *  show an animated gif to indicate some processing is going on
   *  optionally, show a dialog when an error occurs
   *  handle 401 error and redirect to login page
   * @param {Object} url Should contain the values required by dojo/request/xhr.
   * @param {Object} fetchOptions Should contain the values required by dojo/request/xhr.
   *  url     : the url
   *  data    : the POST data either as an object or json string
   *  query   : the GET query params
   *  headers : can have headers
   *
   * The Content-Type header defauls to application/json
   *   If for some reason you want application/x-www-form-urlencoded send the header as below.
   *   Sending the form header will not stringify the passed in data
   *   headers: {
   *       'Content-Type': 'application/x-www-form-urlencoded'
   *   }
   *
   *  In addition, the following can also be specified:
   *  errorMessage (optional) : if specified, shows a system alert with the value as the message
   *
   * Note that it is important to have this function display an error message dialog otherwise a
   * redirect (in case of 401) might happen before the user sees the dialog (as dojo dialogs don't block processing)
   *
   * @returns {Promise} Promise
   */

  /**
   * Prepares arguments dictionary for neo xhr
   * @param {*} requestParams parameters used for request
   * In the format
   *   {
   * url,
   * method: //'GET/POST/PUT/DELETE',
   * options, //fetchoptions
   * data, //data to be posted
   * headers, // additional headers
   * sandbox: this.sandbox, //sandbox API
   * }
   * @returns {Object} Node options
   */
  prepareFetchOptions(requestParams) {
    const options = requestParams.options || {};
    options.method = requestParams.method;
    options.sandbox = requestParams.sandbox;
    options.headers = this.addAuthHeaders(
      requestParams.url,
      requestParams.headers,
      requestParams.sandbox,
    );
    if (requestParams.data) {
      options.body = requestParams.data;
      // JSON.stringify(data);
    }
    return options;
  },

  /**
   * Retrieve node-service options.
   * @param {Object} options Any existing options to be augmented with node.js service required options.
   * @returns {Object} returns node options
   */
  getNodeOptions(options) {
    const nodeOpts = options || {};

    // Send over the cookies as part of the cross-domain call
    nodeOpts.credentials = options.credentials || 'include';

    // Generate a random UUID and use it as 'intuit_requestid' if not already defined upstream in the code.
    const intuitRid =
      nodeOpts.headers && nodeOpts.headers.intuit_requestid
        ? nodeOpts.headers.intuit_requestid
        : uuidv4();

    /*
     * this should be intuit_requestid but Zion needs to allow the header in production
     * so reverting this back for now.
     */

    if (!options.skipCsrf) {
      nodeOpts.headers = Object.assign(nodeOpts.headers, {
        'X-Requested-With': null,
        intuit_tid: intuitRid,
      });
    } else {
      nodeOpts.headers = Object.assign(nodeOpts.headers, {
        intuit_tid: intuitRid,
      });
    }

    return nodeOpts;
  },
};
