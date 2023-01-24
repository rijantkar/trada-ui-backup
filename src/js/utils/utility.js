// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import { toPairs, isEqual, differenceWith, fromPairs } from 'lodash-es';

export default {
  /**
   * Regular expression check for the validity of a url path
   * @param {*} url URL to be matched with regex
   * @returns {boolean} true if url matches regex
   */
  isUrlPath(url) {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regexp.test(url);
  },
  /**
   * Regular expression check for whether a plugin id is valid
   * i.e. can only contain lower case letters, numbers, underscores, and hyphens
   * @param {string} id plugin id
   * @returns {boolean} true if plugin id matches the regex
   */
  isValidId(id) {
    const regexp = /^[a-z0-9_-]+$/;
    return regexp.test(id);
  },

  /**
   * Adapt a single plugin to the modern format
   *
   * @param  {Object} plugin The plugin to adapt
   * @return {Object} The adapted plugin
   */
  adaptToModern(plugin) {
    if (plugin && plugin.pluginId) {
      plugin.id = plugin.pluginId;
      delete plugin.pluginId;
    }
    return plugin;
  },

  /**
   * Adapt an array of plugin configs to the modern format.
   *
   * @param  {Array} plugins An array of plugins to adapt.
   * @returns {Array} The adapted plugins
   */
  adaptListToModern(plugins) {
    plugins.forEach((plugin) => {
      this.adaptToModern(plugin);
    });
    return plugins;
  },

  /**
   * Check and see if a plugin is running locally
   *
   * @param {Object} config The plugin config.
   * @return {Boolean} True if the plugin is running locally and false if not.
   */
  isPluginRunningLocally(config) {
    const str = JSON.stringify(config);

    // It's running locally if it contains "localhost" somewhere in the config.
    return str.indexOf('localhost') >= 0;
  },

  /**
   * Adapt a single plugin to the legacy format
   *
   * @param  {Object} plugin The plugin to adapt
   * @returns {Object} The adapted plugin
   */
  adaptToLegacy(plugin) {
    if (plugin && plugin.id) {
      plugin.pluginId = plugin.id;
      delete plugin.id;
    }
    return plugin;
  },

  /**
   * Adapt an array of plugin configs to the legacy format.
   *
   * @param  {Array} plugins An array of plugins to adapt.
   * @returns {Array} The adapted plugins
   */
  adaptListToLegacy(plugins) {
    plugins.forEach((plugin) => {
      this.adaptToLegacy(plugin);
    });
    return plugins;
  },

  /**
   *
   *
   * @param {*} name cookie name
   * @returns {String} cookie value from cookies
   */
  getCookieValue(name) {
    if (document && document.cookie) {
      const match = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
      if (match && match.length > 0) {
        return match[2];
      }
    }
    return null;
  },

  /**
   * Get cookie options
   * @param {*} expires expiry of cookie
   * @param {*} domain domain of cookie
   * @returns {JSON} JSON with cookie options
   */
  getCookieOptions(expires, domain) {
    return {
      expires,
      path: domain || '/',
    };
  },

  /**
   * Get all cookies as JSON doc
   * @returns {JSON} JSON with all cookies present on site
   */
  getAllCookies() {
    return document.cookie
      .split(';')
      .reduce(
        (ac, str) =>
          Object.assign(ac, { [str.split('=')[0].trim()]: str.split('=')[1] }),
        {},
      );
  },

  /**
   * Returns all matching cookies based on passed in match
   * @param {string} match string to get matching cookies on
   * @returns {array} JSON object of matching cookies
   */
  getAllMatchingCookies(match) {
    const allCookies = this.getAllCookies();
    return (
      allCookies &&
      Object.keys(allCookies)
        .filter((cookieName) => cookieName.includes(match))
        .reduce(
          (filteredCookies, cookieName) =>
            Object.assign(filteredCookies, {
              [cookieName]: allCookies[cookieName],
            }),
          {},
        )
    );
  },

  /**
   * Some cookies, like those used for plugin overrides, have an identifier attached. This removes that identifier
   * @param {string} cookieName cookie name with identifier attached
   * @param {number} [startOverrideIndex=16] default for "plugin-override" but can be used for other names
   * @return {string} cookie name with identifier stripped
   */
  getCookiePluginId(cookieName, startOverrideIndex = 16) {
    // 16 is the length of plugin-override- +1 as end index is exclusive
    return cookieName.substring(startOverrideIndex, cookieName.length);
  },

  /**
   *
   *
   * @param {*} options Options
   * @returns {String} querystring
   * TODO: utility
   */
  getStringifiedCookieOptions(options) {
    const stringifiedOptions = Object.keys(options)
      .map((key) => `${key}=${options[key]}`)
      .join(';');
    return stringifiedOptions;
  },

  /**
   *
   *
   * @param {*} name cookie key
   * @param {*} value value to be saved
   * @param {*} options options that include expires, domain, path, etc.
   * @returns {void} add cookie string
   */
  addCookie(name, value, options) {
    let stringifiedOptions = '';
    if (options) {
      stringifiedOptions = this.getStringifiedCookieOptions(options);
    }
    document.cookie = `${name}=${value};${stringifiedOptions}`;
  },

  /**
   * Deletes a cookie based on name
   * @param {string} name cookie key
   * @param {string} domain domain on which to delete cookie
   * @returns {void}
   */
  deleteCookie(name, domain) {
    this.addCookie(
      name,
      null,
      this.getCookieOptions('expires=Thu, 01 Jan 1970 00:00:01 GMT;', domain),
    );
  },

  /**
   * Deletes all matching cookies on a domain
   * Useful for deleting appf.dev cookies
   * @param {string} name name to match for all cookies for deletion
   * @param {string} domain domain to overwrite cookies to
   */
  deleteAllMatchingCookies(name, domain) {
    const allMatchingCookies = this.getAllMatchingCookies(name);
    Object.keys(allMatchingCookies).forEach((cookie) => {
      this.deleteCookie(cookie, domain);
    });
  },

  /**
   * Get the query parameter value from url
   * @param {string} name query param name
   * @param {string} url URL
   * @returns {string} query param value
   */
  getUrlParameter(name, url) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(url);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },

  /**
   * Reload the browser.
   * @returns {void}
   */
  reload() {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  },

  /**
   * Remove a plugin from an array of plugins
   *
   * @param {String} id The plugin id to search for.
   * @param {Array} plugins the array of plugins to search.
   * @returns {Object} The removed plugin or null if it wasn't found.
   */
  pluckPluginById(id, plugins) {
    let plugin = null;
    const index = plugins.findIndex((key) => key.id === id);
    let removedPluginList = [];

    if (index >= 0) {
      removedPluginList = plugins.splice(index, 1);
      [plugin] = removedPluginList;
    }
    return plugin;
  },

  /**
   * Deep clone an object. DON'T use this if the object has functions inside of it.
   *
   * NOTE: When deep cloning instances of functions like Dates, you may get unexpected behavior.
   * E.G. Cloning a Date object will serialize it to a string and you will lose the Date instance.
   *
   * @param {Object} o Config
   * @returns {JSON} parsed JSON Object
   */
  deepClone(o) {
    return JSON.parse(JSON.stringify(o));
  },

  /**
   * Deeply compares two objects, and then returns the diff of the two objects.
   * Taken from: https://stackoverflow.com/a/71714850
   * @param {*} o1 the first object
   * @param {*} o2 the second object
   * @returns {*} an object of the differences between o1 and o2
   */
  deepDiff(o1, o2) {
    return fromPairs(differenceWith(toPairs(o1), toPairs(o2), isEqual));
  },

  /**
   * This method corrects the json format in the json editor
   * @param {*} json JSON
   * @param {*} text Text
   * @returns {string} value with valid json
   */
  adaptJson(json, text) {
    let value;
    const tabSize = 4;
    // If it's not valid JSON then just use the current text as input
    if (json) {
      value = JSON.stringify(json, null, tabSize);
    } else {
      value = text;
    }

    return value;
  },

  /**
   *
   *
   * @param {*} text input string
   * @returns {bool} is json is valid JSON
   */
  isValidJson(text) {
    try {
      const obj = JSON.parse(text);
      if (obj && typeof obj === 'object' && obj !== null) {
        return true;
      }
    } catch (err) {
      return false;
    }
    return false;
  },
  /**
   * Adds the error line of an error message that only contains a position
   *
   * @param {string} errorMessage Error message containing either position or line number
   * @param {string} text text generating the error
   * @return {string} error message containing line number
   */
  parseErrorLine(errorMessage, text) {
    if (errorMessage.indexOf('line') > 0) {
      return errorMessage;
    }
    const position = errorMessage.match(/position (\d+)/)?.[1];
    const lineNumber = text?.substring(0, position)?.split('\n')?.length;
    return errorMessage.replace(/position \d+/, `line ${lineNumber}`);
  },
  /**
   *
   * Parses the text value to JSON
   * @param {*} text text value
   * @returns {JSON} Parsed json object or null if the textvalue is not in json format
   */
  getJson(text) {
    let json;
    let errorMessage;

    if (text) {
      try {
        json = JSON.parse(text);
        errorMessage = '';
      } catch (e) {
        json = null;
        errorMessage = this.parseErrorLine(e.message, text);
      }
    }

    return { json, errorMessage };
  },
  /**
   * Returns correct context
   * @returns {Object} Correct app context
   */
  getAppContext() {
    // eslint-disable-next-line no-underscore-dangle
    return window.__shellInternal || window.appContext || {};
  },

  /**
   * Gets plugin version
   * @param {String} pluginId - selector for target elements
   * @returns {String} version - Returns an array of DOM Nodes matching WIDGETID_ATTRIBUTE_QUERY_SELECTOR
   */
  getPluginVersion(pluginId) {
    const appContext = this.getAppContext();
    const { version, isLocal } = appContext.pluginsInfo.plugins[pluginId];
    return isLocal ? 'Local' : version;
  },

  /**
   * Gets shell version from HTML DOM
   * @returns {String} version - Returns shell service version
   */
  getShellServiceVersion() {
    return document.firstElementChild.dataset.shellVersion;
  },

  /**
   * @param {String} selector - selector for target elements
   * @returns {ElementsArray} - Returns an array of DOM Nodes matching selector
   */
  getDocumentNodes(selector) {
    return Array.from(document.querySelectorAll(selector));
  },

  /**
   * @param {HTMLNode} nodes List of nodes
   * @returns {array} Array of widget names
   */
  getWidgetsList(nodes) {
    const widgetsList = nodes.map(
      (node) => node.dataset.morpheusWidget.split('@')[0],
    );
    return [...new Set(widgetsList)];
  },

  /**
   * Toggles highlighting css styles on nodes
   * @param {HTMLNodes} nodes list of nodes
   * @param {string} klassName highlighter classname
   * @param {boolean} isAppend add or remove classname flag
   * @param {Object} identifiers object with widgetsList and nodes used on highlighter
   * @returns {void}
   */
  toggleClassToNodes(nodes, klassName, isAppend = true, identifiers) {
    const method = isAppend ? 'add' : 'remove';
    if (nodes.length === 1) {
      const node = nodes[0];
      const widgetName = node.dataset.morpheusWidget.split('@')?.[0];
      const index = identifiers.widgetsList.findIndex(
        (widget) => widget === widgetName,
      );
      if (index !== -1) {
        node.classList[method](klassName, `highlighterColor${index}`);
      }
    } else {
      nodes.forEach((n, index) => {
        n.classList[method](klassName, `highlighterColor${index}`);
      });
    }
  },

  /**
   * Scroll node into view
   * @param {HTMLNodes} nodes list of nodes
   * @returns {void}
   */
  scrollIntoView(nodes) {
    if (nodes.length === 1) {
      nodes[0].scrollIntoView();
    }
  },
};
