// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable class-methods-use-this */
import fetchUtils from '../utils/fetchUtils';
/**
 * Helper class to fetch data
 * @class ServiceHelper
 */
class ServiceHelper {
  /**
   * Creates an instance of ServiceHelper.
   * @param {*} args Arguments
   */
  constructor(args) {
    if (args && typeof args === 'object' && args.sandbox) {
      this.sandbox = args.sandbox;
    } else {
      this.sandbox = {};
    }
  }

  /**
   * @param {*} url url
   * @param {*} options options
   * @param {*} headers headers
   * @returns {Promise} Promise resolved with response of fetch GET
   */
  async getSimpleData(url, options, headers) {
    const fetchOptions = fetchUtils.prepareFetchOptions({
      url,
      method: 'GET',
      options,
      headers,
      sandbox: this.sandbox,
    });
    const fetchResponse = await fetch(url, fetchOptions);
    return fetchResponse;
  }

  /**
   * @param {*} url url
   * @param {*} options options
   * @param {*} headers headers
   * @returns {Promise} Promise resolved with response of fetch GET
   */
  get(url) {
    /*
     * const fetchOptions = fetchUtils.prepareFetchOptions({
     *   url,
     *   method: 'GET',
     *   sandbox: this.sandbox,
     * });
     */
    return fetch(url);
  }

  /**
   * @param {*} url url
   * @param {*} options options
   * @param {*} data body to POST
   * @param {*} headers headers
   * @returns {Promise} Promise resolved with response of fetch POST
   */
  postData(url, options, data, headers) {
    let fetchOptions = fetchUtils.prepareFetchOptions({
      url,
      method: 'POST',
      options,
      data,
      headers,
      sandbox: this.sandbox,
    });
    fetchOptions = fetchUtils.getNodeOptions(fetchOptions);
    return fetchUtils.doRequest(url, fetchOptions);
  }

  /**
   * @param {*} url url
   * @param {*} options options
   * @param {*} data body to POST
   * @param {*} headers headers
   * @returns {Promise} Promise resolved with response of fetch PUT
   */
  putData(url, options, data, headers) {
    let fetchOptions = fetchUtils.prepareFetchOptions({
      url,
      method: 'PUT',
      options,
      data,
      headers,
      sandbox: this.sandbox,
    });
    fetchOptions = fetchUtils.getNodeOptions(fetchOptions);
    return fetchUtils.doRequest(url, fetchOptions);
  }

  /**
   * @param {*} url url
   * @param {*} options options
   * @param {*} headers headers
   * @returns {Promise} Promise resolved with response of fetch DELETE
   */
  deleteData(url, options, headers) {
    let fetchOptions = fetchUtils.prepareFetchOptions({
      url,
      method: 'DELETE',
      options,
      headers,
      sandbox: this.sandbox,
    });
    fetchOptions = fetchUtils.getNodeOptions(fetchOptions);
    return fetchUtils.doRequest(url, fetchOptions);
  }
}

export default ServiceHelper;
