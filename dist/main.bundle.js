/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var axios = __webpack_require__(1);
	var App = __webpack_require__(28);
	
	window.$ = function (query) {
	    return document.querySelector(query);
	};
	window.$$ = function (query) {
	    return document.querySelectorAll(query);
	};
	
	var Auth = function () {
	    function Auth() {
	        _classCallCheck(this, Auth);
	
	        this.box = $('.float-box');
	        this.username = $('.float-box .username');
	        this.loginBtn = $('.float-box button');
	        window.onload = this.onReady.bind(this);
	        this.remember();
	    }
	
	    _createClass(Auth, [{
	        key: 'remember',
	        value: function remember() {
	            if (localStorage['username'] !== undefined) {
	                this.username.value = localStorage['username'];
	                this.login(true);
	            }
	        }
	    }, {
	        key: 'store',
	        value: function store(username) {
	            localStorage['username'] = username;
	        }
	    }, {
	        key: 'onReady',
	        value: function onReady() {
	            var _this = this;
	
	            this.box.classList.add('animate');
	            this.loginBtn.onclick = function () {
	                return _this.login(false);
	            };
	            this.username.onkeydown = function (e) {
	                if (e.which === 13) _this.login(false);
	            };
	        }
	    }, {
	        key: 'login',
	        value: function login(usingLocalStorage) {
	            var _this2 = this;
	
	            this.username.classList.remove('wrong');
	            if (this.username.value === '') this.username.classList.add('wrong');else {
	                axios.post('/login', {
	                    username: this.username.value
	                }).then(function (response) {
	                    if (response.data.status == 2) {
	                        _this2.startApp(_this2.username.value, usingLocalStorage);
	                    } else {
	                        _this2.username.classList.add('wrong');
	                        alert(response.data.message);
	                    }
	                }).catch(function (error) {
	                    console.log(error);
	                });
	            }
	        }
	    }, {
	        key: 'logout',
	        value: function logout() {
	            localStorage['username'] = '';
	            window.location.reload();
	        }
	    }, {
	        key: 'startApp',
	        value: function startApp(username) {
	            var _this3 = this;
	
	            var usingLocalStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            this.box.classList.add('hidden');
	            if (usingLocalStorage) {
	                this.box.style.display = "none";
	            } else {
	                setTimeout(function () {
	                    return _this3.box.style.display = 'none';
	                }, 1000);
	                this.store(username);
	            }
	            window.app = this.app = new App(this, username);
	        }
	    }]);
	
	    return Auth;
	}();
	
	new Auth();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	var bind = __webpack_require__(4);
	var Axios = __webpack_require__(6);
	var defaults = __webpack_require__(7);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(25);
	axios.CancelToken = __webpack_require__(26);
	axios.isCancel = __webpack_require__(22);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(27);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(4);
	var isBuffer = __webpack_require__(5);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}
	
	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}
	
	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(7);
	var utils = __webpack_require__(3);
	var InterceptorManager = __webpack_require__(19);
	var dispatchRequest = __webpack_require__(20);
	var isAbsoluteURL = __webpack_require__(23);
	var combineURLs = __webpack_require__(24);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	  config.method = config.method.toLowerCase();
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(3);
	var normalizeHeaderName = __webpack_require__(9);
	
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(10);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(10);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(3);
	var settle = __webpack_require__(11);
	var buildURL = __webpack_require__(14);
	var parseHeaders = __webpack_require__(15);
	var isURLSameOrigin = __webpack_require__(16);
	var createError = __webpack_require__(12);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(17);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(18);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(12);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(13);
	
	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	var transformData = __webpack_require__(21);
	var isCancel = __webpack_require__(22);
	var defaults = __webpack_require__(7);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(25);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Editor = __webpack_require__(29);
	var Leaderboard = __webpack_require__(30);
	var UI = __webpack_require__(32);
	var Socket = __webpack_require__(34);
	var Mousetrap = __webpack_require__(35);
	
	var App = function () {
	    function App(auth, username) {
	        _classCallCheck(this, App);
	
	        this.auth = auth;
	        this.username = username;
	        this.mode = 'coding';
	        this.connection = {};
	        this.editor = new Editor("editor");
	        this.leaderboard = new Leaderboard(this, ".ranks");
	        this.ui = new UI(this);
	        this.socket = new Socket(this, '/');
	        this.initShortcuts();
	    }
	
	    _createClass(App, [{
	        key: "initShortcuts",
	        value: function initShortcuts() {
	            var _this = this;
	
	            Mousetrap.bind("alt alt alt alt alt alt", function () {
	                _this.auth.logout();
	            });
	        }
	    }, {
	        key: "enterNitroMode",
	        value: function enterNitroMode() {
	            this.mode = 'nitro';
	            this.leaderboard.disable();
	        }
	    }, {
	        key: "enterTimesUpMode",
	        value: function enterTimesUpMode() {
	            this.mode = 'timesup';
	        }
	    }]);
	
	    return App;
	}();
	
	module.exports = App;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Editor = function () {
	    function Editor(id) {
	        _classCallCheck(this, Editor);
	
	        ace.require("ace/ext/language_tools");
	        this.editor = ace.edit(id);
	        this.session = this.editor.getSession();
	        this.session.setTabSize(4);
	        this.editor.setOptions({
	            enableBasicAutocompletion: true,
	            enableLiveAutocompletion: true
	        });
	        this.setTheme("clouds");
	        this.setLang("javascript");
	        this.remember();
	        this.session.on("change", this.onChange.bind(this));
	    }
	
	    _createClass(Editor, [{
	        key: "remember",
	        value: function remember() {
	            if (window.localStorage['code'] !== undefined) this.value = window.localStorage['code'];
	        }
	    }, {
	        key: "setTheme",
	        value: function setTheme(theme) {
	            this.editor.setTheme("ace/theme/" + theme);
	        }
	    }, {
	        key: "setLang",
	        value: function setLang(lang) {
	            this.editor.getSession().setMode("ace/mode/" + lang);
	        }
	    }, {
	        key: "onChange",
	        value: function onChange() {
	            window.localStorage['code'] = this.value;
	        }
	    }, {
	        key: "value",
	        get: function get() {
	            return this.session.getValue();
	        },
	        set: function set(val) {
	            this.session.setValue(val);
	        }
	    }]);
	
	    return Editor;
	}();
	
	module.exports = Editor;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Team = __webpack_require__(31);
	
	var Leaderboard = function () {
	    function Leaderboard(app, query) {
	        _classCallCheck(this, Leaderboard);
	
	        this.app = app;
	        this.list = $(query);
	        this.teams = [];
	    }
	
	    _createClass(Leaderboard, [{
	        key: "addTeam",
	        value: function addTeam(id, username, name, score) {
	            var needsUpdate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
	
	            var team = new Team(this, id, username, name, score);
	            this.list.appendChild(team.element);
	            this.teams.push(team);
	            if (needsUpdate) this.updateTeams();
	            return team.element;
	        }
	    }, {
	        key: "clearAll",
	        value: function clearAll() {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.teams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var team = _step.value;
	
	                    team.element.remove();
	                    team = null;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "getTeamById",
	        value: function getTeamById(id) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = this.teams[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var team = _step2.value;
	                    if (team.id == id) return team;
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	
	            return false;
	        }
	    }, {
	        key: "getTeamByUsername",
	        value: function getTeamByUsername(username) {
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = this.teams[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var team = _step3.value;
	                    if (team.username == username) return team;
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            return false;
	        }
	    }, {
	        key: "getThisTeam",
	        value: function getThisTeam() {
	            return this.getTeamByUsername(this.app.username);
	        }
	    }, {
	        key: "initializeTeams",
	        value: function initializeTeams(teams) {
	            this.clearAll();
	            for (var username in teams) {
	                var team = teams[username];
	                if (username === this.app.username) team.id = this.app.connection.id;
	                this.addTeam(team.id, username, team.name, team.score, false);
	            }
	            this.app.ui.initProfile(this.getThisTeam());
	            this.updateTeams();
	        }
	    }, {
	        key: "updateTeams",
	        value: function updateTeams() {
	            var scores = [],
	                place = 0;
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = this.teams[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var team = _step4.value;
	                    scores.push(team.score);
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	
	            scores = scores.filter(function (score, i) {
	                return scores.indexOf(score) == i;
	            }).sort().reverse();
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = this.teams[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var _team = _step5.value;
	                    _team.rank = scores.indexOf(_team.score) + 1;
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            this.teams.sort(function (A, B) {
	                if (A.rank < B.rank) return -1;
	                if (A.rank > B.rank) return 1;
	                return 0;
	            });
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = this.teams[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var _team2 = _step6.value;
	                    _team2.place = place++;
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "disable",
	        value: function disable() {}
	    }]);
	
	    return Leaderboard;
	}();
	
	module.exports = Leaderboard;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Team = function () {
	    function Team(leaderboard, id, username, name, score) {
	        _classCallCheck(this, Team);
	
	        this.leaderboard = leaderboard;
	        this.id = id;
	        this._rank = 1;
	        this._place = 0;
	        this.name = name;
	        this.username = username;
	        this._score = score;
	        this.element = this.defineElement();
	        this.scoreElement = this.element.querySelector(".score");
	        this.progressElement = this.element.querySelector(".progress");
	    }
	
	    _createClass(Team, [{
	        key: "defineElement",
	        value: function defineElement() {
	            var li = document.createElement("li");
	            li.innerHTML = "<span class=\"name\">" + this.name + "</span>\n                        <span class=\"score\">" + this.score + "</span>\n                        <div class=\"progress\"></div>";
	            if (this.username === this.leaderboard.app.username) li.classList.add('me');
	            return li;
	        }
	    }, {
	        key: "score",
	        get: function get() {
	            return this._score;
	        },
	        set: function set(score) {
	            this._score = score;
	            this.scoreElement.innerHTML = score;
	            this.leaderboard.updateTeams();
	        }
	    }, {
	        key: "place",
	        get: function get() {
	            return this._place;
	        },
	        set: function set(place) {
	            this._place = place;
	            this.element.style.top = (this.element.offsetHeight + 5) * this.place + "px";
	        }
	    }, {
	        key: "rank",
	        get: function get() {
	            return this._rank;
	        },
	        set: function set(rank) {
	            this._rank = rank;
	            // this.rankElement.innerHTML = rank
	        }
	    }, {
	        key: "progress",
	        set: function set(rate) {
	            this.progressElement.style.width = rate + "%";
	        }
	    }]);
	
	    return Team;
	}();
	
	module.exports = Team;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tabs = __webpack_require__(33);
	
	var UI = function () {
	    function UI(app) {
	        _classCallCheck(this, UI);
	
	        this.app = app;
	        this.tabs = new Tabs();
	        this.usernameTxt = $('header .team .name');
	        this.scoreTxt = $('header .team .score');
	    }
	
	    _createClass(UI, [{
	        key: 'initProfile',
	        value: function initProfile(myTeam) {
	            this.usernameTxt.innerHTML = myTeam.name;
	            this.scoreTxt.innerHTML = myTeam.score;
	        }
	    }, {
	        key: 'setTimer',
	        value: function setTimer(seconds) {
	            var secs = seconds % 60;
	            var mins = (seconds - secs) / 60;
	            if (secs < 10) secs = "0" + secs;
	            $("header > time").innerHTML = seconds > 0 ? mins + ":" + secs : "Time's up!";
	        }
	    }]);
	
	    return UI;
	}();
	
	module.exports = UI;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tabs = function () {
	    function Tabs() {
	        var _this = this;
	
	        _classCallCheck(this, Tabs);
	
	        var tabs = $$("body > main > section > nav > li");
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var tab = _step.value;
	
	                tab.addEventListener("click", function (e) {
	                    return _this.select(e.target.getAttribute("data-page"));
	                });
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	
	        this.tryToRemember();
	    }
	
	    _createClass(Tabs, [{
	        key: "tryToRemember",
	        value: function tryToRemember() {
	            if (localStorage['tab-selected'] !== undefined) this.select(localStorage['tab-selected']);else this.select("challenge");
	        }
	    }, {
	        key: "storeLastTabSelected",
	        value: function storeLastTabSelected(which) {
	            localStorage['tab-selected'] = which;
	        }
	    }, {
	        key: "select",
	        value: function select(which) {
	            // show the selected tab and hide the others
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = $$(".tab-page")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var page = _step2.value;
	                    page.style.display = "none";
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	
	            $(".tab-page#" + which).style.display = "inherit";
	            // deactive all items but the selected item, and make it active
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = $$("body > main > section > nav > li")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var item = _step3.value;
	                    item.classList.remove("active");
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            $("body > main > section > nav > li:not(.submit)[data-page=\"" + which + "\"]").classList.add("active");
	            // Store
	            this.storeLastTabSelected(which);
	        }
	    }]);
	
	    return Tabs;
	}();
	
	module.exports = Tabs;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Socket = function () {
	    function Socket(app, address) {
	        var _this = this;
	
	        _classCallCheck(this, Socket);
	
	        this.app = app;
	        this.socket = io.connect(address);
	        this.socket.on('initial-settings', this.onInitialSettings.bind(this));
	        this.socket.on('time-sync', this.onTimeSync.bind(this));
	        this._connected = true;
	        this.testConnectionInterval = setTimeout(function () {
	            return _this.isConnected = false;
	        }, 5000);
	    }
	
	    _createClass(Socket, [{
	        key: 'onInitialSettings',
	        value: function onInitialSettings(data) {
	            this.app.connection.id = data.id;
	            this.onTimeSync(data.time);
	            this.app.leaderboard.initializeTeams(data.teams);
	            this.socket.emit('user-connect', {
	                username: this.app.username,
	                id: this.app.connection.id
	            });
	        }
	    }, {
	        key: 'onTimeSync',
	        value: function onTimeSync(seconds) {
	            if (seconds < 10 * 60 && this.app.mode === 'coding') this.app.enterNitroMode();
	            if (seconds <= 0 && (this.app.mode === 'nitro' || this.app.mode === 'coding')) this.app.enterTimesUpMode();
	            this.app.ui.setTimer(seconds);
	            this.checkConnectionOnTimerSynced();
	        }
	    }, {
	        key: 'checkConnectionOnTimerSynced',
	        value: function checkConnectionOnTimerSynced() {
	            var _this2 = this;
	
	            this.isConnected = true;
	            clearTimeout(this.testConnectionInterval);
	            this.testConnectionInterval = setTimeout(function () {
	                return _this2.isConnected = false;
	            }, 5000);
	        }
	    }, {
	        key: 'onConnectionFound',
	        value: function onConnectionFound() {
	            console.log("Connection Found!");
	        }
	    }, {
	        key: 'onConnectionLost',
	        value: function onConnectionLost() {
	            console.log("Connection Lost!");
	        }
	    }, {
	        key: 'isConnected',
	        get: function get() {
	            return this._connected;
	        },
	        set: function set(shouldConnect) {
	            if (!this._connected && shouldConnect) this.onConnectionFound();else if (this._connected && !shouldConnect) this.onConnectionLost();
	            this._connected = shouldConnect;
	        }
	    }]);
	
	    return Socket;
	}();
	
	module.exports = Socket;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*global define:false */
	/**
	 * Copyright 2012-2017 Craig Campbell
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * Mousetrap is a simple keyboard shortcut library for Javascript with
	 * no external dependencies
	 *
	 * @version 1.6.1
	 * @url craig.is/killing/mice
	 */
	(function(window, document, undefined) {
	
	    // Check if mousetrap is used inside browser, if not, return
	    if (!window) {
	        return;
	    }
	
	    /**
	     * mapping of special keycodes to their corresponding keys
	     *
	     * everything in this dictionary cannot use keypress events
	     * so it has to be here to map to the correct keycodes for
	     * keyup/keydown events
	     *
	     * @type {Object}
	     */
	    var _MAP = {
	        8: 'backspace',
	        9: 'tab',
	        13: 'enter',
	        16: 'shift',
	        17: 'ctrl',
	        18: 'alt',
	        20: 'capslock',
	        27: 'esc',
	        32: 'space',
	        33: 'pageup',
	        34: 'pagedown',
	        35: 'end',
	        36: 'home',
	        37: 'left',
	        38: 'up',
	        39: 'right',
	        40: 'down',
	        45: 'ins',
	        46: 'del',
	        91: 'meta',
	        93: 'meta',
	        224: 'meta'
	    };
	
	    /**
	     * mapping for special characters so they can support
	     *
	     * this dictionary is only used incase you want to bind a
	     * keyup or keydown event to one of these keys
	     *
	     * @type {Object}
	     */
	    var _KEYCODE_MAP = {
	        106: '*',
	        107: '+',
	        109: '-',
	        110: '.',
	        111 : '/',
	        186: ';',
	        187: '=',
	        188: ',',
	        189: '-',
	        190: '.',
	        191: '/',
	        192: '`',
	        219: '[',
	        220: '\\',
	        221: ']',
	        222: '\''
	    };
	
	    /**
	     * this is a mapping of keys that require shift on a US keypad
	     * back to the non shift equivelents
	     *
	     * this is so you can use keyup events with these keys
	     *
	     * note that this will only work reliably on US keyboards
	     *
	     * @type {Object}
	     */
	    var _SHIFT_MAP = {
	        '~': '`',
	        '!': '1',
	        '@': '2',
	        '#': '3',
	        '$': '4',
	        '%': '5',
	        '^': '6',
	        '&': '7',
	        '*': '8',
	        '(': '9',
	        ')': '0',
	        '_': '-',
	        '+': '=',
	        ':': ';',
	        '\"': '\'',
	        '<': ',',
	        '>': '.',
	        '?': '/',
	        '|': '\\'
	    };
	
	    /**
	     * this is a list of special strings you can use to map
	     * to modifier keys when you specify your keyboard shortcuts
	     *
	     * @type {Object}
	     */
	    var _SPECIAL_ALIASES = {
	        'option': 'alt',
	        'command': 'meta',
	        'return': 'enter',
	        'escape': 'esc',
	        'plus': '+',
	        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
	    };
	
	    /**
	     * variable to store the flipped version of _MAP from above
	     * needed to check if we should use keypress or not when no action
	     * is specified
	     *
	     * @type {Object|undefined}
	     */
	    var _REVERSE_MAP;
	
	    /**
	     * loop through the f keys, f1 to f19 and add them to the map
	     * programatically
	     */
	    for (var i = 1; i < 20; ++i) {
	        _MAP[111 + i] = 'f' + i;
	    }
	
	    /**
	     * loop through to map numbers on the numeric keypad
	     */
	    for (i = 0; i <= 9; ++i) {
	
	        // This needs to use a string cause otherwise since 0 is falsey
	        // mousetrap will never fire for numpad 0 pressed as part of a keydown
	        // event.
	        //
	        // @see https://github.com/ccampbell/mousetrap/pull/258
	        _MAP[i + 96] = i.toString();
	    }
	
	    /**
	     * cross browser add event method
	     *
	     * @param {Element|HTMLDocument} object
	     * @param {string} type
	     * @param {Function} callback
	     * @returns void
	     */
	    function _addEvent(object, type, callback) {
	        if (object.addEventListener) {
	            object.addEventListener(type, callback, false);
	            return;
	        }
	
	        object.attachEvent('on' + type, callback);
	    }
	
	    /**
	     * takes the event and returns the key character
	     *
	     * @param {Event} e
	     * @return {string}
	     */
	    function _characterFromEvent(e) {
	
	        // for keypress events we should return the character as is
	        if (e.type == 'keypress') {
	            var character = String.fromCharCode(e.which);
	
	            // if the shift key is not pressed then it is safe to assume
	            // that we want the character to be lowercase.  this means if
	            // you accidentally have caps lock on then your key bindings
	            // will continue to work
	            //
	            // the only side effect that might not be desired is if you
	            // bind something like 'A' cause you want to trigger an
	            // event when capital A is pressed caps lock will no longer
	            // trigger the event.  shift+a will though.
	            if (!e.shiftKey) {
	                character = character.toLowerCase();
	            }
	
	            return character;
	        }
	
	        // for non keypress events the special maps are needed
	        if (_MAP[e.which]) {
	            return _MAP[e.which];
	        }
	
	        if (_KEYCODE_MAP[e.which]) {
	            return _KEYCODE_MAP[e.which];
	        }
	
	        // if it is not in the special map
	
	        // with keydown and keyup events the character seems to always
	        // come in as an uppercase character whether you are pressing shift
	        // or not.  we should make sure it is always lowercase for comparisons
	        return String.fromCharCode(e.which).toLowerCase();
	    }
	
	    /**
	     * checks if two arrays are equal
	     *
	     * @param {Array} modifiers1
	     * @param {Array} modifiers2
	     * @returns {boolean}
	     */
	    function _modifiersMatch(modifiers1, modifiers2) {
	        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
	    }
	
	    /**
	     * takes a key event and figures out what the modifiers are
	     *
	     * @param {Event} e
	     * @returns {Array}
	     */
	    function _eventModifiers(e) {
	        var modifiers = [];
	
	        if (e.shiftKey) {
	            modifiers.push('shift');
	        }
	
	        if (e.altKey) {
	            modifiers.push('alt');
	        }
	
	        if (e.ctrlKey) {
	            modifiers.push('ctrl');
	        }
	
	        if (e.metaKey) {
	            modifiers.push('meta');
	        }
	
	        return modifiers;
	    }
	
	    /**
	     * prevents default for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _preventDefault(e) {
	        if (e.preventDefault) {
	            e.preventDefault();
	            return;
	        }
	
	        e.returnValue = false;
	    }
	
	    /**
	     * stops propogation for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _stopPropagation(e) {
	        if (e.stopPropagation) {
	            e.stopPropagation();
	            return;
	        }
	
	        e.cancelBubble = true;
	    }
	
	    /**
	     * determines if the keycode specified is a modifier key or not
	     *
	     * @param {string} key
	     * @returns {boolean}
	     */
	    function _isModifier(key) {
	        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
	    }
	
	    /**
	     * reverses the map lookup so that we can look for specific keys
	     * to see what can and can't use keypress
	     *
	     * @return {Object}
	     */
	    function _getReverseMap() {
	        if (!_REVERSE_MAP) {
	            _REVERSE_MAP = {};
	            for (var key in _MAP) {
	
	                // pull out the numeric keypad from here cause keypress should
	                // be able to detect the keys from the character
	                if (key > 95 && key < 112) {
	                    continue;
	                }
	
	                if (_MAP.hasOwnProperty(key)) {
	                    _REVERSE_MAP[_MAP[key]] = key;
	                }
	            }
	        }
	        return _REVERSE_MAP;
	    }
	
	    /**
	     * picks the best action based on the key combination
	     *
	     * @param {string} key - character for key
	     * @param {Array} modifiers
	     * @param {string=} action passed in
	     */
	    function _pickBestAction(key, modifiers, action) {
	
	        // if no action was picked in we should try to pick the one
	        // that we think would work best for this key
	        if (!action) {
	            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
	        }
	
	        // modifier keys don't work as expected with keypress,
	        // switch to keydown
	        if (action == 'keypress' && modifiers.length) {
	            action = 'keydown';
	        }
	
	        return action;
	    }
	
	    /**
	     * Converts from a string key combination to an array
	     *
	     * @param  {string} combination like "command+shift+l"
	     * @return {Array}
	     */
	    function _keysFromString(combination) {
	        if (combination === '+') {
	            return ['+'];
	        }
	
	        combination = combination.replace(/\+{2}/g, '+plus');
	        return combination.split('+');
	    }
	
	    /**
	     * Gets info for a specific key combination
	     *
	     * @param  {string} combination key combination ("command+s" or "a" or "*")
	     * @param  {string=} action
	     * @returns {Object}
	     */
	    function _getKeyInfo(combination, action) {
	        var keys;
	        var key;
	        var i;
	        var modifiers = [];
	
	        // take the keys from this pattern and figure out what the actual
	        // pattern is all about
	        keys = _keysFromString(combination);
	
	        for (i = 0; i < keys.length; ++i) {
	            key = keys[i];
	
	            // normalize key names
	            if (_SPECIAL_ALIASES[key]) {
	                key = _SPECIAL_ALIASES[key];
	            }
	
	            // if this is not a keypress event then we should
	            // be smart about using shift keys
	            // this will only work for US keyboards however
	            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
	                key = _SHIFT_MAP[key];
	                modifiers.push('shift');
	            }
	
	            // if this key is a modifier then add it to the list of modifiers
	            if (_isModifier(key)) {
	                modifiers.push(key);
	            }
	        }
	
	        // depending on what the key combination is
	        // we will try to pick the best event for it
	        action = _pickBestAction(key, modifiers, action);
	
	        return {
	            key: key,
	            modifiers: modifiers,
	            action: action
	        };
	    }
	
	    function _belongsTo(element, ancestor) {
	        if (element === null || element === document) {
	            return false;
	        }
	
	        if (element === ancestor) {
	            return true;
	        }
	
	        return _belongsTo(element.parentNode, ancestor);
	    }
	
	    function Mousetrap(targetElement) {
	        var self = this;
	
	        targetElement = targetElement || document;
	
	        if (!(self instanceof Mousetrap)) {
	            return new Mousetrap(targetElement);
	        }
	
	        /**
	         * element to attach key events to
	         *
	         * @type {Element}
	         */
	        self.target = targetElement;
	
	        /**
	         * a list of all the callbacks setup via Mousetrap.bind()
	         *
	         * @type {Object}
	         */
	        self._callbacks = {};
	
	        /**
	         * direct map of string combinations to callbacks used for trigger()
	         *
	         * @type {Object}
	         */
	        self._directMap = {};
	
	        /**
	         * keeps track of what level each sequence is at since multiple
	         * sequences can start out with the same sequence
	         *
	         * @type {Object}
	         */
	        var _sequenceLevels = {};
	
	        /**
	         * variable to store the setTimeout call
	         *
	         * @type {null|number}
	         */
	        var _resetTimer;
	
	        /**
	         * temporary state where we will ignore the next keyup
	         *
	         * @type {boolean|string}
	         */
	        var _ignoreNextKeyup = false;
	
	        /**
	         * temporary state where we will ignore the next keypress
	         *
	         * @type {boolean}
	         */
	        var _ignoreNextKeypress = false;
	
	        /**
	         * are we currently inside of a sequence?
	         * type of action ("keyup" or "keydown" or "keypress") or false
	         *
	         * @type {boolean|string}
	         */
	        var _nextExpectedAction = false;
	
	        /**
	         * resets all sequence counters except for the ones passed in
	         *
	         * @param {Object} doNotReset
	         * @returns void
	         */
	        function _resetSequences(doNotReset) {
	            doNotReset = doNotReset || {};
	
	            var activeSequences = false,
	                key;
	
	            for (key in _sequenceLevels) {
	                if (doNotReset[key]) {
	                    activeSequences = true;
	                    continue;
	                }
	                _sequenceLevels[key] = 0;
	            }
	
	            if (!activeSequences) {
	                _nextExpectedAction = false;
	            }
	        }
	
	        /**
	         * finds all callbacks that match based on the keycode, modifiers,
	         * and action
	         *
	         * @param {string} character
	         * @param {Array} modifiers
	         * @param {Event|Object} e
	         * @param {string=} sequenceName - name of the sequence we are looking for
	         * @param {string=} combination
	         * @param {number=} level
	         * @returns {Array}
	         */
	        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
	            var i;
	            var callback;
	            var matches = [];
	            var action = e.type;
	
	            // if there are no events related to this keycode
	            if (!self._callbacks[character]) {
	                return [];
	            }
	
	            // if a modifier key is coming up on its own we should allow it
	            if (action == 'keyup' && _isModifier(character)) {
	                modifiers = [character];
	            }
	
	            // loop through all callbacks for the key that was pressed
	            // and see if any of them match
	            for (i = 0; i < self._callbacks[character].length; ++i) {
	                callback = self._callbacks[character][i];
	
	                // if a sequence name is not specified, but this is a sequence at
	                // the wrong level then move onto the next match
	                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
	                    continue;
	                }
	
	                // if the action we are looking for doesn't match the action we got
	                // then we should keep going
	                if (action != callback.action) {
	                    continue;
	                }
	
	                // if this is a keypress event and the meta key and control key
	                // are not pressed that means that we need to only look at the
	                // character, otherwise check the modifiers as well
	                //
	                // chrome will not fire a keypress if meta or control is down
	                // safari will fire a keypress if meta or meta+shift is down
	                // firefox will fire a keypress if meta or control is down
	                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {
	
	                    // when you bind a combination or sequence a second time it
	                    // should overwrite the first one.  if a sequenceName or
	                    // combination is specified in this call it does just that
	                    //
	                    // @todo make deleting its own method?
	                    var deleteCombo = !sequenceName && callback.combo == combination;
	                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
	                    if (deleteCombo || deleteSequence) {
	                        self._callbacks[character].splice(i, 1);
	                    }
	
	                    matches.push(callback);
	                }
	            }
	
	            return matches;
	        }
	
	        /**
	         * actually calls the callback function
	         *
	         * if your callback function returns false this will use the jquery
	         * convention - prevent default and stop propogation on the event
	         *
	         * @param {Function} callback
	         * @param {Event} e
	         * @returns void
	         */
	        function _fireCallback(callback, e, combo, sequence) {
	
	            // if this event should not happen stop here
	            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
	                return;
	            }
	
	            if (callback(e, combo) === false) {
	                _preventDefault(e);
	                _stopPropagation(e);
	            }
	        }
	
	        /**
	         * handles a character key event
	         *
	         * @param {string} character
	         * @param {Array} modifiers
	         * @param {Event} e
	         * @returns void
	         */
	        self._handleKey = function(character, modifiers, e) {
	            var callbacks = _getMatches(character, modifiers, e);
	            var i;
	            var doNotReset = {};
	            var maxLevel = 0;
	            var processedSequenceCallback = false;
	
	            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
	            for (i = 0; i < callbacks.length; ++i) {
	                if (callbacks[i].seq) {
	                    maxLevel = Math.max(maxLevel, callbacks[i].level);
	                }
	            }
	
	            // loop through matching callbacks for this key event
	            for (i = 0; i < callbacks.length; ++i) {
	
	                // fire for all sequence callbacks
	                // this is because if for example you have multiple sequences
	                // bound such as "g i" and "g t" they both need to fire the
	                // callback for matching g cause otherwise you can only ever
	                // match the first one
	                if (callbacks[i].seq) {
	
	                    // only fire callbacks for the maxLevel to prevent
	                    // subsequences from also firing
	                    //
	                    // for example 'a option b' should not cause 'option b' to fire
	                    // even though 'option b' is part of the other sequence
	                    //
	                    // any sequences that do not match here will be discarded
	                    // below by the _resetSequences call
	                    if (callbacks[i].level != maxLevel) {
	                        continue;
	                    }
	
	                    processedSequenceCallback = true;
	
	                    // keep a list of which sequences were matches for later
	                    doNotReset[callbacks[i].seq] = 1;
	                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
	                    continue;
	                }
	
	                // if there were no sequence matches but we are still here
	                // that means this is a regular match so we should fire that
	                if (!processedSequenceCallback) {
	                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
	                }
	            }
	
	            // if the key you pressed matches the type of sequence without
	            // being a modifier (ie "keyup" or "keypress") then we should
	            // reset all sequences that were not matched by this event
	            //
	            // this is so, for example, if you have the sequence "h a t" and you
	            // type "h e a r t" it does not match.  in this case the "e" will
	            // cause the sequence to reset
	            //
	            // modifier keys are ignored because you can have a sequence
	            // that contains modifiers such as "enter ctrl+space" and in most
	            // cases the modifier key will be pressed before the next key
	            //
	            // also if you have a sequence such as "ctrl+b a" then pressing the
	            // "b" key will trigger a "keypress" and a "keydown"
	            //
	            // the "keydown" is expected when there is a modifier, but the
	            // "keypress" ends up matching the _nextExpectedAction since it occurs
	            // after and that causes the sequence to reset
	            //
	            // we ignore keypresses in a sequence that directly follow a keydown
	            // for the same character
	            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
	            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
	                _resetSequences(doNotReset);
	            }
	
	            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
	        };
	
	        /**
	         * handles a keydown event
	         *
	         * @param {Event} e
	         * @returns void
	         */
	        function _handleKeyEvent(e) {
	
	            // normalize e.which for key events
	            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
	            if (typeof e.which !== 'number') {
	                e.which = e.keyCode;
	            }
	
	            var character = _characterFromEvent(e);
	
	            // no character found then stop
	            if (!character) {
	                return;
	            }
	
	            // need to use === for the character check because the character can be 0
	            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
	                _ignoreNextKeyup = false;
	                return;
	            }
	
	            self.handleKey(character, _eventModifiers(e), e);
	        }
	
	        /**
	         * called to set a 1 second timeout on the specified sequence
	         *
	         * this is so after each key press in the sequence you have 1 second
	         * to press the next key before you have to start over
	         *
	         * @returns void
	         */
	        function _resetSequenceTimer() {
	            clearTimeout(_resetTimer);
	            _resetTimer = setTimeout(_resetSequences, 1000);
	        }
	
	        /**
	         * binds a key sequence to an event
	         *
	         * @param {string} combo - combo specified in bind call
	         * @param {Array} keys
	         * @param {Function} callback
	         * @param {string=} action
	         * @returns void
	         */
	        function _bindSequence(combo, keys, callback, action) {
	
	            // start off by adding a sequence level record for this combination
	            // and setting the level to 0
	            _sequenceLevels[combo] = 0;
	
	            /**
	             * callback to increase the sequence level for this sequence and reset
	             * all other sequences that were active
	             *
	             * @param {string} nextAction
	             * @returns {Function}
	             */
	            function _increaseSequence(nextAction) {
	                return function() {
	                    _nextExpectedAction = nextAction;
	                    ++_sequenceLevels[combo];
	                    _resetSequenceTimer();
	                };
	            }
	
	            /**
	             * wraps the specified callback inside of another function in order
	             * to reset all sequence counters as soon as this sequence is done
	             *
	             * @param {Event} e
	             * @returns void
	             */
	            function _callbackAndReset(e) {
	                _fireCallback(callback, e, combo);
	
	                // we should ignore the next key up if the action is key down
	                // or keypress.  this is so if you finish a sequence and
	                // release the key the final key will not trigger a keyup
	                if (action !== 'keyup') {
	                    _ignoreNextKeyup = _characterFromEvent(e);
	                }
	
	                // weird race condition if a sequence ends with the key
	                // another sequence begins with
	                setTimeout(_resetSequences, 10);
	            }
	
	            // loop through keys one at a time and bind the appropriate callback
	            // function.  for any key leading up to the final one it should
	            // increase the sequence. after the final, it should reset all sequences
	            //
	            // if an action is specified in the original bind call then that will
	            // be used throughout.  otherwise we will pass the action that the
	            // next key in the sequence should match.  this allows a sequence
	            // to mix and match keypress and keydown events depending on which
	            // ones are better suited to the key provided
	            for (var i = 0; i < keys.length; ++i) {
	                var isFinal = i + 1 === keys.length;
	                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
	                _bindSingle(keys[i], wrappedCallback, action, combo, i);
	            }
	        }
	
	        /**
	         * binds a single keyboard combination
	         *
	         * @param {string} combination
	         * @param {Function} callback
	         * @param {string=} action
	         * @param {string=} sequenceName - name of sequence if part of sequence
	         * @param {number=} level - what part of the sequence the command is
	         * @returns void
	         */
	        function _bindSingle(combination, callback, action, sequenceName, level) {
	
	            // store a direct mapped reference for use with Mousetrap.trigger
	            self._directMap[combination + ':' + action] = callback;
	
	            // make sure multiple spaces in a row become a single space
	            combination = combination.replace(/\s+/g, ' ');
	
	            var sequence = combination.split(' ');
	            var info;
	
	            // if this pattern is a sequence of keys then run through this method
	            // to reprocess each pattern one key at a time
	            if (sequence.length > 1) {
	                _bindSequence(combination, sequence, callback, action);
	                return;
	            }
	
	            info = _getKeyInfo(combination, action);
	
	            // make sure to initialize array if this is the first time
	            // a callback is added for this key
	            self._callbacks[info.key] = self._callbacks[info.key] || [];
	
	            // remove an existing match if there is one
	            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);
	
	            // add this call back to the array
	            // if it is a sequence put it at the beginning
	            // if not put it at the end
	            //
	            // this is important because the way these are processed expects
	            // the sequence ones to come first
	            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
	                callback: callback,
	                modifiers: info.modifiers,
	                action: info.action,
	                seq: sequenceName,
	                level: level,
	                combo: combination
	            });
	        }
	
	        /**
	         * binds multiple combinations to the same callback
	         *
	         * @param {Array} combinations
	         * @param {Function} callback
	         * @param {string|undefined} action
	         * @returns void
	         */
	        self._bindMultiple = function(combinations, callback, action) {
	            for (var i = 0; i < combinations.length; ++i) {
	                _bindSingle(combinations[i], callback, action);
	            }
	        };
	
	        // start!
	        _addEvent(targetElement, 'keypress', _handleKeyEvent);
	        _addEvent(targetElement, 'keydown', _handleKeyEvent);
	        _addEvent(targetElement, 'keyup', _handleKeyEvent);
	    }
	
	    /**
	     * binds an event to mousetrap
	     *
	     * can be a single key, a combination of keys separated with +,
	     * an array of keys, or a sequence of keys separated by spaces
	     *
	     * be sure to list the modifier keys first to make sure that the
	     * correct key ends up getting bound (the last key in the pattern)
	     *
	     * @param {string|Array} keys
	     * @param {Function} callback
	     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
	     * @returns void
	     */
	    Mousetrap.prototype.bind = function(keys, callback, action) {
	        var self = this;
	        keys = keys instanceof Array ? keys : [keys];
	        self._bindMultiple.call(self, keys, callback, action);
	        return self;
	    };
	
	    /**
	     * unbinds an event to mousetrap
	     *
	     * the unbinding sets the callback function of the specified key combo
	     * to an empty function and deletes the corresponding key in the
	     * _directMap dict.
	     *
	     * TODO: actually remove this from the _callbacks dictionary instead
	     * of binding an empty function
	     *
	     * the keycombo+action has to be exactly the same as
	     * it was defined in the bind method
	     *
	     * @param {string|Array} keys
	     * @param {string} action
	     * @returns void
	     */
	    Mousetrap.prototype.unbind = function(keys, action) {
	        var self = this;
	        return self.bind.call(self, keys, function() {}, action);
	    };
	
	    /**
	     * triggers an event that has already been bound
	     *
	     * @param {string} keys
	     * @param {string=} action
	     * @returns void
	     */
	    Mousetrap.prototype.trigger = function(keys, action) {
	        var self = this;
	        if (self._directMap[keys + ':' + action]) {
	            self._directMap[keys + ':' + action]({}, keys);
	        }
	        return self;
	    };
	
	    /**
	     * resets the library back to its initial state.  this is useful
	     * if you want to clear out the current keyboard shortcuts and bind
	     * new ones - for example if you switch to another page
	     *
	     * @returns void
	     */
	    Mousetrap.prototype.reset = function() {
	        var self = this;
	        self._callbacks = {};
	        self._directMap = {};
	        return self;
	    };
	
	    /**
	     * should we stop this event before firing off callbacks
	     *
	     * @param {Event} e
	     * @param {Element} element
	     * @return {boolean}
	     */
	    Mousetrap.prototype.stopCallback = function(e, element) {
	        var self = this;
	
	        // if the element has the class "mousetrap" then no need to stop
	        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
	            return false;
	        }
	
	        if (_belongsTo(element, self.target)) {
	            return false;
	        }
	
	        // stop for input, select, and textarea
	        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
	    };
	
	    /**
	     * exposes _handleKey publicly so it can be overwritten by extensions
	     */
	    Mousetrap.prototype.handleKey = function() {
	        var self = this;
	        return self._handleKey.apply(self, arguments);
	    };
	
	    /**
	     * allow custom key mappings
	     */
	    Mousetrap.addKeycodes = function(object) {
	        for (var key in object) {
	            if (object.hasOwnProperty(key)) {
	                _MAP[key] = object[key];
	            }
	        }
	        _REVERSE_MAP = null;
	    };
	
	    /**
	     * Init the global mousetrap functions
	     *
	     * This method is needed to allow the global mousetrap functions to work
	     * now that mousetrap is a constructor function.
	     */
	    Mousetrap.init = function() {
	        var documentMousetrap = Mousetrap(document);
	        for (var method in documentMousetrap) {
	            if (method.charAt(0) !== '_') {
	                Mousetrap[method] = (function(method) {
	                    return function() {
	                        return documentMousetrap[method].apply(documentMousetrap, arguments);
	                    };
	                } (method));
	            }
	        }
	    };
	
	    Mousetrap.init();
	
	    // expose mousetrap to the global object
	    window.Mousetrap = Mousetrap;
	
	    // expose as a common js module
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = Mousetrap;
	    }
	
	    // expose mousetrap as an AMD module
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return Mousetrap;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDliMTYwMTgxNTQ4MzEyMzdkZjQiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vRWRpdG9yLmpzIiwid2VicGFjazovLy8uL0xlYWRlcmJvYXJkLmpzIiwid2VicGFjazovLy8uL1RlYW0uanMiLCJ3ZWJwYWNrOi8vLy4vVUkuanMiLCJ3ZWJwYWNrOi8vLy4vVGFicy5qcyIsIndlYnBhY2s6Ly8vLi9Tb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9tb3VzZXRyYXAvbW91c2V0cmFwLmpzIl0sIm5hbWVzIjpbImF4aW9zIiwicmVxdWlyZSIsIkFwcCIsIndpbmRvdyIsIiQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeSIsIiQkIiwicXVlcnlTZWxlY3RvckFsbCIsIkF1dGgiLCJib3giLCJ1c2VybmFtZSIsImxvZ2luQnRuIiwib25sb2FkIiwib25SZWFkeSIsImJpbmQiLCJyZW1lbWJlciIsImxvY2FsU3RvcmFnZSIsInVuZGVmaW5lZCIsInZhbHVlIiwibG9naW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJvbmNsaWNrIiwib25rZXlkb3duIiwiZSIsIndoaWNoIiwidXNpbmdMb2NhbFN0b3JhZ2UiLCJyZW1vdmUiLCJwb3N0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsInN0YXR1cyIsInN0YXJ0QXBwIiwiYWxlcnQiLCJtZXNzYWdlIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJsb2NhdGlvbiIsInJlbG9hZCIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJzdG9yZSIsImFwcCIsIkVkaXRvciIsIkxlYWRlcmJvYXJkIiwiVUkiLCJTb2NrZXQiLCJNb3VzZXRyYXAiLCJhdXRoIiwibW9kZSIsImNvbm5lY3Rpb24iLCJlZGl0b3IiLCJsZWFkZXJib2FyZCIsInVpIiwic29ja2V0IiwiaW5pdFNob3J0Y3V0cyIsImxvZ291dCIsImRpc2FibGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaWQiLCJhY2UiLCJlZGl0Iiwic2Vzc2lvbiIsImdldFNlc3Npb24iLCJzZXRUYWJTaXplIiwic2V0T3B0aW9ucyIsImVuYWJsZUJhc2ljQXV0b2NvbXBsZXRpb24iLCJlbmFibGVMaXZlQXV0b2NvbXBsZXRpb24iLCJzZXRUaGVtZSIsInNldExhbmciLCJvbiIsIm9uQ2hhbmdlIiwidGhlbWUiLCJsYW5nIiwic2V0TW9kZSIsImdldFZhbHVlIiwidmFsIiwic2V0VmFsdWUiLCJUZWFtIiwibGlzdCIsInRlYW1zIiwibmFtZSIsInNjb3JlIiwibmVlZHNVcGRhdGUiLCJ0ZWFtIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50IiwicHVzaCIsInVwZGF0ZVRlYW1zIiwiZ2V0VGVhbUJ5VXNlcm5hbWUiLCJjbGVhckFsbCIsImFkZFRlYW0iLCJpbml0UHJvZmlsZSIsImdldFRoaXNUZWFtIiwic2NvcmVzIiwicGxhY2UiLCJmaWx0ZXIiLCJpIiwiaW5kZXhPZiIsInNvcnQiLCJyZXZlcnNlIiwicmFuayIsIkEiLCJCIiwiX3JhbmsiLCJfcGxhY2UiLCJfc2NvcmUiLCJkZWZpbmVFbGVtZW50Iiwic2NvcmVFbGVtZW50IiwicHJvZ3Jlc3NFbGVtZW50IiwibGkiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwidG9wIiwib2Zmc2V0SGVpZ2h0IiwicmF0ZSIsIndpZHRoIiwiVGFicyIsInRhYnMiLCJ1c2VybmFtZVR4dCIsInNjb3JlVHh0IiwibXlUZWFtIiwic2Vjb25kcyIsInNlY3MiLCJtaW5zIiwidGFiIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbGVjdCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInRyeVRvUmVtZW1iZXIiLCJwYWdlIiwiaXRlbSIsInN0b3JlTGFzdFRhYlNlbGVjdGVkIiwiYWRkcmVzcyIsImlvIiwiY29ubmVjdCIsIm9uSW5pdGlhbFNldHRpbmdzIiwib25UaW1lU3luYyIsIl9jb25uZWN0ZWQiLCJ0ZXN0Q29ubmVjdGlvbkludGVydmFsIiwiaXNDb25uZWN0ZWQiLCJ0aW1lIiwiaW5pdGlhbGl6ZVRlYW1zIiwiZW1pdCIsImVudGVyTml0cm9Nb2RlIiwiZW50ZXJUaW1lc1VwTW9kZSIsInNldFRpbWVyIiwiY2hlY2tDb25uZWN0aW9uT25UaW1lclN5bmNlZCIsImNsZWFyVGltZW91dCIsInNob3VsZENvbm5lY3QiLCJvbkNvbm5lY3Rpb25Gb3VuZCIsIm9uQ29ubmVjdGlvbkxvc3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdENBLEtBQU1BLFFBQVEsbUJBQUFDLENBQVEsQ0FBUixDQUFkO0FBQ0EsS0FBTUMsTUFBTSxtQkFBQUQsQ0FBUSxFQUFSLENBQVo7O0FBRUFFLFFBQU9DLENBQVAsR0FBVztBQUFBLFlBQVNDLFNBQVNDLGFBQVQsQ0FBdUJDLEtBQXZCLENBQVQ7QUFBQSxFQUFYO0FBQ0FKLFFBQU9LLEVBQVAsR0FBWTtBQUFBLFlBQVNILFNBQVNJLGdCQUFULENBQTBCRixLQUExQixDQUFUO0FBQUEsRUFBWjs7S0FFTUcsSTtBQUNGLHFCQUFlO0FBQUE7O0FBQ1gsY0FBS0MsR0FBTCxHQUFXUCxFQUFFLFlBQUYsQ0FBWDtBQUNBLGNBQUtRLFFBQUwsR0FBZ0JSLEVBQUUsc0JBQUYsQ0FBaEI7QUFDQSxjQUFLUyxRQUFMLEdBQWdCVCxFQUFFLG1CQUFGLENBQWhCO0FBQ0FELGdCQUFPVyxNQUFQLEdBQWdCLEtBQUtDLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixDQUFoQjtBQUNBLGNBQUtDLFFBQUw7QUFDSDs7OztvQ0FDVztBQUNSLGlCQUFJQyxhQUFhLFVBQWIsTUFBNkJDLFNBQWpD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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0Esd0RBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7Ozs7Ozs7O0FDM0ZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUN2THRDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7Ozs7OztBQ1hBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVB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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLFNBQVM7QUFDNUIsb0JBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLE9BQU87QUFDMUIsb0JBQW1CLE1BQU07QUFDekIsb0JBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBdUIsc0JBQXNCOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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VGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDliMTYwMTgxNTQ4MzEyMzdkZjQiLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJylcbmNvbnN0IEFwcCA9IHJlcXVpcmUoJy4vQXBwJylcblxud2luZG93LiQgPSBxdWVyeSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KVxud2luZG93LiQkID0gcXVlcnkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSlcblxuY2xhc3MgQXV0aCB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLmJveCA9ICQoJy5mbG9hdC1ib3gnKVxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gJCgnLmZsb2F0LWJveCAudXNlcm5hbWUnKVxuICAgICAgICB0aGlzLmxvZ2luQnRuID0gJCgnLmZsb2F0LWJveCBidXR0b24nKVxuICAgICAgICB3aW5kb3cub25sb2FkID0gdGhpcy5vblJlYWR5LmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5yZW1lbWJlcigpXG4gICAgfVxuICAgIHJlbWVtYmVyICgpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZVsndXNlcm5hbWUnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJuYW1lLnZhbHVlID0gbG9jYWxTdG9yYWdlWyd1c2VybmFtZSddXG4gICAgICAgICAgICB0aGlzLmxvZ2luKHRydWUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RvcmUgKHVzZXJuYW1lKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZVsndXNlcm5hbWUnXSA9IHVzZXJuYW1lXG4gICAgfVxuICAgIG9uUmVhZHkgKCkge1xuICAgICAgICB0aGlzLmJveC5jbGFzc0xpc3QuYWRkKCdhbmltYXRlJylcbiAgICAgICAgdGhpcy5sb2dpbkJ0bi5vbmNsaWNrID0gKCkgPT4gdGhpcy5sb2dpbihmYWxzZSlcbiAgICAgICAgdGhpcy51c2VybmFtZS5vbmtleWRvd24gPSAoZSkgPT4geyBpZiAoZS53aGljaCA9PT0gMTMpIHRoaXMubG9naW4oZmFsc2UpIH1cbiAgICB9XG4gICAgbG9naW4gKHVzaW5nTG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIHRoaXMudXNlcm5hbWUuY2xhc3NMaXN0LnJlbW92ZSgnd3JvbmcnKVxuICAgICAgICBpZiAodGhpcy51c2VybmFtZS52YWx1ZSA9PT0gJycpIHRoaXMudXNlcm5hbWUuY2xhc3NMaXN0LmFkZCgnd3JvbmcnKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF4aW9zLnBvc3QoJy9sb2dpbicsIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZS52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBcHAodGhpcy51c2VybmFtZS52YWx1ZSwgdXNpbmdMb2NhbFN0b3JhZ2UpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VybmFtZS5jbGFzc0xpc3QuYWRkKCd3cm9uZycpXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3BvbnNlLmRhdGEubWVzc2FnZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvZ291dCAoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZVsndXNlcm5hbWUnXSA9ICcnXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH1cbiAgICBzdGFydEFwcCAodXNlcm5hbWUsIHVzaW5nTG9jYWxTdG9yYWdlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5ib3guY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgaWYgKHVzaW5nTG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmJveC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5ib3guc3R5bGUuZGlzcGxheSA9ICdub25lJywgMTAwMClcbiAgICAgICAgICAgIHRoaXMuc3RvcmUodXNlcm5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmFwcCA9IHRoaXMuYXBwID0gbmV3IEFwcCh0aGlzLCB1c2VybmFtZSlcbiAgICB9XG59XG5uZXcgQXV0aFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21haW4uanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyAmJiAhaXNBcnJheShvYmopKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB0aGlzLmRlZmF1bHRzLCB7IG1ldGhvZDogJ2dldCcgfSwgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9BeGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH1cblxuICAgICAgaWYgKCF1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IEVkaXRvciA9IHJlcXVpcmUoXCIuL0VkaXRvclwiKVxyXG5jb25zdCBMZWFkZXJib2FyZCA9IHJlcXVpcmUoXCIuL0xlYWRlcmJvYXJkXCIpXHJcbmNvbnN0IFVJID0gcmVxdWlyZShcIi4vVUlcIilcclxuY29uc3QgU29ja2V0ID0gcmVxdWlyZShcIi4vU29ja2V0XCIpXHJcbmNvbnN0IE1vdXNldHJhcCA9IHJlcXVpcmUoJ21vdXNldHJhcCcpXHJcblxyXG5jbGFzcyBBcHAge1xyXG4gICAgY29uc3RydWN0b3IgKGF1dGgsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoID0gYXV0aFxyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZVxyXG4gICAgICAgIHRoaXMubW9kZSA9ICdjb2RpbmcnXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0ge31cclxuICAgICAgICB0aGlzLmVkaXRvciA9IG5ldyBFZGl0b3IoXCJlZGl0b3JcIilcclxuICAgICAgICB0aGlzLmxlYWRlcmJvYXJkID0gbmV3IExlYWRlcmJvYXJkKHRoaXMsIFwiLnJhbmtzXCIpXHJcbiAgICAgICAgdGhpcy51aSA9IG5ldyBVSSh0aGlzKVxyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCAnLycpXHJcbiAgICAgICAgdGhpcy5pbml0U2hvcnRjdXRzKClcclxuICAgIH1cclxuICAgIGluaXRTaG9ydGN1dHMgKCkge1xyXG4gICAgICAgIE1vdXNldHJhcC5iaW5kKFwiYWx0IGFsdCBhbHQgYWx0IGFsdCBhbHRcIiwgKCkgPT4geyB0aGlzLmF1dGgubG9nb3V0KCkgfSlcclxuICAgIH1cclxuICAgIGVudGVyTml0cm9Nb2RlICgpIHtcclxuICAgICAgICB0aGlzLm1vZGUgPSAnbml0cm8nXHJcbiAgICAgICAgdGhpcy5sZWFkZXJib2FyZC5kaXNhYmxlKClcclxuICAgIH1cclxuICAgIGVudGVyVGltZXNVcE1vZGUgKCkge1xyXG4gICAgICAgIHRoaXMubW9kZSA9ICd0aW1lc3VwJ1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFwcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0FwcC5qcyIsImNsYXNzIEVkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvciAoaWQpIHtcclxuICAgICAgICBhY2UucmVxdWlyZShcImFjZS9leHQvbGFuZ3VhZ2VfdG9vbHNcIik7XHJcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBhY2UuZWRpdChpZCk7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpXHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLnNldFRhYlNpemUoNCk7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyh7XHJcbiAgICAgICAgICAgIGVuYWJsZUJhc2ljQXV0b2NvbXBsZXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIGVuYWJsZUxpdmVBdXRvY29tcGxldGlvbjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWUoXCJjbG91ZHNcIilcclxuICAgICAgICB0aGlzLnNldExhbmcoXCJqYXZhc2NyaXB0XCIpXHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcigpXHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLm9uKFwiY2hhbmdlXCIsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSlcclxuICAgIH1cclxuICAgIHJlbWVtYmVyICgpIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZVsnY29kZSddICE9PSB1bmRlZmluZWQpIHRoaXMudmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydjb2RlJ11cclxuICAgIH1cclxuICAgIHNldFRoZW1lICh0aGVtZSkge1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFRoZW1lKFwiYWNlL3RoZW1lL1wiICsgdGhlbWUpO1xyXG4gICAgfVxyXG4gICAgc2V0TGFuZyAobGFuZykge1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvXCIgKyBsYW5nKTtcclxuICAgIH1cclxuICAgIGdldCB2YWx1ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5nZXRWYWx1ZSgpXHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXRWYWx1ZSh2YWwpXHJcbiAgICB9XHJcbiAgICBvbkNoYW5nZSAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVsnY29kZSddID0gdGhpcy52YWx1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0VkaXRvci5qcyIsImNvbnN0IFRlYW0gPSByZXF1aXJlKFwiLi9UZWFtXCIpXHJcblxyXG5jbGFzcyBMZWFkZXJib2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwLCBxdWVyeSkge1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXHJcbiAgICAgICAgdGhpcy5saXN0ID0gJChxdWVyeSlcclxuICAgICAgICB0aGlzLnRlYW1zID0gW11cclxuICAgIH1cclxuICAgIGFkZFRlYW0gKGlkLCB1c2VybmFtZSwgbmFtZSwgc2NvcmUsIG5lZWRzVXBkYXRlID0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IHRlYW0gPSBuZXcgVGVhbSh0aGlzLCBpZCwgdXNlcm5hbWUsIG5hbWUsIHNjb3JlKVxyXG4gICAgICAgIHRoaXMubGlzdC5hcHBlbmRDaGlsZCh0ZWFtLmVsZW1lbnQpXHJcbiAgICAgICAgdGhpcy50ZWFtcy5wdXNoKHRlYW0pXHJcbiAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB0aGlzLnVwZGF0ZVRlYW1zKClcclxuICAgICAgICByZXR1cm4gdGVhbS5lbGVtZW50XHJcbiAgICB9XHJcbiAgICBjbGVhckFsbCAoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKSB7XHJcbiAgICAgICAgICAgIHRlYW0uZWxlbWVudC5yZW1vdmUoKVxyXG4gICAgICAgICAgICB0ZWFtID0gbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFRlYW1CeUlkIChpZCkge1xyXG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcykgaWYgKHRlYW0uaWQgPT0gaWQpIHJldHVybiB0ZWFtXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBnZXRUZWFtQnlVc2VybmFtZSAodXNlcm5hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCB0ZWFtIG9mIHRoaXMudGVhbXMpIGlmICh0ZWFtLnVzZXJuYW1lID09IHVzZXJuYW1lKSByZXR1cm4gdGVhbVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSBcclxuICAgIGdldFRoaXNUZWFtICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZWFtQnlVc2VybmFtZSh0aGlzLmFwcC51c2VybmFtZSlcclxuICAgIH1cclxuICAgIGluaXRpYWxpemVUZWFtcyAodGVhbXMpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWxsKClcclxuICAgICAgICBmb3IgKGxldCB1c2VybmFtZSBpbiB0ZWFtcykge1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gdGVhbXNbdXNlcm5hbWVdXHJcbiAgICAgICAgICAgIGlmICh1c2VybmFtZSA9PT0gdGhpcy5hcHAudXNlcm5hbWUpIHRlYW0uaWQgPSB0aGlzLmFwcC5jb25uZWN0aW9uLmlkXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVGVhbSh0ZWFtLmlkLCB1c2VybmFtZSwgdGVhbS5uYW1lLCB0ZWFtLnNjb3JlLCBmYWxzZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hcHAudWkuaW5pdFByb2ZpbGUodGhpcy5nZXRUaGlzVGVhbSgpKVxyXG4gICAgICAgIHRoaXMudXBkYXRlVGVhbXMoKVxyXG4gICAgfVxyXG4gICAgdXBkYXRlVGVhbXMgKCkge1xyXG4gICAgICAgIGxldCBzY29yZXMgPSBbXSwgcGxhY2UgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKSBzY29yZXMucHVzaCh0ZWFtLnNjb3JlKVxyXG4gICAgICAgIHNjb3JlcyA9IHNjb3Jlcy5maWx0ZXIoKHNjb3JlLCBpKSA9PiBzY29yZXMuaW5kZXhPZihzY29yZSkgPT0gaSkuc29ydCgpLnJldmVyc2UoKVxyXG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcykgdGVhbS5yYW5rID0gc2NvcmVzLmluZGV4T2YodGVhbS5zY29yZSkgKyAxXHJcbiAgICAgICAgdGhpcy50ZWFtcy5zb3J0KChBLCBCKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKEEucmFuayA8IEIucmFuaykgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICBpZihBLnJhbmsgPiBCLnJhbmspIHJldHVybiAxO1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcykgdGVhbS5wbGFjZSA9IHBsYWNlKytcclxuICAgIH1cclxuICAgIGRpc2FibGUgKCkge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMZWFkZXJib2FyZFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0xlYWRlcmJvYXJkLmpzIiwiY2xhc3MgVGVhbSB7XHJcbiAgICBjb25zdHJ1Y3RvciAobGVhZGVyYm9hcmQsIGlkLCB1c2VybmFtZSwgbmFtZSwgc2NvcmUpIHtcclxuICAgICAgICB0aGlzLmxlYWRlcmJvYXJkID0gbGVhZGVyYm9hcmRcclxuICAgICAgICB0aGlzLmlkID0gaWRcclxuICAgICAgICB0aGlzLl9yYW5rID0gMVxyXG4gICAgICAgIHRoaXMuX3BsYWNlID0gMFxyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWVcclxuICAgICAgICB0aGlzLl9zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5kZWZpbmVFbGVtZW50KClcclxuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0VsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKVxyXG4gICAgfVxyXG4gICAgZGVmaW5lRWxlbWVudCAoKSB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJuYW1lXCI+JHt0aGlzLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNjb3JlXCI+JHt0aGlzLnNjb3JlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+YFxyXG4gICAgICAgIGlmICh0aGlzLnVzZXJuYW1lID09PSB0aGlzLmxlYWRlcmJvYXJkLmFwcC51c2VybmFtZSkgbGkuY2xhc3NMaXN0LmFkZCgnbWUnKVxyXG4gICAgICAgIHJldHVybiBsaTtcclxuICAgIH1cclxuICAgIGdldCBzY29yZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3JlXHJcbiAgICB9XHJcbiAgICBzZXQgc2NvcmUgKHNjb3JlKSB7XHJcbiAgICAgICAgdGhpcy5fc2NvcmUgPSBzY29yZVxyXG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50LmlubmVySFRNTCA9IHNjb3JlXHJcbiAgICAgICAgdGhpcy5sZWFkZXJib2FyZC51cGRhdGVUZWFtcygpXHJcbiAgICB9XHJcbiAgICBnZXQgcGxhY2UgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZVxyXG4gICAgfVxyXG4gICAgc2V0IHBsYWNlIChwbGFjZSkge1xyXG4gICAgICAgIHRoaXMuX3BsYWNlID0gcGxhY2VcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gKHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQgKyA1KSAqIHRoaXMucGxhY2UgKyBcInB4XCJcclxuICAgIH1cclxuICAgIGdldCByYW5rICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFua1xyXG4gICAgfVxyXG4gICAgc2V0IHJhbmsgKHJhbmspIHtcclxuICAgICAgICB0aGlzLl9yYW5rID0gcmFua1xyXG4gICAgICAgIC8vIHRoaXMucmFua0VsZW1lbnQuaW5uZXJIVE1MID0gcmFua1xyXG4gICAgfVxyXG4gICAgc2V0IHByb2dyZXNzIChyYXRlKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0VsZW1lbnQuc3R5bGUud2lkdGggPSByYXRlICsgXCIlXCJcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUZWFtXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGVhbS5qcyIsImNvbnN0IFRhYnMgPSByZXF1aXJlKFwiLi9UYWJzXCIpXHJcblxyXG5jbGFzcyBVSSB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcclxuICAgICAgICB0aGlzLnRhYnMgPSBuZXcgVGFic1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWVUeHQgPSAkKCdoZWFkZXIgLnRlYW0gLm5hbWUnKVxyXG4gICAgICAgIHRoaXMuc2NvcmVUeHQgPSAkKCdoZWFkZXIgLnRlYW0gLnNjb3JlJylcclxuICAgIH1cclxuICAgIGluaXRQcm9maWxlIChteVRlYW0pIHtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lVHh0LmlubmVySFRNTCA9IG15VGVhbS5uYW1lXHJcbiAgICAgICAgdGhpcy5zY29yZVR4dC5pbm5lckhUTUwgPSBteVRlYW0uc2NvcmVcclxuICAgIH1cclxuICAgIHNldFRpbWVyIChzZWNvbmRzKSB7XHJcbiAgICAgICAgbGV0IHNlY3MgPSBzZWNvbmRzICUgNjBcclxuICAgICAgICBsZXQgbWlucyA9IChzZWNvbmRzIC0gc2VjcykgLyA2MFxyXG4gICAgICAgIGlmIChzZWNzIDwgMTApIHNlY3MgPSBcIjBcIiArIHNlY3NcclxuICAgICAgICAkKFwiaGVhZGVyID4gdGltZVwiKS5pbm5lckhUTUwgPSBzZWNvbmRzID4gMCA/IChtaW5zICsgXCI6XCIgKyBzZWNzKSA6IFwiVGltZSdzIHVwIVwiXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVUlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9VSS5qcyIsImNsYXNzIFRhYnMge1xyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIGNvbnN0IHRhYnMgPSAkJChcImJvZHkgPiBtYWluID4gc2VjdGlvbiA+IG5hdiA+IGxpXCIpXHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIHRhYnMpIHtcclxuICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHRoaXMuc2VsZWN0KGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtcGFnZVwiKSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJ5VG9SZW1lbWJlcigpXHJcbiAgICB9XHJcbiAgICB0cnlUb1JlbWVtYmVyICgpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlWyd0YWItc2VsZWN0ZWQnXSAhPT0gdW5kZWZpbmVkKSB0aGlzLnNlbGVjdChsb2NhbFN0b3JhZ2VbJ3RhYi1zZWxlY3RlZCddKVxyXG4gICAgICAgIGVsc2UgdGhpcy5zZWxlY3QoXCJjaGFsbGVuZ2VcIilcclxuICAgIH1cclxuICAgIHN0b3JlTGFzdFRhYlNlbGVjdGVkICh3aGljaCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZVsndGFiLXNlbGVjdGVkJ10gPSB3aGljaFxyXG4gICAgfVxyXG4gICAgc2VsZWN0ICh3aGljaCkge1xyXG4gICAgICAgIC8vIHNob3cgdGhlIHNlbGVjdGVkIHRhYiBhbmQgaGlkZSB0aGUgb3RoZXJzXHJcbiAgICAgICAgZm9yIChsZXQgcGFnZSBvZiAkJChcIi50YWItcGFnZVwiKSkgcGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAkKFwiLnRhYi1wYWdlI1wiICsgd2hpY2gpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIlxyXG4gICAgICAgIC8vIGRlYWN0aXZlIGFsbCBpdGVtcyBidXQgdGhlIHNlbGVjdGVkIGl0ZW0sIGFuZCBtYWtlIGl0IGFjdGl2ZVxyXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiAkJChgYm9keSA+IG1haW4gPiBzZWN0aW9uID4gbmF2ID4gbGlgKSkgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgJChgYm9keSA+IG1haW4gPiBzZWN0aW9uID4gbmF2ID4gbGk6bm90KC5zdWJtaXQpW2RhdGEtcGFnZT1cIiR7d2hpY2h9XCJdYCkuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgICAgIC8vIFN0b3JlXHJcbiAgICAgICAgdGhpcy5zdG9yZUxhc3RUYWJTZWxlY3RlZCh3aGljaClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYWJzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGFicy5qcyIsImNsYXNzIFNvY2tldCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwLCBhZGRyZXNzKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoYWRkcmVzcylcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignaW5pdGlhbC1zZXR0aW5ncycsIHRoaXMub25Jbml0aWFsU2V0dGluZ3MuYmluZCh0aGlzKSlcclxuICAgICAgICB0aGlzLnNvY2tldC5vbigndGltZS1zeW5jJywgdGhpcy5vblRpbWVTeW5jLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMudGVzdENvbm5lY3Rpb25JbnRlcnZhbCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlLCA1MDAwKVxyXG4gICAgfVxyXG4gICAgb25Jbml0aWFsU2V0dGluZ3MgKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmFwcC5jb25uZWN0aW9uLmlkID0gZGF0YS5pZFxyXG4gICAgICAgIHRoaXMub25UaW1lU3luYyhkYXRhLnRpbWUpXHJcbiAgICAgICAgdGhpcy5hcHAubGVhZGVyYm9hcmQuaW5pdGlhbGl6ZVRlYW1zKGRhdGEudGVhbXMpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgndXNlci1jb25uZWN0Jywge1xyXG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5hcHAudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmFwcC5jb25uZWN0aW9uLmlkXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIG9uVGltZVN5bmMgKHNlY29uZHMpIHtcclxuICAgICAgICBpZiAoc2Vjb25kcyA8ICgxMCAqIDYwKSAmJiB0aGlzLmFwcC5tb2RlID09PSAnY29kaW5nJykgdGhpcy5hcHAuZW50ZXJOaXRyb01vZGUoKVxyXG4gICAgICAgIGlmIChzZWNvbmRzIDw9IDAgJiYgKHRoaXMuYXBwLm1vZGUgPT09ICduaXRybycgfHwgdGhpcy5hcHAubW9kZSA9PT0gJ2NvZGluZycpKSB0aGlzLmFwcC5lbnRlclRpbWVzVXBNb2RlKClcclxuICAgICAgICB0aGlzLmFwcC51aS5zZXRUaW1lcihzZWNvbmRzKVxyXG4gICAgICAgIHRoaXMuY2hlY2tDb25uZWN0aW9uT25UaW1lclN5bmNlZCgpXHJcbiAgICB9XHJcbiAgICBjaGVja0Nvbm5lY3Rpb25PblRpbWVyU3luY2VkICgpIHtcclxuICAgICAgICB0aGlzLmlzQ29ubmVjdGVkID0gdHJ1ZVxyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRlc3RDb25uZWN0aW9uSW50ZXJ2YWwpXHJcbiAgICAgICAgdGhpcy50ZXN0Q29ubmVjdGlvbkludGVydmFsID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2UsIDUwMDApXHJcbiAgICB9XHJcbiAgICBnZXQgaXNDb25uZWN0ZWQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWRcclxuICAgIH1cclxuICAgIHNldCBpc0Nvbm5lY3RlZCAoc2hvdWxkQ29ubmVjdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY29ubmVjdGVkICYmIHNob3VsZENvbm5lY3QpIHRoaXMub25Db25uZWN0aW9uRm91bmQoKVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2Nvbm5lY3RlZCAmJiAhc2hvdWxkQ29ubmVjdCkgdGhpcy5vbkNvbm5lY3Rpb25Mb3N0KClcclxuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBzaG91bGRDb25uZWN0XHJcbiAgICB9XHJcbiAgICBvbkNvbm5lY3Rpb25Gb3VuZCAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIEZvdW5kIVwiKVxyXG4gICAgfVxyXG4gICAgb25Db25uZWN0aW9uTG9zdCAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIExvc3QhXCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29ja2V0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vU29ja2V0LmpzIiwiLypnbG9iYWwgZGVmaW5lOmZhbHNlICovXG4vKipcbiAqIENvcHlyaWdodCAyMDEyLTIwMTcgQ3JhaWcgQ2FtcGJlbGxcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBNb3VzZXRyYXAgaXMgYSBzaW1wbGUga2V5Ym9hcmQgc2hvcnRjdXQgbGlicmFyeSBmb3IgSmF2YXNjcmlwdCB3aXRoXG4gKiBubyBleHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqXG4gKiBAdmVyc2lvbiAxLjYuMVxuICogQHVybCBjcmFpZy5pcy9raWxsaW5nL21pY2VcbiAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG4gICAgLy8gQ2hlY2sgaWYgbW91c2V0cmFwIGlzIHVzZWQgaW5zaWRlIGJyb3dzZXIsIGlmIG5vdCwgcmV0dXJuXG4gICAgaWYgKCF3aW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG1hcHBpbmcgb2Ygc3BlY2lhbCBrZXljb2RlcyB0byB0aGVpciBjb3JyZXNwb25kaW5nIGtleXNcbiAgICAgKlxuICAgICAqIGV2ZXJ5dGhpbmcgaW4gdGhpcyBkaWN0aW9uYXJ5IGNhbm5vdCB1c2Uga2V5cHJlc3MgZXZlbnRzXG4gICAgICogc28gaXQgaGFzIHRvIGJlIGhlcmUgdG8gbWFwIHRvIHRoZSBjb3JyZWN0IGtleWNvZGVzIGZvclxuICAgICAqIGtleXVwL2tleWRvd24gZXZlbnRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfTUFQID0ge1xuICAgICAgICA4OiAnYmFja3NwYWNlJyxcbiAgICAgICAgOTogJ3RhYicsXG4gICAgICAgIDEzOiAnZW50ZXInLFxuICAgICAgICAxNjogJ3NoaWZ0JyxcbiAgICAgICAgMTc6ICdjdHJsJyxcbiAgICAgICAgMTg6ICdhbHQnLFxuICAgICAgICAyMDogJ2NhcHNsb2NrJyxcbiAgICAgICAgMjc6ICdlc2MnLFxuICAgICAgICAzMjogJ3NwYWNlJyxcbiAgICAgICAgMzM6ICdwYWdldXAnLFxuICAgICAgICAzNDogJ3BhZ2Vkb3duJyxcbiAgICAgICAgMzU6ICdlbmQnLFxuICAgICAgICAzNjogJ2hvbWUnLFxuICAgICAgICAzNzogJ2xlZnQnLFxuICAgICAgICAzODogJ3VwJyxcbiAgICAgICAgMzk6ICdyaWdodCcsXG4gICAgICAgIDQwOiAnZG93bicsXG4gICAgICAgIDQ1OiAnaW5zJyxcbiAgICAgICAgNDY6ICdkZWwnLFxuICAgICAgICA5MTogJ21ldGEnLFxuICAgICAgICA5MzogJ21ldGEnLFxuICAgICAgICAyMjQ6ICdtZXRhJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBtYXBwaW5nIGZvciBzcGVjaWFsIGNoYXJhY3RlcnMgc28gdGhleSBjYW4gc3VwcG9ydFxuICAgICAqXG4gICAgICogdGhpcyBkaWN0aW9uYXJ5IGlzIG9ubHkgdXNlZCBpbmNhc2UgeW91IHdhbnQgdG8gYmluZCBhXG4gICAgICoga2V5dXAgb3Iga2V5ZG93biBldmVudCB0byBvbmUgb2YgdGhlc2Uga2V5c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX0tFWUNPREVfTUFQID0ge1xuICAgICAgICAxMDY6ICcqJyxcbiAgICAgICAgMTA3OiAnKycsXG4gICAgICAgIDEwOTogJy0nLFxuICAgICAgICAxMTA6ICcuJyxcbiAgICAgICAgMTExIDogJy8nLFxuICAgICAgICAxODY6ICc7JyxcbiAgICAgICAgMTg3OiAnPScsXG4gICAgICAgIDE4ODogJywnLFxuICAgICAgICAxODk6ICctJyxcbiAgICAgICAgMTkwOiAnLicsXG4gICAgICAgIDE5MTogJy8nLFxuICAgICAgICAxOTI6ICdgJyxcbiAgICAgICAgMjE5OiAnWycsXG4gICAgICAgIDIyMDogJ1xcXFwnLFxuICAgICAgICAyMjE6ICddJyxcbiAgICAgICAgMjIyOiAnXFwnJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0aGlzIGlzIGEgbWFwcGluZyBvZiBrZXlzIHRoYXQgcmVxdWlyZSBzaGlmdCBvbiBhIFVTIGtleXBhZFxuICAgICAqIGJhY2sgdG8gdGhlIG5vbiBzaGlmdCBlcXVpdmVsZW50c1xuICAgICAqXG4gICAgICogdGhpcyBpcyBzbyB5b3UgY2FuIHVzZSBrZXl1cCBldmVudHMgd2l0aCB0aGVzZSBrZXlzXG4gICAgICpcbiAgICAgKiBub3RlIHRoYXQgdGhpcyB3aWxsIG9ubHkgd29yayByZWxpYWJseSBvbiBVUyBrZXlib2FyZHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9TSElGVF9NQVAgPSB7XG4gICAgICAgICd+JzogJ2AnLFxuICAgICAgICAnISc6ICcxJyxcbiAgICAgICAgJ0AnOiAnMicsXG4gICAgICAgICcjJzogJzMnLFxuICAgICAgICAnJCc6ICc0JyxcbiAgICAgICAgJyUnOiAnNScsXG4gICAgICAgICdeJzogJzYnLFxuICAgICAgICAnJic6ICc3JyxcbiAgICAgICAgJyonOiAnOCcsXG4gICAgICAgICcoJzogJzknLFxuICAgICAgICAnKSc6ICcwJyxcbiAgICAgICAgJ18nOiAnLScsXG4gICAgICAgICcrJzogJz0nLFxuICAgICAgICAnOic6ICc7JyxcbiAgICAgICAgJ1xcXCInOiAnXFwnJyxcbiAgICAgICAgJzwnOiAnLCcsXG4gICAgICAgICc+JzogJy4nLFxuICAgICAgICAnPyc6ICcvJyxcbiAgICAgICAgJ3wnOiAnXFxcXCdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdGhpcyBpcyBhIGxpc3Qgb2Ygc3BlY2lhbCBzdHJpbmdzIHlvdSBjYW4gdXNlIHRvIG1hcFxuICAgICAqIHRvIG1vZGlmaWVyIGtleXMgd2hlbiB5b3Ugc3BlY2lmeSB5b3VyIGtleWJvYXJkIHNob3J0Y3V0c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX1NQRUNJQUxfQUxJQVNFUyA9IHtcbiAgICAgICAgJ29wdGlvbic6ICdhbHQnLFxuICAgICAgICAnY29tbWFuZCc6ICdtZXRhJyxcbiAgICAgICAgJ3JldHVybic6ICdlbnRlcicsXG4gICAgICAgICdlc2NhcGUnOiAnZXNjJyxcbiAgICAgICAgJ3BsdXMnOiAnKycsXG4gICAgICAgICdtb2QnOiAvTWFjfGlQb2R8aVBob25lfGlQYWQvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSA/ICdtZXRhJyA6ICdjdHJsJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB2YXJpYWJsZSB0byBzdG9yZSB0aGUgZmxpcHBlZCB2ZXJzaW9uIG9mIF9NQVAgZnJvbSBhYm92ZVxuICAgICAqIG5lZWRlZCB0byBjaGVjayBpZiB3ZSBzaG91bGQgdXNlIGtleXByZXNzIG9yIG5vdCB3aGVuIG5vIGFjdGlvblxuICAgICAqIGlzIHNwZWNpZmllZFxuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdHx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdmFyIF9SRVZFUlNFX01BUDtcblxuICAgIC8qKlxuICAgICAqIGxvb3AgdGhyb3VnaCB0aGUgZiBrZXlzLCBmMSB0byBmMTkgYW5kIGFkZCB0aGVtIHRvIHRoZSBtYXBcbiAgICAgKiBwcm9ncmFtYXRpY2FsbHlcbiAgICAgKi9cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDIwOyArK2kpIHtcbiAgICAgICAgX01BUFsxMTEgKyBpXSA9ICdmJyArIGk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9vcCB0aHJvdWdoIHRvIG1hcCBudW1iZXJzIG9uIHRoZSBudW1lcmljIGtleXBhZFxuICAgICAqL1xuICAgIGZvciAoaSA9IDA7IGkgPD0gOTsgKytpKSB7XG5cbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byB1c2UgYSBzdHJpbmcgY2F1c2Ugb3RoZXJ3aXNlIHNpbmNlIDAgaXMgZmFsc2V5XG4gICAgICAgIC8vIG1vdXNldHJhcCB3aWxsIG5ldmVyIGZpcmUgZm9yIG51bXBhZCAwIHByZXNzZWQgYXMgcGFydCBvZiBhIGtleWRvd25cbiAgICAgICAgLy8gZXZlbnQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2NjYW1wYmVsbC9tb3VzZXRyYXAvcHVsbC8yNThcbiAgICAgICAgX01BUFtpICsgOTZdID0gaS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNyb3NzIGJyb3dzZXIgYWRkIGV2ZW50IG1ldGhvZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fEhUTUxEb2N1bWVudH0gb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfYWRkRXZlbnQob2JqZWN0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAob2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9iamVjdC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvYmplY3QuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0YWtlcyB0aGUgZXZlbnQgYW5kIHJldHVybnMgdGhlIGtleSBjaGFyYWN0ZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2NoYXJhY3RlckZyb21FdmVudChlKSB7XG5cbiAgICAgICAgLy8gZm9yIGtleXByZXNzIGV2ZW50cyB3ZSBzaG91bGQgcmV0dXJuIHRoZSBjaGFyYWN0ZXIgYXMgaXNcbiAgICAgICAgaWYgKGUudHlwZSA9PSAna2V5cHJlc3MnKSB7XG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBub3QgcHJlc3NlZCB0aGVuIGl0IGlzIHNhZmUgdG8gYXNzdW1lXG4gICAgICAgICAgICAvLyB0aGF0IHdlIHdhbnQgdGhlIGNoYXJhY3RlciB0byBiZSBsb3dlcmNhc2UuICB0aGlzIG1lYW5zIGlmXG4gICAgICAgICAgICAvLyB5b3UgYWNjaWRlbnRhbGx5IGhhdmUgY2FwcyBsb2NrIG9uIHRoZW4geW91ciBrZXkgYmluZGluZ3NcbiAgICAgICAgICAgIC8vIHdpbGwgY29udGludWUgdG8gd29ya1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoZSBvbmx5IHNpZGUgZWZmZWN0IHRoYXQgbWlnaHQgbm90IGJlIGRlc2lyZWQgaXMgaWYgeW91XG4gICAgICAgICAgICAvLyBiaW5kIHNvbWV0aGluZyBsaWtlICdBJyBjYXVzZSB5b3Ugd2FudCB0byB0cmlnZ2VyIGFuXG4gICAgICAgICAgICAvLyBldmVudCB3aGVuIGNhcGl0YWwgQSBpcyBwcmVzc2VkIGNhcHMgbG9jayB3aWxsIG5vIGxvbmdlclxuICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQuICBzaGlmdCthIHdpbGwgdGhvdWdoLlxuICAgICAgICAgICAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3Igbm9uIGtleXByZXNzIGV2ZW50cyB0aGUgc3BlY2lhbCBtYXBzIGFyZSBuZWVkZWRcbiAgICAgICAgaWYgKF9NQVBbZS53aGljaF0pIHtcbiAgICAgICAgICAgIHJldHVybiBfTUFQW2Uud2hpY2hdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9LRVlDT0RFX01BUFtlLndoaWNoXSkge1xuICAgICAgICAgICAgcmV0dXJuIF9LRVlDT0RFX01BUFtlLndoaWNoXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGl0IGlzIG5vdCBpbiB0aGUgc3BlY2lhbCBtYXBcblxuICAgICAgICAvLyB3aXRoIGtleWRvd24gYW5kIGtleXVwIGV2ZW50cyB0aGUgY2hhcmFjdGVyIHNlZW1zIHRvIGFsd2F5c1xuICAgICAgICAvLyBjb21lIGluIGFzIGFuIHVwcGVyY2FzZSBjaGFyYWN0ZXIgd2hldGhlciB5b3UgYXJlIHByZXNzaW5nIHNoaWZ0XG4gICAgICAgIC8vIG9yIG5vdC4gIHdlIHNob3VsZCBtYWtlIHN1cmUgaXQgaXMgYWx3YXlzIGxvd2VyY2FzZSBmb3IgY29tcGFyaXNvbnNcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGVja3MgaWYgdHdvIGFycmF5cyBhcmUgZXF1YWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyczFcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX21vZGlmaWVyc01hdGNoKG1vZGlmaWVyczEsIG1vZGlmaWVyczIpIHtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVyczEuc29ydCgpLmpvaW4oJywnKSA9PT0gbW9kaWZpZXJzMi5zb3J0KCkuam9pbignLCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRha2VzIGEga2V5IGV2ZW50IGFuZCBmaWd1cmVzIG91dCB3aGF0IHRoZSBtb2RpZmllcnMgYXJlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9ldmVudE1vZGlmaWVycyhlKSB7XG4gICAgICAgIHZhciBtb2RpZmllcnMgPSBbXTtcblxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3NoaWZ0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdhbHQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmN0cmxLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdjdHJsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnbWV0YScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcmV2ZW50cyBkZWZhdWx0IGZvciB0aGlzIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9wcmV2ZW50RGVmYXVsdChlKSB7XG4gICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RvcHMgcHJvcG9nYXRpb24gZm9yIHRoaXMgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3N0b3BQcm9wYWdhdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBrZXljb2RlIHNwZWNpZmllZCBpcyBhIG1vZGlmaWVyIGtleSBvciBub3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfaXNNb2RpZmllcihrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSAnc2hpZnQnIHx8IGtleSA9PSAnY3RybCcgfHwga2V5ID09ICdhbHQnIHx8IGtleSA9PSAnbWV0YSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV2ZXJzZXMgdGhlIG1hcCBsb29rdXAgc28gdGhhdCB3ZSBjYW4gbG9vayBmb3Igc3BlY2lmaWMga2V5c1xuICAgICAqIHRvIHNlZSB3aGF0IGNhbiBhbmQgY2FuJ3QgdXNlIGtleXByZXNzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldFJldmVyc2VNYXAoKSB7XG4gICAgICAgIGlmICghX1JFVkVSU0VfTUFQKSB7XG4gICAgICAgICAgICBfUkVWRVJTRV9NQVAgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBfTUFQKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBwdWxsIG91dCB0aGUgbnVtZXJpYyBrZXlwYWQgZnJvbSBoZXJlIGNhdXNlIGtleXByZXNzIHNob3VsZFxuICAgICAgICAgICAgICAgIC8vIGJlIGFibGUgdG8gZGV0ZWN0IHRoZSBrZXlzIGZyb20gdGhlIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPiA5NSAmJiBrZXkgPCAxMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9NQVAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBfUkVWRVJTRV9NQVBbX01BUFtrZXldXSA9IGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9SRVZFUlNFX01BUDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwaWNrcyB0aGUgYmVzdCBhY3Rpb24gYmFzZWQgb24gdGhlIGtleSBjb21iaW5hdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGNoYXJhY3RlciBmb3Iga2V5XG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb24gcGFzc2VkIGluXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3BpY2tCZXN0QWN0aW9uKGtleSwgbW9kaWZpZXJzLCBhY3Rpb24pIHtcblxuICAgICAgICAvLyBpZiBubyBhY3Rpb24gd2FzIHBpY2tlZCBpbiB3ZSBzaG91bGQgdHJ5IHRvIHBpY2sgdGhlIG9uZVxuICAgICAgICAvLyB0aGF0IHdlIHRoaW5rIHdvdWxkIHdvcmsgYmVzdCBmb3IgdGhpcyBrZXlcbiAgICAgICAgaWYgKCFhY3Rpb24pIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IF9nZXRSZXZlcnNlTWFwKClba2V5XSA/ICdrZXlkb3duJyA6ICdrZXlwcmVzcyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb2RpZmllciBrZXlzIGRvbid0IHdvcmsgYXMgZXhwZWN0ZWQgd2l0aCBrZXlwcmVzcyxcbiAgICAgICAgLy8gc3dpdGNoIHRvIGtleWRvd25cbiAgICAgICAgaWYgKGFjdGlvbiA9PSAna2V5cHJlc3MnICYmIG1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdrZXlkb3duJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgZnJvbSBhIHN0cmluZyBrZXkgY29tYmluYXRpb24gdG8gYW4gYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29tYmluYXRpb24gbGlrZSBcImNvbW1hbmQrc2hpZnQrbFwiXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2tleXNGcm9tU3RyaW5nKGNvbWJpbmF0aW9uKSB7XG4gICAgICAgIGlmIChjb21iaW5hdGlvbiA9PT0gJysnKSB7XG4gICAgICAgICAgICByZXR1cm4gWycrJ107XG4gICAgICAgIH1cblxuICAgICAgICBjb21iaW5hdGlvbiA9IGNvbWJpbmF0aW9uLnJlcGxhY2UoL1xcK3syfS9nLCAnK3BsdXMnKTtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmF0aW9uLnNwbGl0KCcrJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvIGZvciBhIHNwZWNpZmljIGtleSBjb21iaW5hdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBjb21iaW5hdGlvbiBrZXkgY29tYmluYXRpb24gKFwiY29tbWFuZCtzXCIgb3IgXCJhXCIgb3IgXCIqXCIpXG4gICAgICogQHBhcmFtICB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0S2V5SW5mbyhjb21iaW5hdGlvbiwgYWN0aW9uKSB7XG4gICAgICAgIHZhciBrZXlzO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIG1vZGlmaWVycyA9IFtdO1xuXG4gICAgICAgIC8vIHRha2UgdGhlIGtleXMgZnJvbSB0aGlzIHBhdHRlcm4gYW5kIGZpZ3VyZSBvdXQgd2hhdCB0aGUgYWN0dWFsXG4gICAgICAgIC8vIHBhdHRlcm4gaXMgYWxsIGFib3V0XG4gICAgICAgIGtleXMgPSBfa2V5c0Zyb21TdHJpbmcoY29tYmluYXRpb24pO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUga2V5IG5hbWVzXG4gICAgICAgICAgICBpZiAoX1NQRUNJQUxfQUxJQVNFU1trZXldKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gX1NQRUNJQUxfQUxJQVNFU1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIG5vdCBhIGtleXByZXNzIGV2ZW50IHRoZW4gd2Ugc2hvdWxkXG4gICAgICAgICAgICAvLyBiZSBzbWFydCBhYm91dCB1c2luZyBzaGlmdCBrZXlzXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgb25seSB3b3JrIGZvciBVUyBrZXlib2FyZHMgaG93ZXZlclxuICAgICAgICAgICAgaWYgKGFjdGlvbiAmJiBhY3Rpb24gIT0gJ2tleXByZXNzJyAmJiBfU0hJRlRfTUFQW2tleV0pIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBfU0hJRlRfTUFQW2tleV07XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3NoaWZ0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMga2V5IGlzIGEgbW9kaWZpZXIgdGhlbiBhZGQgaXQgdG8gdGhlIGxpc3Qgb2YgbW9kaWZpZXJzXG4gICAgICAgICAgICBpZiAoX2lzTW9kaWZpZXIoa2V5KSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXBlbmRpbmcgb24gd2hhdCB0aGUga2V5IGNvbWJpbmF0aW9uIGlzXG4gICAgICAgIC8vIHdlIHdpbGwgdHJ5IHRvIHBpY2sgdGhlIGJlc3QgZXZlbnQgZm9yIGl0XG4gICAgICAgIGFjdGlvbiA9IF9waWNrQmVzdEFjdGlvbihrZXksIG1vZGlmaWVycywgYWN0aW9uKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBtb2RpZmllcnM6IG1vZGlmaWVycyxcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2JlbG9uZ3NUbyhlbGVtZW50LCBhbmNlc3Rvcikge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IGFuY2VzdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfYmVsb25nc1RvKGVsZW1lbnQucGFyZW50Tm9kZSwgYW5jZXN0b3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIE1vdXNldHJhcCh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0YXJnZXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudCB8fCBkb2N1bWVudDtcblxuICAgICAgICBpZiAoIShzZWxmIGluc3RhbmNlb2YgTW91c2V0cmFwKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNb3VzZXRyYXAodGFyZ2V0RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZWxlbWVudCB0byBhdHRhY2gga2V5IGV2ZW50cyB0b1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGYudGFyZ2V0ID0gdGFyZ2V0RWxlbWVudDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYSBsaXN0IG9mIGFsbCB0aGUgY2FsbGJhY2tzIHNldHVwIHZpYSBNb3VzZXRyYXAuYmluZCgpXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9jYWxsYmFja3MgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGlyZWN0IG1hcCBvZiBzdHJpbmcgY29tYmluYXRpb25zIHRvIGNhbGxiYWNrcyB1c2VkIGZvciB0cmlnZ2VyKClcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2RpcmVjdE1hcCA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBrZWVwcyB0cmFjayBvZiB3aGF0IGxldmVsIGVhY2ggc2VxdWVuY2UgaXMgYXQgc2luY2UgbXVsdGlwbGVcbiAgICAgICAgICogc2VxdWVuY2VzIGNhbiBzdGFydCBvdXQgd2l0aCB0aGUgc2FtZSBzZXF1ZW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9zZXF1ZW5jZUxldmVscyA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB2YXJpYWJsZSB0byBzdG9yZSB0aGUgc2V0VGltZW91dCBjYWxsXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudWxsfG51bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfcmVzZXRUaW1lcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdGVtcG9yYXJ5IHN0YXRlIHdoZXJlIHdlIHdpbGwgaWdub3JlIHRoZSBuZXh0IGtleXVwXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufHN0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfaWdub3JlTmV4dEtleXVwID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRlbXBvcmFyeSBzdGF0ZSB3aGVyZSB3ZSB3aWxsIGlnbm9yZSB0aGUgbmV4dCBrZXlwcmVzc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfaWdub3JlTmV4dEtleXByZXNzID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFyZSB3ZSBjdXJyZW50bHkgaW5zaWRlIG9mIGEgc2VxdWVuY2U/XG4gICAgICAgICAqIHR5cGUgb2YgYWN0aW9uIChcImtleXVwXCIgb3IgXCJrZXlkb3duXCIgb3IgXCJrZXlwcmVzc1wiKSBvciBmYWxzZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX25leHRFeHBlY3RlZEFjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXNldHMgYWxsIHNlcXVlbmNlIGNvdW50ZXJzIGV4Y2VwdCBmb3IgdGhlIG9uZXMgcGFzc2VkIGluXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkb05vdFJlc2V0XG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9yZXNldFNlcXVlbmNlcyhkb05vdFJlc2V0KSB7XG4gICAgICAgICAgICBkb05vdFJlc2V0ID0gZG9Ob3RSZXNldCB8fCB7fTtcblxuICAgICAgICAgICAgdmFyIGFjdGl2ZVNlcXVlbmNlcyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtleTtcblxuICAgICAgICAgICAgZm9yIChrZXkgaW4gX3NlcXVlbmNlTGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvTm90UmVzZXRba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZXF1ZW5jZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3NlcXVlbmNlTGV2ZWxzW2tleV0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZVNlcXVlbmNlcykge1xuICAgICAgICAgICAgICAgIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBmaW5kcyBhbGwgY2FsbGJhY2tzIHRoYXQgbWF0Y2ggYmFzZWQgb24gdGhlIGtleWNvZGUsIG1vZGlmaWVycyxcbiAgICAgICAgICogYW5kIGFjdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcmFjdGVyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fE9iamVjdH0gZVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IHNlcXVlbmNlTmFtZSAtIG5hbWUgb2YgdGhlIHNlcXVlbmNlIHdlIGFyZSBsb29raW5nIGZvclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGNvbWJpbmF0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gbGV2ZWxcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2dldE1hdGNoZXMoY2hhcmFjdGVyLCBtb2RpZmllcnMsIGUsIHNlcXVlbmNlTmFtZSwgY29tYmluYXRpb24sIGxldmVsKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjaztcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gW107XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gZS50eXBlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHJlbGF0ZWQgdG8gdGhpcyBrZXljb2RlXG4gICAgICAgICAgICBpZiAoIXNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBhIG1vZGlmaWVyIGtleSBpcyBjb21pbmcgdXAgb24gaXRzIG93biB3ZSBzaG91bGQgYWxsb3cgaXRcbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2tleXVwJyAmJiBfaXNNb2RpZmllcihjaGFyYWN0ZXIpKSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzID0gW2NoYXJhY3Rlcl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY2FsbGJhY2tzIGZvciB0aGUga2V5IHRoYXQgd2FzIHByZXNzZWRcbiAgICAgICAgICAgIC8vIGFuZCBzZWUgaWYgYW55IG9mIHRoZW0gbWF0Y2hcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl1baV07XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBhIHNlcXVlbmNlIG5hbWUgaXMgbm90IHNwZWNpZmllZCwgYnV0IHRoaXMgaXMgYSBzZXF1ZW5jZSBhdFxuICAgICAgICAgICAgICAgIC8vIHRoZSB3cm9uZyBsZXZlbCB0aGVuIG1vdmUgb250byB0aGUgbmV4dCBtYXRjaFxuICAgICAgICAgICAgICAgIGlmICghc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLnNlcSAmJiBfc2VxdWVuY2VMZXZlbHNbY2FsbGJhY2suc2VxXSAhPSBjYWxsYmFjay5sZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWN0aW9uIHdlIGFyZSBsb29raW5nIGZvciBkb2Vzbid0IG1hdGNoIHRoZSBhY3Rpb24gd2UgZ290XG4gICAgICAgICAgICAgICAgLy8gdGhlbiB3ZSBzaG91bGQga2VlcCBnb2luZ1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gIT0gY2FsbGJhY2suYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSBrZXlwcmVzcyBldmVudCBhbmQgdGhlIG1ldGEga2V5IGFuZCBjb250cm9sIGtleVxuICAgICAgICAgICAgICAgIC8vIGFyZSBub3QgcHJlc3NlZCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBvbmx5IGxvb2sgYXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyLCBvdGhlcndpc2UgY2hlY2sgdGhlIG1vZGlmaWVycyBhcyB3ZWxsXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBjaHJvbWUgd2lsbCBub3QgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgY29udHJvbCBpcyBkb3duXG4gICAgICAgICAgICAgICAgLy8gc2FmYXJpIHdpbGwgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgbWV0YStzaGlmdCBpcyBkb3duXG4gICAgICAgICAgICAgICAgLy8gZmlyZWZveCB3aWxsIGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIGNvbnRyb2wgaXMgZG93blxuICAgICAgICAgICAgICAgIGlmICgoYWN0aW9uID09ICdrZXlwcmVzcycgJiYgIWUubWV0YUtleSAmJiAhZS5jdHJsS2V5KSB8fCBfbW9kaWZpZXJzTWF0Y2gobW9kaWZpZXJzLCBjYWxsYmFjay5tb2RpZmllcnMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB5b3UgYmluZCBhIGNvbWJpbmF0aW9uIG9yIHNlcXVlbmNlIGEgc2Vjb25kIHRpbWUgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIG92ZXJ3cml0ZSB0aGUgZmlyc3Qgb25lLiAgaWYgYSBzZXF1ZW5jZU5hbWUgb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tYmluYXRpb24gaXMgc3BlY2lmaWVkIGluIHRoaXMgY2FsbCBpdCBkb2VzIGp1c3QgdGhhdFxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBAdG9kbyBtYWtlIGRlbGV0aW5nIGl0cyBvd24gbWV0aG9kP1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsZXRlQ29tYm8gPSAhc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLmNvbWJvID09IGNvbWJpbmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsZXRlU2VxdWVuY2UgPSBzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2suc2VxID09IHNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5sZXZlbCA9PSBsZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZUNvbWJvIHx8IGRlbGV0ZVNlcXVlbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYWN0dWFsbHkgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIGlmIHlvdXIgY2FsbGJhY2sgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB0aGlzIHdpbGwgdXNlIHRoZSBqcXVlcnlcbiAgICAgICAgICogY29udmVudGlvbiAtIHByZXZlbnQgZGVmYXVsdCBhbmQgc3RvcCBwcm9wb2dhdGlvbiBvbiB0aGUgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrLCBlLCBjb21ibywgc2VxdWVuY2UpIHtcblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBldmVudCBzaG91bGQgbm90IGhhcHBlbiBzdG9wIGhlcmVcbiAgICAgICAgICAgIGlmIChzZWxmLnN0b3BDYWxsYmFjayhlLCBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsIGNvbWJvLCBzZXF1ZW5jZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhlLCBjb21ibykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgX3ByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgICAgICAgIF9zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogaGFuZGxlcyBhIGNoYXJhY3RlciBrZXkgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9oYW5kbGVLZXkgPSBmdW5jdGlvbihjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSkge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IF9nZXRNYXRjaGVzKGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlKTtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIGRvTm90UmVzZXQgPSB7fTtcbiAgICAgICAgICAgIHZhciBtYXhMZXZlbCA9IDA7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIG1heExldmVsIGZvciBzZXF1ZW5jZXMgc28gd2UgY2FuIG9ubHkgZXhlY3V0ZSB0aGUgbG9uZ2VzdCBjYWxsYmFjayBzZXF1ZW5jZVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0uc2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heExldmVsID0gTWF0aC5tYXgobWF4TGV2ZWwsIGNhbGxiYWNrc1tpXS5sZXZlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggbWF0Y2hpbmcgY2FsbGJhY2tzIGZvciB0aGlzIGtleSBldmVudFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgICAgICAgICAgLy8gZmlyZSBmb3IgYWxsIHNlcXVlbmNlIGNhbGxiYWNrc1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYmVjYXVzZSBpZiBmb3IgZXhhbXBsZSB5b3UgaGF2ZSBtdWx0aXBsZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgICAvLyBib3VuZCBzdWNoIGFzIFwiZyBpXCIgYW5kIFwiZyB0XCIgdGhleSBib3RoIG5lZWQgdG8gZmlyZSB0aGVcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayBmb3IgbWF0Y2hpbmcgZyBjYXVzZSBvdGhlcndpc2UgeW91IGNhbiBvbmx5IGV2ZXJcbiAgICAgICAgICAgICAgICAvLyBtYXRjaCB0aGUgZmlyc3Qgb25lXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrc1tpXS5zZXEpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGZpcmUgY2FsbGJhY2tzIGZvciB0aGUgbWF4TGV2ZWwgdG8gcHJldmVudFxuICAgICAgICAgICAgICAgICAgICAvLyBzdWJzZXF1ZW5jZXMgZnJvbSBhbHNvIGZpcmluZ1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSAnYSBvcHRpb24gYicgc2hvdWxkIG5vdCBjYXVzZSAnb3B0aW9uIGInIHRvIGZpcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbiB0aG91Z2ggJ29wdGlvbiBiJyBpcyBwYXJ0IG9mIHRoZSBvdGhlciBzZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBhbnkgc2VxdWVuY2VzIHRoYXQgZG8gbm90IG1hdGNoIGhlcmUgd2lsbCBiZSBkaXNjYXJkZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVsb3cgYnkgdGhlIF9yZXNldFNlcXVlbmNlcyBjYWxsXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0ubGV2ZWwgIT0gbWF4TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCBhIGxpc3Qgb2Ygd2hpY2ggc2VxdWVuY2VzIHdlcmUgbWF0Y2hlcyBmb3IgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgZG9Ob3RSZXNldFtjYWxsYmFja3NbaV0uc2VxXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIF9maXJlQ2FsbGJhY2soY2FsbGJhY2tzW2ldLmNhbGxiYWNrLCBlLCBjYWxsYmFja3NbaV0uY29tYm8sIGNhbGxiYWNrc1tpXS5zZXEpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSB3ZXJlIG5vIHNlcXVlbmNlIG1hdGNoZXMgYnV0IHdlIGFyZSBzdGlsbCBoZXJlXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBtZWFucyB0aGlzIGlzIGEgcmVndWxhciBtYXRjaCBzbyB3ZSBzaG91bGQgZmlyZSB0aGF0XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9maXJlQ2FsbGJhY2soY2FsbGJhY2tzW2ldLmNhbGxiYWNrLCBlLCBjYWxsYmFja3NbaV0uY29tYm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIGtleSB5b3UgcHJlc3NlZCBtYXRjaGVzIHRoZSB0eXBlIG9mIHNlcXVlbmNlIHdpdGhvdXRcbiAgICAgICAgICAgIC8vIGJlaW5nIGEgbW9kaWZpZXIgKGllIFwia2V5dXBcIiBvciBcImtleXByZXNzXCIpIHRoZW4gd2Ugc2hvdWxkXG4gICAgICAgICAgICAvLyByZXNldCBhbGwgc2VxdWVuY2VzIHRoYXQgd2VyZSBub3QgbWF0Y2hlZCBieSB0aGlzIGV2ZW50XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBzbywgZm9yIGV4YW1wbGUsIGlmIHlvdSBoYXZlIHRoZSBzZXF1ZW5jZSBcImggYSB0XCIgYW5kIHlvdVxuICAgICAgICAgICAgLy8gdHlwZSBcImggZSBhIHIgdFwiIGl0IGRvZXMgbm90IG1hdGNoLiAgaW4gdGhpcyBjYXNlIHRoZSBcImVcIiB3aWxsXG4gICAgICAgICAgICAvLyBjYXVzZSB0aGUgc2VxdWVuY2UgdG8gcmVzZXRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBtb2RpZmllciBrZXlzIGFyZSBpZ25vcmVkIGJlY2F1c2UgeW91IGNhbiBoYXZlIGEgc2VxdWVuY2VcbiAgICAgICAgICAgIC8vIHRoYXQgY29udGFpbnMgbW9kaWZpZXJzIHN1Y2ggYXMgXCJlbnRlciBjdHJsK3NwYWNlXCIgYW5kIGluIG1vc3RcbiAgICAgICAgICAgIC8vIGNhc2VzIHRoZSBtb2RpZmllciBrZXkgd2lsbCBiZSBwcmVzc2VkIGJlZm9yZSB0aGUgbmV4dCBrZXlcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBhbHNvIGlmIHlvdSBoYXZlIGEgc2VxdWVuY2Ugc3VjaCBhcyBcImN0cmwrYiBhXCIgdGhlbiBwcmVzc2luZyB0aGVcbiAgICAgICAgICAgIC8vIFwiYlwiIGtleSB3aWxsIHRyaWdnZXIgYSBcImtleXByZXNzXCIgYW5kIGEgXCJrZXlkb3duXCJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGUgXCJrZXlkb3duXCIgaXMgZXhwZWN0ZWQgd2hlbiB0aGVyZSBpcyBhIG1vZGlmaWVyLCBidXQgdGhlXG4gICAgICAgICAgICAvLyBcImtleXByZXNzXCIgZW5kcyB1cCBtYXRjaGluZyB0aGUgX25leHRFeHBlY3RlZEFjdGlvbiBzaW5jZSBpdCBvY2N1cnNcbiAgICAgICAgICAgIC8vIGFmdGVyIGFuZCB0aGF0IGNhdXNlcyB0aGUgc2VxdWVuY2UgdG8gcmVzZXRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB3ZSBpZ25vcmUga2V5cHJlc3NlcyBpbiBhIHNlcXVlbmNlIHRoYXQgZGlyZWN0bHkgZm9sbG93IGEga2V5ZG93blxuICAgICAgICAgICAgLy8gZm9yIHRoZSBzYW1lIGNoYXJhY3RlclxuICAgICAgICAgICAgdmFyIGlnbm9yZVRoaXNLZXlwcmVzcyA9IGUudHlwZSA9PSAna2V5cHJlc3MnICYmIF9pZ25vcmVOZXh0S2V5cHJlc3M7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09IF9uZXh0RXhwZWN0ZWRBY3Rpb24gJiYgIV9pc01vZGlmaWVyKGNoYXJhY3RlcikgJiYgIWlnbm9yZVRoaXNLZXlwcmVzcykge1xuICAgICAgICAgICAgICAgIF9yZXNldFNlcXVlbmNlcyhkb05vdFJlc2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2lnbm9yZU5leHRLZXlwcmVzcyA9IHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgJiYgZS50eXBlID09ICdrZXlkb3duJztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaGFuZGxlcyBhIGtleWRvd24gZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfaGFuZGxlS2V5RXZlbnQoZSkge1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUgZS53aGljaCBmb3Iga2V5IGV2ZW50c1xuICAgICAgICAgICAgLy8gQHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQyODU2MjcvamF2YXNjcmlwdC1rZXljb2RlLXZzLWNoYXJjb2RlLXV0dGVyLWNvbmZ1c2lvblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlLndoaWNoICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGUud2hpY2ggPSBlLmtleUNvZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpO1xuXG4gICAgICAgICAgICAvLyBubyBjaGFyYWN0ZXIgZm91bmQgdGhlbiBzdG9wXG4gICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbmVlZCB0byB1c2UgPT09IGZvciB0aGUgY2hhcmFjdGVyIGNoZWNrIGJlY2F1c2UgdGhlIGNoYXJhY3RlciBjYW4gYmUgMFxuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAna2V5dXAnICYmIF9pZ25vcmVOZXh0S2V5dXAgPT09IGNoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5dXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuaGFuZGxlS2V5KGNoYXJhY3RlciwgX2V2ZW50TW9kaWZpZXJzKGUpLCBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxsZWQgdG8gc2V0IGEgMSBzZWNvbmQgdGltZW91dCBvbiB0aGUgc3BlY2lmaWVkIHNlcXVlbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIHRoaXMgaXMgc28gYWZ0ZXIgZWFjaCBrZXkgcHJlc3MgaW4gdGhlIHNlcXVlbmNlIHlvdSBoYXZlIDEgc2Vjb25kXG4gICAgICAgICAqIHRvIHByZXNzIHRoZSBuZXh0IGtleSBiZWZvcmUgeW91IGhhdmUgdG8gc3RhcnQgb3ZlclxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfcmVzZXRTZXF1ZW5jZVRpbWVyKCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF9yZXNldFRpbWVyKTtcbiAgICAgICAgICAgIF9yZXNldFRpbWVyID0gc2V0VGltZW91dChfcmVzZXRTZXF1ZW5jZXMsIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIGEga2V5IHNlcXVlbmNlIHRvIGFuIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21ibyAtIGNvbWJvIHNwZWNpZmllZCBpbiBiaW5kIGNhbGxcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0ga2V5c1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfYmluZFNlcXVlbmNlKGNvbWJvLCBrZXlzLCBjYWxsYmFjaywgYWN0aW9uKSB7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IG9mZiBieSBhZGRpbmcgYSBzZXF1ZW5jZSBsZXZlbCByZWNvcmQgZm9yIHRoaXMgY29tYmluYXRpb25cbiAgICAgICAgICAgIC8vIGFuZCBzZXR0aW5nIHRoZSBsZXZlbCB0byAwXG4gICAgICAgICAgICBfc2VxdWVuY2VMZXZlbHNbY29tYm9dID0gMDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjYWxsYmFjayB0byBpbmNyZWFzZSB0aGUgc2VxdWVuY2UgbGV2ZWwgZm9yIHRoaXMgc2VxdWVuY2UgYW5kIHJlc2V0XG4gICAgICAgICAgICAgKiBhbGwgb3RoZXIgc2VxdWVuY2VzIHRoYXQgd2VyZSBhY3RpdmVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV4dEFjdGlvblxuICAgICAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBfaW5jcmVhc2VTZXF1ZW5jZShuZXh0QWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfbmV4dEV4cGVjdGVkQWN0aW9uID0gbmV4dEFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgKytfc2VxdWVuY2VMZXZlbHNbY29tYm9dO1xuICAgICAgICAgICAgICAgICAgICBfcmVzZXRTZXF1ZW5jZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiB3cmFwcyB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrIGluc2lkZSBvZiBhbm90aGVyIGZ1bmN0aW9uIGluIG9yZGVyXG4gICAgICAgICAgICAgKiB0byByZXNldCBhbGwgc2VxdWVuY2UgY291bnRlcnMgYXMgc29vbiBhcyB0aGlzIHNlcXVlbmNlIGlzIGRvbmVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIF9jYWxsYmFja0FuZFJlc2V0KGUpIHtcbiAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrLCBlLCBjb21ibyk7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgaWdub3JlIHRoZSBuZXh0IGtleSB1cCBpZiB0aGUgYWN0aW9uIGlzIGtleSBkb3duXG4gICAgICAgICAgICAgICAgLy8gb3Iga2V5cHJlc3MuICB0aGlzIGlzIHNvIGlmIHlvdSBmaW5pc2ggYSBzZXF1ZW5jZSBhbmRcbiAgICAgICAgICAgICAgICAvLyByZWxlYXNlIHRoZSBrZXkgdGhlIGZpbmFsIGtleSB3aWxsIG5vdCB0cmlnZ2VyIGEga2V5dXBcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICE9PSAna2V5dXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5dXAgPSBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHdlaXJkIHJhY2UgY29uZGl0aW9uIGlmIGEgc2VxdWVuY2UgZW5kcyB3aXRoIHRoZSBrZXlcbiAgICAgICAgICAgICAgICAvLyBhbm90aGVyIHNlcXVlbmNlIGJlZ2lucyB3aXRoXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChfcmVzZXRTZXF1ZW5jZXMsIDEwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGtleXMgb25lIGF0IGEgdGltZSBhbmQgYmluZCB0aGUgYXBwcm9wcmlhdGUgY2FsbGJhY2tcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uLiAgZm9yIGFueSBrZXkgbGVhZGluZyB1cCB0byB0aGUgZmluYWwgb25lIGl0IHNob3VsZFxuICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIHNlcXVlbmNlLiBhZnRlciB0aGUgZmluYWwsIGl0IHNob3VsZCByZXNldCBhbGwgc2VxdWVuY2VzXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gaWYgYW4gYWN0aW9uIGlzIHNwZWNpZmllZCBpbiB0aGUgb3JpZ2luYWwgYmluZCBjYWxsIHRoZW4gdGhhdCB3aWxsXG4gICAgICAgICAgICAvLyBiZSB1c2VkIHRocm91Z2hvdXQuICBvdGhlcndpc2Ugd2Ugd2lsbCBwYXNzIHRoZSBhY3Rpb24gdGhhdCB0aGVcbiAgICAgICAgICAgIC8vIG5leHQga2V5IGluIHRoZSBzZXF1ZW5jZSBzaG91bGQgbWF0Y2guICB0aGlzIGFsbG93cyBhIHNlcXVlbmNlXG4gICAgICAgICAgICAvLyB0byBtaXggYW5kIG1hdGNoIGtleXByZXNzIGFuZCBrZXlkb3duIGV2ZW50cyBkZXBlbmRpbmcgb24gd2hpY2hcbiAgICAgICAgICAgIC8vIG9uZXMgYXJlIGJldHRlciBzdWl0ZWQgdG8gdGhlIGtleSBwcm92aWRlZFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzRmluYWwgPSBpICsgMSA9PT0ga2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGlzRmluYWwgPyBfY2FsbGJhY2tBbmRSZXNldCA6IF9pbmNyZWFzZVNlcXVlbmNlKGFjdGlvbiB8fCBfZ2V0S2V5SW5mbyhrZXlzW2kgKyAxXSkuYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBfYmluZFNpbmdsZShrZXlzW2ldLCB3cmFwcGVkQ2FsbGJhY2ssIGFjdGlvbiwgY29tYm8sIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIGEgc2luZ2xlIGtleWJvYXJkIGNvbWJpbmF0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21iaW5hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IHNlcXVlbmNlTmFtZSAtIG5hbWUgb2Ygc2VxdWVuY2UgaWYgcGFydCBvZiBzZXF1ZW5jZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IGxldmVsIC0gd2hhdCBwYXJ0IG9mIHRoZSBzZXF1ZW5jZSB0aGUgY29tbWFuZCBpc1xuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfYmluZFNpbmdsZShjb21iaW5hdGlvbiwgY2FsbGJhY2ssIGFjdGlvbiwgc2VxdWVuY2VOYW1lLCBsZXZlbCkge1xuXG4gICAgICAgICAgICAvLyBzdG9yZSBhIGRpcmVjdCBtYXBwZWQgcmVmZXJlbmNlIGZvciB1c2Ugd2l0aCBNb3VzZXRyYXAudHJpZ2dlclxuICAgICAgICAgICAgc2VsZi5fZGlyZWN0TWFwW2NvbWJpbmF0aW9uICsgJzonICsgYWN0aW9uXSA9IGNhbGxiYWNrO1xuXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgbXVsdGlwbGUgc3BhY2VzIGluIGEgcm93IGJlY29tZSBhIHNpbmdsZSBzcGFjZVxuICAgICAgICAgICAgY29tYmluYXRpb24gPSBjb21iaW5hdGlvbi5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG5cbiAgICAgICAgICAgIHZhciBzZXF1ZW5jZSA9IGNvbWJpbmF0aW9uLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICB2YXIgaW5mbztcblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBwYXR0ZXJuIGlzIGEgc2VxdWVuY2Ugb2Yga2V5cyB0aGVuIHJ1biB0aHJvdWdoIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICAvLyB0byByZXByb2Nlc3MgZWFjaCBwYXR0ZXJuIG9uZSBrZXkgYXQgYSB0aW1lXG4gICAgICAgICAgICBpZiAoc2VxdWVuY2UubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIF9iaW5kU2VxdWVuY2UoY29tYmluYXRpb24sIHNlcXVlbmNlLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZm8gPSBfZ2V0S2V5SW5mbyhjb21iaW5hdGlvbiwgYWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGluaXRpYWxpemUgYXJyYXkgaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZVxuICAgICAgICAgICAgLy8gYSBjYWxsYmFjayBpcyBhZGRlZCBmb3IgdGhpcyBrZXlcbiAgICAgICAgICAgIHNlbGYuX2NhbGxiYWNrc1tpbmZvLmtleV0gPSBzZWxmLl9jYWxsYmFja3NbaW5mby5rZXldIHx8IFtdO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgYW4gZXhpc3RpbmcgbWF0Y2ggaWYgdGhlcmUgaXMgb25lXG4gICAgICAgICAgICBfZ2V0TWF0Y2hlcyhpbmZvLmtleSwgaW5mby5tb2RpZmllcnMsIHt0eXBlOiBpbmZvLmFjdGlvbn0sIHNlcXVlbmNlTmFtZSwgY29tYmluYXRpb24sIGxldmVsKTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoaXMgY2FsbCBiYWNrIHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYSBzZXF1ZW5jZSBwdXQgaXQgYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgLy8gaWYgbm90IHB1dCBpdCBhdCB0aGUgZW5kXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZSB0aGUgd2F5IHRoZXNlIGFyZSBwcm9jZXNzZWQgZXhwZWN0c1xuICAgICAgICAgICAgLy8gdGhlIHNlcXVlbmNlIG9uZXMgdG8gY29tZSBmaXJzdFxuICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2tzW2luZm8ua2V5XVtzZXF1ZW5jZU5hbWUgPyAndW5zaGlmdCcgOiAncHVzaCddKHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBpbmZvLm1vZGlmaWVycyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGluZm8uYWN0aW9uLFxuICAgICAgICAgICAgICAgIHNlcTogc2VxdWVuY2VOYW1lLFxuICAgICAgICAgICAgICAgIGxldmVsOiBsZXZlbCxcbiAgICAgICAgICAgICAgICBjb21ibzogY29tYmluYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIG11bHRpcGxlIGNvbWJpbmF0aW9ucyB0byB0aGUgc2FtZSBjYWxsYmFja1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBjb21iaW5hdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBhY3Rpb25cbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5fYmluZE11bHRpcGxlID0gZnVuY3Rpb24oY29tYmluYXRpb25zLCBjYWxsYmFjaywgYWN0aW9uKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbWJpbmF0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIF9iaW5kU2luZ2xlKGNvbWJpbmF0aW9uc1tpXSwgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gc3RhcnQhXG4gICAgICAgIF9hZGRFdmVudCh0YXJnZXRFbGVtZW50LCAna2V5cHJlc3MnLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleWRvd24nLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleXVwJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kcyBhbiBldmVudCB0byBtb3VzZXRyYXBcbiAgICAgKlxuICAgICAqIGNhbiBiZSBhIHNpbmdsZSBrZXksIGEgY29tYmluYXRpb24gb2Yga2V5cyBzZXBhcmF0ZWQgd2l0aCArLFxuICAgICAqIGFuIGFycmF5IG9mIGtleXMsIG9yIGEgc2VxdWVuY2Ugb2Yga2V5cyBzZXBhcmF0ZWQgYnkgc3BhY2VzXG4gICAgICpcbiAgICAgKiBiZSBzdXJlIHRvIGxpc3QgdGhlIG1vZGlmaWVyIGtleXMgZmlyc3QgdG8gbWFrZSBzdXJlIHRoYXQgdGhlXG4gICAgICogY29ycmVjdCBrZXkgZW5kcyB1cCBnZXR0aW5nIGJvdW5kICh0aGUgbGFzdCBrZXkgaW4gdGhlIHBhdHRlcm4pXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0ga2V5c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb24gLSAna2V5cHJlc3MnLCAna2V5ZG93bicsIG9yICdrZXl1cCdcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oa2V5cywgY2FsbGJhY2ssIGFjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGtleXMgPSBrZXlzIGluc3RhbmNlb2YgQXJyYXkgPyBrZXlzIDogW2tleXNdO1xuICAgICAgICBzZWxmLl9iaW5kTXVsdGlwbGUuY2FsbChzZWxmLCBrZXlzLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHVuYmluZHMgYW4gZXZlbnQgdG8gbW91c2V0cmFwXG4gICAgICpcbiAgICAgKiB0aGUgdW5iaW5kaW5nIHNldHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9mIHRoZSBzcGVjaWZpZWQga2V5IGNvbWJvXG4gICAgICogdG8gYW4gZW1wdHkgZnVuY3Rpb24gYW5kIGRlbGV0ZXMgdGhlIGNvcnJlc3BvbmRpbmcga2V5IGluIHRoZVxuICAgICAqIF9kaXJlY3RNYXAgZGljdC5cbiAgICAgKlxuICAgICAqIFRPRE86IGFjdHVhbGx5IHJlbW92ZSB0aGlzIGZyb20gdGhlIF9jYWxsYmFja3MgZGljdGlvbmFyeSBpbnN0ZWFkXG4gICAgICogb2YgYmluZGluZyBhbiBlbXB0eSBmdW5jdGlvblxuICAgICAqXG4gICAgICogdGhlIGtleWNvbWJvK2FjdGlvbiBoYXMgdG8gYmUgZXhhY3RseSB0aGUgc2FtZSBhc1xuICAgICAqIGl0IHdhcyBkZWZpbmVkIGluIHRoZSBiaW5kIG1ldGhvZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGtleXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24oa2V5cywgYWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGYuYmluZC5jYWxsKHNlbGYsIGtleXMsIGZ1bmN0aW9uKCkge30sIGFjdGlvbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRyaWdnZXJzIGFuIGV2ZW50IHRoYXQgaGFzIGFscmVhZHkgYmVlbiBib3VuZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbihrZXlzLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5fZGlyZWN0TWFwW2tleXMgKyAnOicgKyBhY3Rpb25dKSB7XG4gICAgICAgICAgICBzZWxmLl9kaXJlY3RNYXBba2V5cyArICc6JyArIGFjdGlvbl0oe30sIGtleXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZXNldHMgdGhlIGxpYnJhcnkgYmFjayB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gIHRoaXMgaXMgdXNlZnVsXG4gICAgICogaWYgeW91IHdhbnQgdG8gY2xlYXIgb3V0IHRoZSBjdXJyZW50IGtleWJvYXJkIHNob3J0Y3V0cyBhbmQgYmluZFxuICAgICAqIG5ldyBvbmVzIC0gZm9yIGV4YW1wbGUgaWYgeW91IHN3aXRjaCB0byBhbm90aGVyIHBhZ2VcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5fY2FsbGJhY2tzID0ge307XG4gICAgICAgIHNlbGYuX2RpcmVjdE1hcCA9IHt9O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2hvdWxkIHdlIHN0b3AgdGhpcyBldmVudCBiZWZvcmUgZmlyaW5nIG9mZiBjYWxsYmFja3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuc3RvcENhbGxiYWNrID0gZnVuY3Rpb24oZSwgZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLy8gaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBjbGFzcyBcIm1vdXNldHJhcFwiIHRoZW4gbm8gbmVlZCB0byBzdG9wXG4gICAgICAgIGlmICgoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyBtb3VzZXRyYXAgJykgPiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9iZWxvbmdzVG8oZWxlbWVudCwgc2VsZi50YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9wIGZvciBpbnB1dCwgc2VsZWN0LCBhbmQgdGV4dGFyZWFcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PSAnSU5QVVQnIHx8IGVsZW1lbnQudGFnTmFtZSA9PSAnU0VMRUNUJyB8fCBlbGVtZW50LnRhZ05hbWUgPT0gJ1RFWFRBUkVBJyB8fCBlbGVtZW50LmlzQ29udGVudEVkaXRhYmxlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBleHBvc2VzIF9oYW5kbGVLZXkgcHVibGljbHkgc28gaXQgY2FuIGJlIG92ZXJ3cml0dGVuIGJ5IGV4dGVuc2lvbnNcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLmhhbmRsZUtleSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLl9oYW5kbGVLZXkuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogYWxsb3cgY3VzdG9tIGtleSBtYXBwaW5nc1xuICAgICAqL1xuICAgIE1vdXNldHJhcC5hZGRLZXljb2RlcyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBfTUFQW2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfUkVWRVJTRV9NQVAgPSBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0IHRoZSBnbG9iYWwgbW91c2V0cmFwIGZ1bmN0aW9uc1xuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgaXMgbmVlZGVkIHRvIGFsbG93IHRoZSBnbG9iYWwgbW91c2V0cmFwIGZ1bmN0aW9ucyB0byB3b3JrXG4gICAgICogbm93IHRoYXQgbW91c2V0cmFwIGlzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICovXG4gICAgTW91c2V0cmFwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRvY3VtZW50TW91c2V0cmFwID0gTW91c2V0cmFwKGRvY3VtZW50KTtcbiAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIGRvY3VtZW50TW91c2V0cmFwKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kLmNoYXJBdCgwKSAhPT0gJ18nKSB7XG4gICAgICAgICAgICAgICAgTW91c2V0cmFwW21ldGhvZF0gPSAoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudE1vdXNldHJhcFttZXRob2RdLmFwcGx5KGRvY3VtZW50TW91c2V0cmFwLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gKG1ldGhvZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIE1vdXNldHJhcC5pbml0KCk7XG5cbiAgICAvLyBleHBvc2UgbW91c2V0cmFwIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgd2luZG93Lk1vdXNldHJhcCA9IE1vdXNldHJhcDtcblxuICAgIC8vIGV4cG9zZSBhcyBhIGNvbW1vbiBqcyBtb2R1bGVcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBNb3VzZXRyYXA7XG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIG1vdXNldHJhcCBhcyBhbiBBTUQgbW9kdWxlXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTW91c2V0cmFwO1xuICAgICAgICB9KTtcbiAgICB9XG59KSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsLCB0eXBlb2YgIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IG51bGwpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L21vdXNldHJhcC9tb3VzZXRyYXAuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=