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
	            this.app = new App(this, username);
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
	var Output = __webpack_require__(30);
	var Leaderboard = __webpack_require__(31);
	var UI = __webpack_require__(33);
	var Socket = __webpack_require__(35);
	var Mousetrap = __webpack_require__(36);
	
	var App = function () {
	    function App(auth, username) {
	        _classCallCheck(this, App);
	
	        this.auth = auth;
	        this.username = username;
	        this.mode = 'coding';
	        this.connection = {};
	        this.editor = new Editor("editor");
	        this.output = new Output(this);
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
	        this._language = 'javascript';
	        this.session.setTabSize(4);
	        this.editor.setOptions({
	            enableBasicAutocompletion: true,
	            enableLiveAutocompletion: true
	        });
	        this.setTheme("clouds");
	        this.remember();
	        this.session.on("change", this.onChange.bind(this));
	    }
	
	    _createClass(Editor, [{
	        key: "remember",
	        value: function remember() {
	            if (window.localStorage['code'] !== undefined) this.value = window.localStorage['code'];
	            if (window.localStorage['language'] !== undefined) {
	                this.language = window.localStorage['language'];
	            } else this.language = this._language;
	        }
	    }, {
	        key: "setTheme",
	        value: function setTheme(theme) {
	            this.editor.setTheme("ace/theme/" + theme);
	        }
	    }, {
	        key: "onChange",
	        value: function onChange() {
	            window.localStorage['code'] = this.value;
	        }
	    }, {
	        key: "language",
	        set: function set(language) {
	            this._language = window.localStorage['language'] = language;
	            this.editor.getSession().setMode("ace/mode/" + language);
	        },
	        get: function get() {
	            return this._language;
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
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Output = function () {
	    function Output(app) {
	        var _this = this;
	
	        _classCallCheck(this, Output);
	
	        this.app = app;
	        this.loader = $('body > main > section > #output > .cssload-container');
	        this.inputBox = $('body > main > section > #output > section > div.input > pre');
	        this.outputBox = $('body > main > section > #output > section > div.output > pre');
	        this.selectItems = $$('body > main > section > #output > aside li');
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = this.selectItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var item = _step.value;
	                item.addEventListener('click', function (e) {
	                    _this.select(parseInt(e.target.innerHTML) - 1);
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
	
	        this.outputsData = [];
	        this.disableLoading();
	    }
	
	    _createClass(Output, [{
	        key: 'select',
	        value: function select(i) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = this.selectItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var item = _step2.value;
	                    item.classList.remove('active');
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
	
	            this.selectItems[i].classList.add('active');
	            this.putResponse(this.outputsData[i] || { stdout: '', input: '' });
	        }
	    }, {
	        key: 'put',
	        value: function put(data) {
	            this.outputsData[data.inputId] = data;
	        }
	    }, {
	        key: 'putResponse',
	        value: function putResponse(data) {
	            this.disableLoading();
	            this.clear();
	            if (data.hasError || data.hasCodeError) {
	                this.changeOutputBox(data.err, true);
	            } else {
	                var outputBoxMessage = '';
	                outputBoxMessage += data.solved ? '<span class=\'green\'>Challenge solved!</span>\n' : '<span class=\'red\'>Challenge not solved!</span>\n';
	                if (data.solved) {
	                    outputBoxMessage += '<span class=\'green\'> => Total Steps to Solve: ' + data.steps + ' (Scores earned: ' + data.scores.steps + ')</span>\n';
	                    outputBoxMessage += '<span class=\'green\'> => Executing Duration: ' + data.duration + ' (Scores earned: ' + data.scores.duration + ')</span>\n';
	                    outputBoxMessage += '<span class=\'green\'> => Estimated Total Score: ' + data.scores.total + '</span>\n';
	                }
	                outputBoxMessage += '\nYour Output:\n===============================\n';
	                outputBoxMessage += data.stdout;
	                this.changeOutputBox(outputBoxMessage);
	            }
	            console.log(data);
	            this.changeInputBox(data.input);
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.changeInputBox("");
	            this.changeOutputBox("");
	        }
	    }, {
	        key: 'changeInputBox',
	        value: function changeInputBox(data) {
	            this.inputBox.innerHTML = data;
	        }
	    }, {
	        key: 'changeOutputBox',
	        value: function changeOutputBox(data) {
	            var isError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            if (isError) this.outputBox.classList.add('error-mode');else {
	                this.outputBox.classList.remove('error-mode');
	            }
	            this.outputBox.innerHTML = data;
	        }
	    }, {
	        key: 'enableLoading',
	        value: function enableLoading() {
	            this.loader.style.display = 'block';
	        }
	    }, {
	        key: 'disableLoading',
	        value: function disableLoading() {
	            this.loader.style.display = 'none';
	        }
	    }]);
	
	    return Output;
	}();
	
	module.exports = Output;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Team = __webpack_require__(32);
	
	var Leaderboard = function () {
	    function Leaderboard(app, query) {
	        _classCallCheck(this, Leaderboard);
	
	        this.app = app;
	        this.list = $(query);
	        this.teams = [];
	        this.hightscore = 0;
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
	
	            this.teams = [];
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
	            }).sort(function (A, B) {
	                if (A < B) return 1;
	                if (A > B) return -1;
	                return 0;
	            });
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
	            this.highscore = this.teams[0].score;
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = this.teams[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var _team2 = _step6.value;
	
	                    _team2.place = place++;
	                    if (this.highscore !== 0) _team2.progress = _team2.score / this.highscore;else _team2.progress = 0;
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
/* 32 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Team = function () {
	    function Team(leaderboard, id, username, name, score) {
	        _classCallCheck(this, Team);
	
	        this.leaderboard = leaderboard;
	        this.ui = this.leaderboard.app.ui;
	        this.id = id;
	        this._rank = 1;
	        this._place = 0;
	        this.isMe = false;
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
	            li.innerHTML = "<span class=\"name\">" + this.name + "</span>\n                        <span class=\"score\">" + this.score + "</span>\n                        <div class=\"progress\"></div>\n                        <div class=\"behind-progress\"></div>";
	            if (this.username === this.leaderboard.app.username) {
	                li.classList.add('me');
	                this.isMe = true;
	            }
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
	            if (this.isMe) {
	                $('header .team .score').innerHTML = $('body > dialog > span').innerHTML = score;
	                this.ui.announceHighScore();
	            }
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
	            this.progressElement.style.width = rate * 100 + "%";
	        }
	    }]);
	
	    return Team;
	}();
	
	module.exports = Team;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tabs = __webpack_require__(34);
	
	var UI = function () {
	    function UI(app) {
	        _classCallCheck(this, UI);
	
	        this.app = app;
	        this.tabs = new Tabs(app);
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
	    }, {
	        key: 'announceHighScore',
	        value: function announceHighScore() {
	            document.body.classList.add('highscore-mode');
	            setTimeout(function () {
	                return document.body.classList.remove('highscore-mode');
	            }, 2500);
	        }
	    }]);
	
	    return UI;
	}();
	
	module.exports = UI;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tabs = function () {
	    function Tabs(app) {
	        var _this = this;
	
	        _classCallCheck(this, Tabs);
	
	        this.app = app;
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
	
	        var submitBtn = document.querySelector('body > main > section > nav > li.submit');
	        submitBtn.addEventListener("click", this.runTheCode.bind(this));
	        this.select('editor');
	        // this.tryToRemember()
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
	    }, {
	        key: "runTheCode",
	        value: function runTheCode() {
	            if (this.app.socket.isConnected) {
	                this.app.socket.runTheCode();
	            } else {
	                console.error("You cannot run your code when you are offline");
	            }
	        }
	    }]);
	
	    return Tabs;
	}();
	
	module.exports = Tabs;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Socket = function () {
	    function Socket(app, address) {
	        var _this = this;
	
	        _classCallCheck(this, Socket);
	
	        this.app = app;
	        this.editor = app.editor;
	        this.output = app.output;
	        this.socket = io.connect(address);
	        this.socket.on('initial-settings', this.onInitialSettings.bind(this));
	        this.socket.on('time-sync', this.onTimeSync.bind(this));
	        this.socket.on('score-changed', this.onScoreChanged.bind(this));
	        this.socket.on('console-response', this.onConsoleResponse.bind(this));
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
	        key: 'onConsoleResponse',
	        value: function onConsoleResponse(data) {
	            this.output.put(data);
	            this.output.select(data.inputId);
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
	        key: 'runTheCode',
	        value: function runTheCode() {
	            this.socket.emit('user-run', {
	                code: this.app.editor.value,
	                lang: this.editor.language
	            });
	            this.output.enableLoading();
	        }
	    }, {
	        key: 'submitTheCode',
	        value: function submitTheCode() {
	            this.socket.emit('user-submit', {
	                code: this.app.editor.value,
	                lang: this.editor.language
	            });
	            this.output.enableLoading();
	        }
	    }, {
	        key: 'onConnectionFound',
	        value: function onConnectionFound() {
	            $('footer .connection').classList.remove('fail');
	        }
	    }, {
	        key: 'onConnectionLost',
	        value: function onConnectionLost() {
	            $('footer .connection').classList.add('fail');
	        }
	    }, {
	        key: 'onScoreChanged',
	        value: function onScoreChanged(data) {
	            this.app.leaderboard.getTeamByUsername(data.username).score = data.score;
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
/* 36 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOThjZmI0MjIwNzlmNTY3YTQyNzciLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vRWRpdG9yLmpzIiwid2VicGFjazovLy8uL091dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9MZWFkZXJib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9UZWFtLmpzIiwid2VicGFjazovLy8uL1VJLmpzIiwid2VicGFjazovLy8uL1RhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vU29ja2V0LmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vbW91c2V0cmFwL21vdXNldHJhcC5qcyJdLCJuYW1lcyI6WyJheGlvcyIsInJlcXVpcmUiLCJBcHAiLCJ3aW5kb3ciLCIkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicXVlcnkiLCIkJCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBdXRoIiwiYm94IiwidXNlcm5hbWUiLCJsb2dpbkJ0biIsIm9ubG9hZCIsIm9uUmVhZHkiLCJiaW5kIiwicmVtZW1iZXIiLCJsb2NhbFN0b3JhZ2UiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImxvZ2luIiwiY2xhc3NMaXN0IiwiYWRkIiwib25jbGljayIsIm9ua2V5ZG93biIsImUiLCJ3aGljaCIsInVzaW5nTG9jYWxTdG9yYWdlIiwicmVtb3ZlIiwicG9zdCIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJzdGF0dXMiLCJzdGFydEFwcCIsImFsZXJ0IiwibWVzc2FnZSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0Iiwic3RvcmUiLCJhcHAiLCJFZGl0b3IiLCJPdXRwdXQiLCJMZWFkZXJib2FyZCIsIlVJIiwiU29ja2V0IiwiTW91c2V0cmFwIiwiYXV0aCIsIm1vZGUiLCJjb25uZWN0aW9uIiwiZWRpdG9yIiwib3V0cHV0IiwibGVhZGVyYm9hcmQiLCJ1aSIsInNvY2tldCIsImluaXRTaG9ydGN1dHMiLCJsb2dvdXQiLCJkaXNhYmxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImlkIiwiYWNlIiwiZWRpdCIsInNlc3Npb24iLCJnZXRTZXNzaW9uIiwiX2xhbmd1YWdlIiwic2V0VGFiU2l6ZSIsInNldE9wdGlvbnMiLCJlbmFibGVCYXNpY0F1dG9jb21wbGV0aW9uIiwiZW5hYmxlTGl2ZUF1dG9jb21wbGV0aW9uIiwic2V0VGhlbWUiLCJvbiIsIm9uQ2hhbmdlIiwibGFuZ3VhZ2UiLCJ0aGVtZSIsInNldE1vZGUiLCJnZXRWYWx1ZSIsInZhbCIsInNldFZhbHVlIiwibG9hZGVyIiwiaW5wdXRCb3giLCJvdXRwdXRCb3giLCJzZWxlY3RJdGVtcyIsIml0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwic2VsZWN0IiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJpbm5lckhUTUwiLCJvdXRwdXRzRGF0YSIsImRpc2FibGVMb2FkaW5nIiwiaSIsInB1dFJlc3BvbnNlIiwic3Rkb3V0IiwiaW5wdXQiLCJpbnB1dElkIiwiY2xlYXIiLCJoYXNFcnJvciIsImhhc0NvZGVFcnJvciIsImNoYW5nZU91dHB1dEJveCIsImVyciIsIm91dHB1dEJveE1lc3NhZ2UiLCJzb2x2ZWQiLCJzdGVwcyIsInNjb3JlcyIsImR1cmF0aW9uIiwidG90YWwiLCJjaGFuZ2VJbnB1dEJveCIsImlzRXJyb3IiLCJUZWFtIiwibGlzdCIsInRlYW1zIiwiaGlnaHRzY29yZSIsIm5hbWUiLCJzY29yZSIsIm5lZWRzVXBkYXRlIiwidGVhbSIsImFwcGVuZENoaWxkIiwiZWxlbWVudCIsInB1c2giLCJ1cGRhdGVUZWFtcyIsImdldFRlYW1CeVVzZXJuYW1lIiwiY2xlYXJBbGwiLCJhZGRUZWFtIiwiaW5pdFByb2ZpbGUiLCJnZXRUaGlzVGVhbSIsInBsYWNlIiwiZmlsdGVyIiwiaW5kZXhPZiIsInNvcnQiLCJBIiwiQiIsInJhbmsiLCJoaWdoc2NvcmUiLCJwcm9ncmVzcyIsIl9yYW5rIiwiX3BsYWNlIiwiaXNNZSIsIl9zY29yZSIsImRlZmluZUVsZW1lbnQiLCJzY29yZUVsZW1lbnQiLCJwcm9ncmVzc0VsZW1lbnQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJhbm5vdW5jZUhpZ2hTY29yZSIsInRvcCIsIm9mZnNldEhlaWdodCIsInJhdGUiLCJ3aWR0aCIsIlRhYnMiLCJ0YWJzIiwidXNlcm5hbWVUeHQiLCJzY29yZVR4dCIsIm15VGVhbSIsInNlY29uZHMiLCJzZWNzIiwibWlucyIsImJvZHkiLCJ0YWIiLCJnZXRBdHRyaWJ1dGUiLCJzdWJtaXRCdG4iLCJydW5UaGVDb2RlIiwicGFnZSIsInN0b3JlTGFzdFRhYlNlbGVjdGVkIiwiaXNDb25uZWN0ZWQiLCJhZGRyZXNzIiwiaW8iLCJjb25uZWN0Iiwib25Jbml0aWFsU2V0dGluZ3MiLCJvblRpbWVTeW5jIiwib25TY29yZUNoYW5nZWQiLCJvbkNvbnNvbGVSZXNwb25zZSIsIl9jb25uZWN0ZWQiLCJ0ZXN0Q29ubmVjdGlvbkludGVydmFsIiwidGltZSIsImluaXRpYWxpemVUZWFtcyIsImVtaXQiLCJwdXQiLCJlbnRlck5pdHJvTW9kZSIsImVudGVyVGltZXNVcE1vZGUiLCJzZXRUaW1lciIsImNoZWNrQ29ubmVjdGlvbk9uVGltZXJTeW5jZWQiLCJjbGVhclRpbWVvdXQiLCJjb2RlIiwibGFuZyIsImVuYWJsZUxvYWRpbmciLCJzaG91bGRDb25uZWN0Iiwib25Db25uZWN0aW9uRm91bmQiLCJvbkNvbm5lY3Rpb25Mb3N0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RDQSxLQUFNQSxRQUFRLG1CQUFBQyxDQUFRLENBQVIs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QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixVQUFVOzs7Ozs7O0FDdkx0Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7Ozs7Ozs7QUNYQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIOzs7Ozs7OztBQ25MQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFNBQVM7QUFDcEIsWUFBVyxTQUFTO0FBQ3BCLFlBQVcsT0FBTztBQUNs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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE1BQU07QUFDckIsZ0JBQWUsUUFBUTtBQUN2QixpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsRUFBQyIsImZpbGUiOiIuL2Rpc3QvbWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5OGNmYjQyMjA3OWY1NjdhNDI3NyIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKVxuY29uc3QgQXBwID0gcmVxdWlyZSgnLi9BcHAnKVxuXG53aW5kb3cuJCA9IHF1ZXJ5ID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpXG53aW5kb3cuJCQgPSBxdWVyeSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KVxuXG5jbGFzcyBBdXRoIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuYm94ID0gJCgnLmZsb2F0LWJveCcpXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSAkKCcuZmxvYXQtYm94IC51c2VybmFtZScpXG4gICAgICAgIHRoaXMubG9naW5CdG4gPSAkKCcuZmxvYXQtYm94IGJ1dHRvbicpXG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSB0aGlzLm9uUmVhZHkuYmluZCh0aGlzKVxuICAgICAgICB0aGlzLnJlbWVtYmVyKClcbiAgICB9XG4gICAgcmVtZW1iZXIgKCkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlWyd1c2VybmFtZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcm5hbWUudmFsdWUgPSBsb2NhbFN0b3JhZ2VbJ3VzZXJuYW1lJ11cbiAgICAgICAgICAgIHRoaXMubG9naW4odHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9yZSAodXNlcm5hbWUpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlWyd1c2VybmFtZSddID0gdXNlcm5hbWVcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICAgIHRoaXMuYm94LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUnKVxuICAgICAgICB0aGlzLmxvZ2luQnRuLm9uY2xpY2sgPSAoKSA9PiB0aGlzLmxvZ2luKGZhbHNlKVxuICAgICAgICB0aGlzLnVzZXJuYW1lLm9ua2V5ZG93biA9IChlKSA9PiB7IGlmIChlLndoaWNoID09PSAxMykgdGhpcy5sb2dpbihmYWxzZSkgfVxuICAgIH1cbiAgICBsb2dpbiAodXNpbmdMb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy51c2VybmFtZS5jbGFzc0xpc3QucmVtb3ZlKCd3cm9uZycpXG4gICAgICAgIGlmICh0aGlzLnVzZXJuYW1lLnZhbHVlID09PSAnJykgdGhpcy51c2VybmFtZS5jbGFzc0xpc3QuYWRkKCd3cm9uZycpXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXhpb3MucG9zdCgnL2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEFwcCh0aGlzLnVzZXJuYW1lLnZhbHVlLCB1c2luZ0xvY2FsU3RvcmFnZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJuYW1lLmNsYXNzTGlzdC5hZGQoJ3dyb25nJylcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzcG9uc2UuZGF0YS5tZXNzYWdlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9nb3V0ICgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlWyd1c2VybmFtZSddID0gJydcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfVxuICAgIHN0YXJ0QXBwICh1c2VybmFtZSwgdXNpbmdMb2NhbFN0b3JhZ2UgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmJveC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICBpZiAodXNpbmdMb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuYm94LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnLCAxMDAwKVxuICAgICAgICAgICAgdGhpcy5zdG9yZSh1c2VybmFtZSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcCA9IG5ldyBBcHAodGhpcywgdXNlcm5hbWUpXG4gICAgfVxufVxubmV3IEF1dGhcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tYWluLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgJiYgIWlzQXJyYXkob2JqKSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywgdGhpcy5kZWZhdWx0cywgeyBtZXRob2Q6ICdnZXQnIH0sIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvQXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2RlZmF1bHRzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBFZGl0b3IgPSByZXF1aXJlKFwiLi9FZGl0b3JcIilcclxuY29uc3QgT3V0cHV0ID0gcmVxdWlyZShcIi4vT3V0cHV0XCIpXHJcbmNvbnN0IExlYWRlcmJvYXJkID0gcmVxdWlyZShcIi4vTGVhZGVyYm9hcmRcIilcclxuY29uc3QgVUkgPSByZXF1aXJlKFwiLi9VSVwiKVxyXG5jb25zdCBTb2NrZXQgPSByZXF1aXJlKFwiLi9Tb2NrZXRcIilcclxuY29uc3QgTW91c2V0cmFwID0gcmVxdWlyZSgnbW91c2V0cmFwJylcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXV0aCwgdXNlcm5hbWUpIHtcclxuICAgICAgICB0aGlzLmF1dGggPSBhdXRoXHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lXHJcbiAgICAgICAgdGhpcy5tb2RlID0gJ2NvZGluZydcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSB7fVxyXG4gICAgICAgIHRoaXMuZWRpdG9yID0gbmV3IEVkaXRvcihcImVkaXRvclwiKVxyXG4gICAgICAgIHRoaXMub3V0cHV0ID0gbmV3IE91dHB1dCh0aGlzKVxyXG4gICAgICAgIHRoaXMubGVhZGVyYm9hcmQgPSBuZXcgTGVhZGVyYm9hcmQodGhpcywgXCIucmFua3NcIilcclxuICAgICAgICB0aGlzLnVpID0gbmV3IFVJKHRoaXMpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgU29ja2V0KHRoaXMsICcvJylcclxuICAgICAgICB0aGlzLmluaXRTaG9ydGN1dHMoKVxyXG4gICAgfVxyXG4gICAgaW5pdFNob3J0Y3V0cyAoKSB7XHJcbiAgICAgICAgTW91c2V0cmFwLmJpbmQoXCJhbHQgYWx0IGFsdCBhbHQgYWx0IGFsdFwiLCAoKSA9PiB7IHRoaXMuYXV0aC5sb2dvdXQoKSB9KVxyXG4gICAgfVxyXG4gICAgZW50ZXJOaXRyb01vZGUgKCkge1xyXG4gICAgICAgIHRoaXMubW9kZSA9ICduaXRybydcclxuICAgICAgICB0aGlzLmxlYWRlcmJvYXJkLmRpc2FibGUoKVxyXG4gICAgfVxyXG4gICAgZW50ZXJUaW1lc1VwTW9kZSAoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gJ3RpbWVzdXAnXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXBwXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQXBwLmpzIiwiY2xhc3MgRWRpdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yIChpZCkge1xyXG4gICAgICAgIGFjZS5yZXF1aXJlKFwiYWNlL2V4dC9sYW5ndWFnZV90b29sc1wiKTtcclxuICAgICAgICB0aGlzLmVkaXRvciA9IGFjZS5lZGl0KGlkKTtcclxuICAgICAgICB0aGlzLnNlc3Npb24gPSB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKClcclxuICAgICAgICB0aGlzLl9sYW5ndWFnZSA9ICdqYXZhc2NyaXB0J1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXRUYWJTaXplKDQpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldE9wdGlvbnMoe1xyXG4gICAgICAgICAgICBlbmFibGVCYXNpY0F1dG9jb21wbGV0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBlbmFibGVMaXZlQXV0b2NvbXBsZXRpb246IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldFRoZW1lKFwiY2xvdWRzXCIpXHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcigpXHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLm9uKFwiY2hhbmdlXCIsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSlcclxuICAgIH1cclxuICAgIHJlbWVtYmVyICgpIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZVsnY29kZSddICE9PSB1bmRlZmluZWQpIHRoaXMudmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydjb2RlJ11cclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZVsnbGFuZ3VhZ2UnXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydsYW5ndWFnZSddXHJcbiAgICAgICAgfSBlbHNlIHRoaXMubGFuZ3VhZ2UgPSB0aGlzLl9sYW5ndWFnZVxyXG4gICAgfVxyXG4gICAgc2V0VGhlbWUgKHRoZW1lKSB7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VGhlbWUoXCJhY2UvdGhlbWUvXCIgKyB0aGVtZSk7XHJcbiAgICB9XHJcbiAgICBzZXQgbGFuZ3VhZ2UgKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydsYW5ndWFnZSddID0gbGFuZ3VhZ2VcclxuICAgICAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShcImFjZS9tb2RlL1wiICsgbGFuZ3VhZ2UpO1xyXG4gICAgfVxyXG4gICAgZ2V0IGxhbmd1YWdlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2VcclxuICAgIH1cclxuICAgIGdldCB2YWx1ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5nZXRWYWx1ZSgpXHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXRWYWx1ZSh2YWwpXHJcbiAgICB9XHJcbiAgICBvbkNoYW5nZSAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVsnY29kZSddID0gdGhpcy52YWx1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0VkaXRvci5qcyIsImNsYXNzIE91dHB1dCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcclxuICAgICAgICB0aGlzLmxvYWRlciA9ICQoJ2JvZHkgPiBtYWluID4gc2VjdGlvbiA+ICNvdXRwdXQgPiAuY3NzbG9hZC1jb250YWluZXInKVxyXG4gICAgICAgIHRoaXMuaW5wdXRCb3ggPSAkKCdib2R5ID4gbWFpbiA+IHNlY3Rpb24gPiAjb3V0cHV0ID4gc2VjdGlvbiA+IGRpdi5pbnB1dCA+IHByZScpXHJcbiAgICAgICAgdGhpcy5vdXRwdXRCb3ggPSAkKCdib2R5ID4gbWFpbiA+IHNlY3Rpb24gPiAjb3V0cHV0ID4gc2VjdGlvbiA+IGRpdi5vdXRwdXQgPiBwcmUnKVxyXG4gICAgICAgIHRoaXMuc2VsZWN0SXRlbXMgPSAkJCgnYm9keSA+IG1haW4gPiBzZWN0aW9uID4gI291dHB1dCA+IGFzaWRlIGxpJylcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuc2VsZWN0SXRlbXMpIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QocGFyc2VJbnQoZS50YXJnZXQuaW5uZXJIVE1MKSAtIDEpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLm91dHB1dHNEYXRhID0gW11cclxuICAgICAgICB0aGlzLmRpc2FibGVMb2FkaW5nKClcclxuICAgIH1cclxuICAgIHNlbGVjdCAoaSkge1xyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5zZWxlY3RJdGVtcykgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgIHRoaXMuc2VsZWN0SXRlbXNbaV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICB0aGlzLnB1dFJlc3BvbnNlKHRoaXMub3V0cHV0c0RhdGFbaV0gfHwge3N0ZG91dDogJycsIGlucHV0OiAnJ30pXHJcbiAgICB9XHJcbiAgICBwdXQgKGRhdGEpIHtcclxuICAgICAgICB0aGlzLm91dHB1dHNEYXRhW2RhdGEuaW5wdXRJZF0gPSBkYXRhXHJcbiAgICB9XHJcbiAgICBwdXRSZXNwb25zZSAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUxvYWRpbmcoKVxyXG4gICAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgICAgIGlmIChkYXRhLmhhc0Vycm9yIHx8IGRhdGEuaGFzQ29kZUVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlT3V0cHV0Qm94KGRhdGEuZXJyLCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG91dHB1dEJveE1lc3NhZ2UgPSAnJ1xyXG4gICAgICAgICAgICBvdXRwdXRCb3hNZXNzYWdlICs9IGRhdGEuc29sdmVkID8gYDxzcGFuIGNsYXNzPSdncmVlbic+Q2hhbGxlbmdlIHNvbHZlZCE8L3NwYW4+XFxuYCA6IGA8c3BhbiBjbGFzcz0ncmVkJz5DaGFsbGVuZ2Ugbm90IHNvbHZlZCE8L3NwYW4+XFxuYFxyXG4gICAgICAgICAgICBpZiAoZGF0YS5zb2x2ZWQpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dEJveE1lc3NhZ2UgKz0gYDxzcGFuIGNsYXNzPSdncmVlbic+ID0+IFRvdGFsIFN0ZXBzIHRvIFNvbHZlOiAke2RhdGEuc3RlcHN9IChTY29yZXMgZWFybmVkOiAke2RhdGEuc2NvcmVzLnN0ZXBzfSk8L3NwYW4+XFxuYFxyXG4gICAgICAgICAgICAgICAgb3V0cHV0Qm94TWVzc2FnZSArPSBgPHNwYW4gY2xhc3M9J2dyZWVuJz4gPT4gRXhlY3V0aW5nIER1cmF0aW9uOiAke2RhdGEuZHVyYXRpb259IChTY29yZXMgZWFybmVkOiAke2RhdGEuc2NvcmVzLmR1cmF0aW9ufSk8L3NwYW4+XFxuYFxyXG4gICAgICAgICAgICAgICAgb3V0cHV0Qm94TWVzc2FnZSArPSBgPHNwYW4gY2xhc3M9J2dyZWVuJz4gPT4gRXN0aW1hdGVkIFRvdGFsIFNjb3JlOiAke2RhdGEuc2NvcmVzLnRvdGFsfTwvc3Bhbj5cXG5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0cHV0Qm94TWVzc2FnZSArPSBgXFxuWW91ciBPdXRwdXQ6XFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbmBcclxuICAgICAgICAgICAgb3V0cHV0Qm94TWVzc2FnZSArPSBkYXRhLnN0ZG91dFxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZU91dHB1dEJveChvdXRwdXRCb3hNZXNzYWdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgIHRoaXMuY2hhbmdlSW5wdXRCb3goZGF0YS5pbnB1dClcclxuICAgIH1cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUlucHV0Qm94KFwiXCIpXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VPdXRwdXRCb3goXCJcIilcclxuICAgIH1cclxuICAgIGNoYW5nZUlucHV0Qm94IChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEJveC5pbm5lckhUTUwgPSBkYXRhXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VPdXRwdXRCb3ggKGRhdGEsIGlzRXJyb3IgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChpc0Vycm9yKSB0aGlzLm91dHB1dEJveC5jbGFzc0xpc3QuYWRkKCdlcnJvci1tb2RlJylcclxuICAgICAgICBlbHNlIHsgdGhpcy5vdXRwdXRCb3guY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3ItbW9kZScpIH1cclxuICAgICAgICB0aGlzLm91dHB1dEJveC5pbm5lckhUTUwgPSBkYXRhXHJcbiAgICB9XHJcbiAgICBlbmFibGVMb2FkaW5nICgpIHtcclxuICAgICAgICB0aGlzLmxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgfVxyXG4gICAgZGlzYWJsZUxvYWRpbmcgKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT3V0cHV0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vT3V0cHV0LmpzIiwiY29uc3QgVGVhbSA9IHJlcXVpcmUoXCIuL1RlYW1cIilcclxuXHJcbmNsYXNzIExlYWRlcmJvYXJkIHtcclxuICAgIGNvbnN0cnVjdG9yIChhcHAsIHF1ZXJ5KSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcclxuICAgICAgICB0aGlzLmxpc3QgPSAkKHF1ZXJ5KVxyXG4gICAgICAgIHRoaXMudGVhbXMgPSBbXVxyXG4gICAgICAgIHRoaXMuaGlnaHRzY29yZSA9IDBcclxuICAgIH1cclxuICAgIGFkZFRlYW0gKGlkLCB1c2VybmFtZSwgbmFtZSwgc2NvcmUsIG5lZWRzVXBkYXRlID0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IHRlYW0gPSBuZXcgVGVhbSh0aGlzLCBpZCwgdXNlcm5hbWUsIG5hbWUsIHNjb3JlKVxyXG4gICAgICAgIHRoaXMubGlzdC5hcHBlbmRDaGlsZCh0ZWFtLmVsZW1lbnQpXHJcbiAgICAgICAgdGhpcy50ZWFtcy5wdXNoKHRlYW0pXHJcbiAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB0aGlzLnVwZGF0ZVRlYW1zKClcclxuICAgICAgICByZXR1cm4gdGVhbS5lbGVtZW50XHJcbiAgICB9XHJcbiAgICBjbGVhckFsbCAoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKSB7XHJcbiAgICAgICAgICAgIHRlYW0uZWxlbWVudC5yZW1vdmUoKVxyXG4gICAgICAgICAgICB0ZWFtID0gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlYW1zID0gW11cclxuICAgIH1cclxuICAgIGdldFRlYW1CeUlkIChpZCkge1xyXG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcykgaWYgKHRlYW0uaWQgPT0gaWQpIHJldHVybiB0ZWFtXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBnZXRUZWFtQnlVc2VybmFtZSAodXNlcm5hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCB0ZWFtIG9mIHRoaXMudGVhbXMpIGlmICh0ZWFtLnVzZXJuYW1lID09IHVzZXJuYW1lKSByZXR1cm4gdGVhbVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSBcclxuICAgIGdldFRoaXNUZWFtICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZWFtQnlVc2VybmFtZSh0aGlzLmFwcC51c2VybmFtZSlcclxuICAgIH1cclxuICAgIGluaXRpYWxpemVUZWFtcyAodGVhbXMpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWxsKClcclxuICAgICAgICBmb3IgKGxldCB1c2VybmFtZSBpbiB0ZWFtcykge1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gdGVhbXNbdXNlcm5hbWVdXHJcbiAgICAgICAgICAgIGlmICh1c2VybmFtZSA9PT0gdGhpcy5hcHAudXNlcm5hbWUpIHRlYW0uaWQgPSB0aGlzLmFwcC5jb25uZWN0aW9uLmlkXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVGVhbSh0ZWFtLmlkLCB1c2VybmFtZSwgdGVhbS5uYW1lLCB0ZWFtLnNjb3JlLCBmYWxzZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hcHAudWkuaW5pdFByb2ZpbGUodGhpcy5nZXRUaGlzVGVhbSgpKVxyXG4gICAgICAgIHRoaXMudXBkYXRlVGVhbXMoKVxyXG4gICAgfVxyXG4gICAgdXBkYXRlVGVhbXMgKCkge1xyXG4gICAgICAgIGxldCBzY29yZXMgPSBbXSwgcGxhY2UgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKSBzY29yZXMucHVzaCh0ZWFtLnNjb3JlKVxyXG4gICAgICAgIHNjb3JlcyA9IHNjb3Jlcy5maWx0ZXIoKHNjb3JlLCBpKSA9PiBzY29yZXMuaW5kZXhPZihzY29yZSkgPT0gaSkuc29ydCgoQSwgQikgPT4ge1xyXG4gICAgICAgICAgICBpZihBIDwgQikgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIGlmKEEgPiBCKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKSB0ZWFtLnJhbmsgPSBzY29yZXMuaW5kZXhPZih0ZWFtLnNjb3JlKSArIDFcclxuICAgICAgICB0aGlzLnRlYW1zLnNvcnQoKEEsIEIpID0+IHtcclxuICAgICAgICAgICAgaWYoQS5yYW5rIDwgQi5yYW5rKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIGlmKEEucmFuayA+IEIucmFuaykgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5oaWdoc2NvcmUgPSB0aGlzLnRlYW1zWzBdLnNjb3JlXHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKSB7XHJcbiAgICAgICAgICAgIHRlYW0ucGxhY2UgPSBwbGFjZSsrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhpZ2hzY29yZSAhPT0gMCkgdGVhbS5wcm9ncmVzcyA9IHRlYW0uc2NvcmUgLyB0aGlzLmhpZ2hzY29yZVxyXG4gICAgICAgICAgICBlbHNlIHRlYW0ucHJvZ3Jlc3MgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlzYWJsZSAoKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExlYWRlcmJvYXJkXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vTGVhZGVyYm9hcmQuanMiLCJjbGFzcyBUZWFtIHtcclxuICAgIGNvbnN0cnVjdG9yIChsZWFkZXJib2FyZCwgaWQsIHVzZXJuYW1lLCBuYW1lLCBzY29yZSkge1xyXG4gICAgICAgIHRoaXMubGVhZGVyYm9hcmQgPSBsZWFkZXJib2FyZFxyXG4gICAgICAgIHRoaXMudWkgPSB0aGlzLmxlYWRlcmJvYXJkLmFwcC51aVxyXG4gICAgICAgIHRoaXMuaWQgPSBpZFxyXG4gICAgICAgIHRoaXMuX3JhbmsgPSAxXHJcbiAgICAgICAgdGhpcy5fcGxhY2UgPSAwXHJcbiAgICAgICAgdGhpcy5pc01lID0gZmFsc2VcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lXHJcbiAgICAgICAgdGhpcy5fc2NvcmUgPSBzY29yZVxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZGVmaW5lRWxlbWVudCgpXHJcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZVwiKVxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NcIilcclxuICAgIH1cclxuICAgIGRlZmluZUVsZW1lbnQgKCkge1xyXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwibmFtZVwiPiR7dGhpcy5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzY29yZVwiPiR7dGhpcy5zY29yZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmVoaW5kLXByb2dyZXNzXCI+PC9kaXY+YFxyXG4gICAgICAgIGlmICh0aGlzLnVzZXJuYW1lID09PSB0aGlzLmxlYWRlcmJvYXJkLmFwcC51c2VybmFtZSkge1xyXG4gICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdtZScpXHJcbiAgICAgICAgICAgIHRoaXMuaXNNZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHNjb3JlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcmVcclxuICAgIH1cclxuICAgIHNldCBzY29yZSAoc2NvcmUpIHtcclxuICAgICAgICB0aGlzLl9zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJIVE1MID0gc2NvcmVcclxuICAgICAgICBpZiAodGhpcy5pc01lKSB7XHJcbiAgICAgICAgICAgICQoJ2hlYWRlciAudGVhbSAuc2NvcmUnKS5pbm5lckhUTUwgPSAkKCdib2R5ID4gZGlhbG9nID4gc3BhbicpLmlubmVySFRNTCA9IHNjb3JlXHJcbiAgICAgICAgICAgIHRoaXMudWkuYW5ub3VuY2VIaWdoU2NvcmUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxlYWRlcmJvYXJkLnVwZGF0ZVRlYW1zKClcclxuICAgIH1cclxuICAgIGdldCBwbGFjZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlXHJcbiAgICB9XHJcbiAgICBzZXQgcGxhY2UgKHBsYWNlKSB7XHJcbiAgICAgICAgdGhpcy5fcGxhY2UgPSBwbGFjZVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSAodGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodCArIDUpICogdGhpcy5wbGFjZSArIFwicHhcIlxyXG4gICAgfVxyXG4gICAgZ2V0IHJhbmsgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5rXHJcbiAgICB9XHJcbiAgICBzZXQgcmFuayAocmFuaykge1xyXG4gICAgICAgIHRoaXMuX3JhbmsgPSByYW5rXHJcbiAgICAgICAgLy8gdGhpcy5yYW5rRWxlbWVudC5pbm5lckhUTUwgPSByYW5rXHJcbiAgICB9XHJcbiAgICBzZXQgcHJvZ3Jlc3MgKHJhdGUpIHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzRWxlbWVudC5zdHlsZS53aWR0aCA9IChyYXRlICogMTAwKSArIFwiJVwiXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGVhbVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1RlYW0uanMiLCJjb25zdCBUYWJzID0gcmVxdWlyZShcIi4vVGFic1wiKVxyXG5cclxuY2xhc3MgVUkge1xyXG4gICAgY29uc3RydWN0b3IgKGFwcCkge1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXHJcbiAgICAgICAgdGhpcy50YWJzID0gbmV3IFRhYnMoYXBwKVxyXG4gICAgICAgIHRoaXMudXNlcm5hbWVUeHQgPSAkKCdoZWFkZXIgLnRlYW0gLm5hbWUnKVxyXG4gICAgICAgIHRoaXMuc2NvcmVUeHQgPSAkKCdoZWFkZXIgLnRlYW0gLnNjb3JlJylcclxuICAgIH1cclxuICAgIGluaXRQcm9maWxlIChteVRlYW0pIHtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lVHh0LmlubmVySFRNTCA9IG15VGVhbS5uYW1lXHJcbiAgICAgICAgdGhpcy5zY29yZVR4dC5pbm5lckhUTUwgPSBteVRlYW0uc2NvcmVcclxuICAgIH1cclxuICAgIHNldFRpbWVyIChzZWNvbmRzKSB7XHJcbiAgICAgICAgbGV0IHNlY3MgPSBzZWNvbmRzICUgNjBcclxuICAgICAgICBsZXQgbWlucyA9IChzZWNvbmRzIC0gc2VjcykgLyA2MFxyXG4gICAgICAgIGlmIChzZWNzIDwgMTApIHNlY3MgPSBcIjBcIiArIHNlY3NcclxuICAgICAgICAkKFwiaGVhZGVyID4gdGltZVwiKS5pbm5lckhUTUwgPSBzZWNvbmRzID4gMCA/IChtaW5zICsgXCI6XCIgKyBzZWNzKSA6IFwiVGltZSdzIHVwIVwiXHJcbiAgICB9XHJcbiAgICBhbm5vdW5jZUhpZ2hTY29yZSAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdoaWdoc2NvcmUtbW9kZScpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hzY29yZS1tb2RlJyksIDI1MDApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVUlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9VSS5qcyIsImNsYXNzIFRhYnMge1xyXG4gICAgY29uc3RydWN0b3IgKGFwcCkge1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXHJcbiAgICAgICAgY29uc3QgdGFicyA9ICQkKFwiYm9keSA+IG1haW4gPiBzZWN0aW9uID4gbmF2ID4gbGlcIilcclxuICAgICAgICBmb3IgKGxldCB0YWIgb2YgdGFicykge1xyXG4gICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gdGhpcy5zZWxlY3QoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYWdlXCIpKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keSA+IG1haW4gPiBzZWN0aW9uID4gbmF2ID4gbGkuc3VibWl0JylcclxuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucnVuVGhlQ29kZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMuc2VsZWN0KCdlZGl0b3InKVxyXG4gICAgICAgIC8vIHRoaXMudHJ5VG9SZW1lbWJlcigpXHJcbiAgICB9XHJcbiAgICB0cnlUb1JlbWVtYmVyICgpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlWyd0YWItc2VsZWN0ZWQnXSAhPT0gdW5kZWZpbmVkKSB0aGlzLnNlbGVjdChsb2NhbFN0b3JhZ2VbJ3RhYi1zZWxlY3RlZCddKVxyXG4gICAgICAgIGVsc2UgdGhpcy5zZWxlY3QoXCJjaGFsbGVuZ2VcIilcclxuICAgIH1cclxuICAgIHN0b3JlTGFzdFRhYlNlbGVjdGVkICh3aGljaCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZVsndGFiLXNlbGVjdGVkJ10gPSB3aGljaFxyXG4gICAgfVxyXG4gICAgc2VsZWN0ICh3aGljaCkge1xyXG4gICAgICAgIC8vIHNob3cgdGhlIHNlbGVjdGVkIHRhYiBhbmQgaGlkZSB0aGUgb3RoZXJzXHJcbiAgICAgICAgZm9yIChsZXQgcGFnZSBvZiAkJChcIi50YWItcGFnZVwiKSkgcGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAkKFwiLnRhYi1wYWdlI1wiICsgd2hpY2gpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIlxyXG4gICAgICAgIC8vIGRlYWN0aXZlIGFsbCBpdGVtcyBidXQgdGhlIHNlbGVjdGVkIGl0ZW0sIGFuZCBtYWtlIGl0IGFjdGl2ZVxyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgJCQoYGJvZHkgPiBtYWluID4gc2VjdGlvbiA+IG5hdiA+IGxpYCkpIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxyXG4gICAgICAgICQoYGJvZHkgPiBtYWluID4gc2VjdGlvbiA+IG5hdiA+IGxpOm5vdCguc3VibWl0KVtkYXRhLXBhZ2U9XCIke3doaWNofVwiXWApLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxuICAgICAgICAvLyBTdG9yZVxyXG4gICAgICAgIHRoaXMuc3RvcmVMYXN0VGFiU2VsZWN0ZWQod2hpY2gpXHJcbiAgICB9XHJcbiAgICBydW5UaGVDb2RlICgpIHtcclxuICAgICAgICBpZiAodGhpcy5hcHAuc29ja2V0LmlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwLnNvY2tldC5ydW5UaGVDb2RlKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBZb3UgY2Fubm90IHJ1biB5b3VyIGNvZGUgd2hlbiB5b3UgYXJlIG9mZmxpbmVgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYWJzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGFicy5qcyIsImNsYXNzIFNvY2tldCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwLCBhZGRyZXNzKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcclxuICAgICAgICB0aGlzLmVkaXRvciA9IGFwcC5lZGl0b3JcclxuICAgICAgICB0aGlzLm91dHB1dCA9IGFwcC5vdXRwdXRcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoYWRkcmVzcylcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignaW5pdGlhbC1zZXR0aW5ncycsIHRoaXMub25Jbml0aWFsU2V0dGluZ3MuYmluZCh0aGlzKSlcclxuICAgICAgICB0aGlzLnNvY2tldC5vbigndGltZS1zeW5jJywgdGhpcy5vblRpbWVTeW5jLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ3Njb3JlLWNoYW5nZWQnLCB0aGlzLm9uU2NvcmVDaGFuZ2VkLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2NvbnNvbGUtcmVzcG9uc2UnLCB0aGlzLm9uQ29uc29sZVJlc3BvbnNlLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMudGVzdENvbm5lY3Rpb25JbnRlcnZhbCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlLCA1MDAwKVxyXG4gICAgfVxyXG4gICAgb25Jbml0aWFsU2V0dGluZ3MgKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmFwcC5jb25uZWN0aW9uLmlkID0gZGF0YS5pZFxyXG4gICAgICAgIHRoaXMub25UaW1lU3luYyhkYXRhLnRpbWUpXHJcbiAgICAgICAgdGhpcy5hcHAubGVhZGVyYm9hcmQuaW5pdGlhbGl6ZVRlYW1zKGRhdGEudGVhbXMpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgndXNlci1jb25uZWN0Jywge1xyXG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5hcHAudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmFwcC5jb25uZWN0aW9uLmlkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvbkNvbnNvbGVSZXNwb25zZSAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMub3V0cHV0LnB1dChkYXRhKVxyXG4gICAgICAgIHRoaXMub3V0cHV0LnNlbGVjdChkYXRhLmlucHV0SWQpXHJcbiAgICB9XHJcbiAgICBvblRpbWVTeW5jIChzZWNvbmRzKSB7XHJcbiAgICAgICAgaWYgKHNlY29uZHMgPCAoMTAgKiA2MCkgJiYgdGhpcy5hcHAubW9kZSA9PT0gJ2NvZGluZycpIHRoaXMuYXBwLmVudGVyTml0cm9Nb2RlKClcclxuICAgICAgICBpZiAoc2Vjb25kcyA8PSAwICYmICh0aGlzLmFwcC5tb2RlID09PSAnbml0cm8nIHx8IHRoaXMuYXBwLm1vZGUgPT09ICdjb2RpbmcnKSkgdGhpcy5hcHAuZW50ZXJUaW1lc1VwTW9kZSgpXHJcbiAgICAgICAgdGhpcy5hcHAudWkuc2V0VGltZXIoc2Vjb25kcylcclxuICAgICAgICB0aGlzLmNoZWNrQ29ubmVjdGlvbk9uVGltZXJTeW5jZWQoKVxyXG4gICAgfVxyXG4gICAgY2hlY2tDb25uZWN0aW9uT25UaW1lclN5bmNlZCAoKSB7XHJcbiAgICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWVcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50ZXN0Q29ubmVjdGlvbkludGVydmFsKVxyXG4gICAgICAgIHRoaXMudGVzdENvbm5lY3Rpb25JbnRlcnZhbCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlLCA1MDAwKVxyXG4gICAgfVxyXG4gICAgcnVuVGhlQ29kZSAoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgndXNlci1ydW4nLCB7XHJcbiAgICAgICAgICAgIGNvZGU6IHRoaXMuYXBwLmVkaXRvci52YWx1ZSxcclxuICAgICAgICAgICAgbGFuZzogdGhpcy5lZGl0b3IubGFuZ3VhZ2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMub3V0cHV0LmVuYWJsZUxvYWRpbmcoKVxyXG4gICAgfVxyXG4gICAgc3VibWl0VGhlQ29kZSAoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgndXNlci1zdWJtaXQnLCB7XHJcbiAgICAgICAgICAgIGNvZGU6IHRoaXMuYXBwLmVkaXRvci52YWx1ZSxcclxuICAgICAgICAgICAgbGFuZzogdGhpcy5lZGl0b3IubGFuZ3VhZ2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMub3V0cHV0LmVuYWJsZUxvYWRpbmcoKVxyXG4gICAgfVxyXG4gICAgZ2V0IGlzQ29ubmVjdGVkICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29ubmVjdGVkXHJcbiAgICB9XHJcbiAgICBzZXQgaXNDb25uZWN0ZWQgKHNob3VsZENvbm5lY3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2Nvbm5lY3RlZCAmJiBzaG91bGRDb25uZWN0KSB0aGlzLm9uQ29ubmVjdGlvbkZvdW5kKClcclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9jb25uZWN0ZWQgJiYgIXNob3VsZENvbm5lY3QpIHRoaXMub25Db25uZWN0aW9uTG9zdCgpXHJcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gc2hvdWxkQ29ubmVjdFxyXG4gICAgfVxyXG4gICAgb25Db25uZWN0aW9uRm91bmQgKCkge1xyXG4gICAgICAgICQoJ2Zvb3RlciAuY29ubmVjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhaWwnKVxyXG4gICAgfVxyXG4gICAgb25Db25uZWN0aW9uTG9zdCAoKSB7XHJcbiAgICAgICAgJCgnZm9vdGVyIC5jb25uZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnZmFpbCcpXHJcbiAgICB9XHJcbiAgICBvblNjb3JlQ2hhbmdlZCAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuYXBwLmxlYWRlcmJvYXJkLmdldFRlYW1CeVVzZXJuYW1lKGRhdGEudXNlcm5hbWUpLnNjb3JlID0gZGF0YS5zY29yZVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvY2tldFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1NvY2tldC5qcyIsIi8qZ2xvYmFsIGRlZmluZTpmYWxzZSAqL1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE3IENyYWlnIENhbXBiZWxsXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogTW91c2V0cmFwIGlzIGEgc2ltcGxlIGtleWJvYXJkIHNob3J0Y3V0IGxpYnJhcnkgZm9yIEphdmFzY3JpcHQgd2l0aFxuICogbm8gZXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKlxuICogQHZlcnNpb24gMS42LjFcbiAqIEB1cmwgY3JhaWcuaXMva2lsbGluZy9taWNlXG4gKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICAgIC8vIENoZWNrIGlmIG1vdXNldHJhcCBpcyB1c2VkIGluc2lkZSBicm93c2VyLCBpZiBub3QsIHJldHVyblxuICAgIGlmICghd2luZG93KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtYXBwaW5nIG9mIHNwZWNpYWwga2V5Y29kZXMgdG8gdGhlaXIgY29ycmVzcG9uZGluZyBrZXlzXG4gICAgICpcbiAgICAgKiBldmVyeXRoaW5nIGluIHRoaXMgZGljdGlvbmFyeSBjYW5ub3QgdXNlIGtleXByZXNzIGV2ZW50c1xuICAgICAqIHNvIGl0IGhhcyB0byBiZSBoZXJlIHRvIG1hcCB0byB0aGUgY29ycmVjdCBrZXljb2RlcyBmb3JcbiAgICAgKiBrZXl1cC9rZXlkb3duIGV2ZW50c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX01BUCA9IHtcbiAgICAgICAgODogJ2JhY2tzcGFjZScsXG4gICAgICAgIDk6ICd0YWInLFxuICAgICAgICAxMzogJ2VudGVyJyxcbiAgICAgICAgMTY6ICdzaGlmdCcsXG4gICAgICAgIDE3OiAnY3RybCcsXG4gICAgICAgIDE4OiAnYWx0JyxcbiAgICAgICAgMjA6ICdjYXBzbG9jaycsXG4gICAgICAgIDI3OiAnZXNjJyxcbiAgICAgICAgMzI6ICdzcGFjZScsXG4gICAgICAgIDMzOiAncGFnZXVwJyxcbiAgICAgICAgMzQ6ICdwYWdlZG93bicsXG4gICAgICAgIDM1OiAnZW5kJyxcbiAgICAgICAgMzY6ICdob21lJyxcbiAgICAgICAgMzc6ICdsZWZ0JyxcbiAgICAgICAgMzg6ICd1cCcsXG4gICAgICAgIDM5OiAncmlnaHQnLFxuICAgICAgICA0MDogJ2Rvd24nLFxuICAgICAgICA0NTogJ2lucycsXG4gICAgICAgIDQ2OiAnZGVsJyxcbiAgICAgICAgOTE6ICdtZXRhJyxcbiAgICAgICAgOTM6ICdtZXRhJyxcbiAgICAgICAgMjI0OiAnbWV0YSdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogbWFwcGluZyBmb3Igc3BlY2lhbCBjaGFyYWN0ZXJzIHNvIHRoZXkgY2FuIHN1cHBvcnRcbiAgICAgKlxuICAgICAqIHRoaXMgZGljdGlvbmFyeSBpcyBvbmx5IHVzZWQgaW5jYXNlIHlvdSB3YW50IHRvIGJpbmQgYVxuICAgICAqIGtleXVwIG9yIGtleWRvd24gZXZlbnQgdG8gb25lIG9mIHRoZXNlIGtleXNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9LRVlDT0RFX01BUCA9IHtcbiAgICAgICAgMTA2OiAnKicsXG4gICAgICAgIDEwNzogJysnLFxuICAgICAgICAxMDk6ICctJyxcbiAgICAgICAgMTEwOiAnLicsXG4gICAgICAgIDExMSA6ICcvJyxcbiAgICAgICAgMTg2OiAnOycsXG4gICAgICAgIDE4NzogJz0nLFxuICAgICAgICAxODg6ICcsJyxcbiAgICAgICAgMTg5OiAnLScsXG4gICAgICAgIDE5MDogJy4nLFxuICAgICAgICAxOTE6ICcvJyxcbiAgICAgICAgMTkyOiAnYCcsXG4gICAgICAgIDIxOTogJ1snLFxuICAgICAgICAyMjA6ICdcXFxcJyxcbiAgICAgICAgMjIxOiAnXScsXG4gICAgICAgIDIyMjogJ1xcJydcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdGhpcyBpcyBhIG1hcHBpbmcgb2Yga2V5cyB0aGF0IHJlcXVpcmUgc2hpZnQgb24gYSBVUyBrZXlwYWRcbiAgICAgKiBiYWNrIHRvIHRoZSBub24gc2hpZnQgZXF1aXZlbGVudHNcbiAgICAgKlxuICAgICAqIHRoaXMgaXMgc28geW91IGNhbiB1c2Uga2V5dXAgZXZlbnRzIHdpdGggdGhlc2Uga2V5c1xuICAgICAqXG4gICAgICogbm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IHdvcmsgcmVsaWFibHkgb24gVVMga2V5Ym9hcmRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfU0hJRlRfTUFQID0ge1xuICAgICAgICAnfic6ICdgJyxcbiAgICAgICAgJyEnOiAnMScsXG4gICAgICAgICdAJzogJzInLFxuICAgICAgICAnIyc6ICczJyxcbiAgICAgICAgJyQnOiAnNCcsXG4gICAgICAgICclJzogJzUnLFxuICAgICAgICAnXic6ICc2JyxcbiAgICAgICAgJyYnOiAnNycsXG4gICAgICAgICcqJzogJzgnLFxuICAgICAgICAnKCc6ICc5JyxcbiAgICAgICAgJyknOiAnMCcsXG4gICAgICAgICdfJzogJy0nLFxuICAgICAgICAnKyc6ICc9JyxcbiAgICAgICAgJzonOiAnOycsXG4gICAgICAgICdcXFwiJzogJ1xcJycsXG4gICAgICAgICc8JzogJywnLFxuICAgICAgICAnPic6ICcuJyxcbiAgICAgICAgJz8nOiAnLycsXG4gICAgICAgICd8JzogJ1xcXFwnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRoaXMgaXMgYSBsaXN0IG9mIHNwZWNpYWwgc3RyaW5ncyB5b3UgY2FuIHVzZSB0byBtYXBcbiAgICAgKiB0byBtb2RpZmllciBrZXlzIHdoZW4geW91IHNwZWNpZnkgeW91ciBrZXlib2FyZCBzaG9ydGN1dHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9TUEVDSUFMX0FMSUFTRVMgPSB7XG4gICAgICAgICdvcHRpb24nOiAnYWx0JyxcbiAgICAgICAgJ2NvbW1hbmQnOiAnbWV0YScsXG4gICAgICAgICdyZXR1cm4nOiAnZW50ZXInLFxuICAgICAgICAnZXNjYXBlJzogJ2VzYycsXG4gICAgICAgICdwbHVzJzogJysnLFxuICAgICAgICAnbW9kJzogL01hY3xpUG9kfGlQaG9uZXxpUGFkLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSkgPyAnbWV0YScgOiAnY3RybCdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdmFyaWFibGUgdG8gc3RvcmUgdGhlIGZsaXBwZWQgdmVyc2lvbiBvZiBfTUFQIGZyb20gYWJvdmVcbiAgICAgKiBuZWVkZWQgdG8gY2hlY2sgaWYgd2Ugc2hvdWxkIHVzZSBrZXlwcmVzcyBvciBub3Qgd2hlbiBubyBhY3Rpb25cbiAgICAgKiBpcyBzcGVjaWZpZWRcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHZhciBfUkVWRVJTRV9NQVA7XG5cbiAgICAvKipcbiAgICAgKiBsb29wIHRocm91Z2ggdGhlIGYga2V5cywgZjEgdG8gZjE5IGFuZCBhZGQgdGhlbSB0byB0aGUgbWFwXG4gICAgICogcHJvZ3JhbWF0aWNhbGx5XG4gICAgICovXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyMDsgKytpKSB7XG4gICAgICAgIF9NQVBbMTExICsgaV0gPSAnZicgKyBpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvb3AgdGhyb3VnaCB0byBtYXAgbnVtYmVycyBvbiB0aGUgbnVtZXJpYyBrZXlwYWRcbiAgICAgKi9cbiAgICBmb3IgKGkgPSAwOyBpIDw9IDk7ICsraSkge1xuXG4gICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gdXNlIGEgc3RyaW5nIGNhdXNlIG90aGVyd2lzZSBzaW5jZSAwIGlzIGZhbHNleVxuICAgICAgICAvLyBtb3VzZXRyYXAgd2lsbCBuZXZlciBmaXJlIGZvciBudW1wYWQgMCBwcmVzc2VkIGFzIHBhcnQgb2YgYSBrZXlkb3duXG4gICAgICAgIC8vIGV2ZW50LlxuICAgICAgICAvL1xuICAgICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jY2FtcGJlbGwvbW91c2V0cmFwL3B1bGwvMjU4XG4gICAgICAgIF9NQVBbaSArIDk2XSA9IGkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcm9zcyBicm93c2VyIGFkZCBldmVudCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudHxIVE1MRG9jdW1lbnR9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2FkZEV2ZW50KG9iamVjdCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKG9iamVjdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqZWN0LmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGFrZXMgdGhlIGV2ZW50IGFuZCByZXR1cm5zIHRoZSBrZXkgY2hhcmFjdGVyXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9jaGFyYWN0ZXJGcm9tRXZlbnQoZSkge1xuXG4gICAgICAgIC8vIGZvciBrZXlwcmVzcyBldmVudHMgd2Ugc2hvdWxkIHJldHVybiB0aGUgY2hhcmFjdGVyIGFzIGlzXG4gICAgICAgIGlmIChlLnR5cGUgPT0gJ2tleXByZXNzJykge1xuICAgICAgICAgICAgdmFyIGNoYXJhY3RlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBzaGlmdCBrZXkgaXMgbm90IHByZXNzZWQgdGhlbiBpdCBpcyBzYWZlIHRvIGFzc3VtZVxuICAgICAgICAgICAgLy8gdGhhdCB3ZSB3YW50IHRoZSBjaGFyYWN0ZXIgdG8gYmUgbG93ZXJjYXNlLiAgdGhpcyBtZWFucyBpZlxuICAgICAgICAgICAgLy8geW91IGFjY2lkZW50YWxseSBoYXZlIGNhcHMgbG9jayBvbiB0aGVuIHlvdXIga2V5IGJpbmRpbmdzXG4gICAgICAgICAgICAvLyB3aWxsIGNvbnRpbnVlIHRvIHdvcmtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGUgb25seSBzaWRlIGVmZmVjdCB0aGF0IG1pZ2h0IG5vdCBiZSBkZXNpcmVkIGlzIGlmIHlvdVxuICAgICAgICAgICAgLy8gYmluZCBzb21ldGhpbmcgbGlrZSAnQScgY2F1c2UgeW91IHdhbnQgdG8gdHJpZ2dlciBhblxuICAgICAgICAgICAgLy8gZXZlbnQgd2hlbiBjYXBpdGFsIEEgaXMgcHJlc3NlZCBjYXBzIGxvY2sgd2lsbCBubyBsb25nZXJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgdGhlIGV2ZW50LiAgc2hpZnQrYSB3aWxsIHRob3VnaC5cbiAgICAgICAgICAgIGlmICghZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yIG5vbiBrZXlwcmVzcyBldmVudHMgdGhlIHNwZWNpYWwgbWFwcyBhcmUgbmVlZGVkXG4gICAgICAgIGlmIChfTUFQW2Uud2hpY2hdKSB7XG4gICAgICAgICAgICByZXR1cm4gX01BUFtlLndoaWNoXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfS0VZQ09ERV9NQVBbZS53aGljaF0pIHtcbiAgICAgICAgICAgIHJldHVybiBfS0VZQ09ERV9NQVBbZS53aGljaF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBpcyBub3QgaW4gdGhlIHNwZWNpYWwgbWFwXG5cbiAgICAgICAgLy8gd2l0aCBrZXlkb3duIGFuZCBrZXl1cCBldmVudHMgdGhlIGNoYXJhY3RlciBzZWVtcyB0byBhbHdheXNcbiAgICAgICAgLy8gY29tZSBpbiBhcyBhbiB1cHBlcmNhc2UgY2hhcmFjdGVyIHdoZXRoZXIgeW91IGFyZSBwcmVzc2luZyBzaGlmdFxuICAgICAgICAvLyBvciBub3QuICB3ZSBzaG91bGQgbWFrZSBzdXJlIGl0IGlzIGFsd2F5cyBsb3dlcmNhc2UgZm9yIGNvbXBhcmlzb25zXG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hlY2tzIGlmIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMxXG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzMlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9tb2RpZmllcnNNYXRjaChtb2RpZmllcnMxLCBtb2RpZmllcnMyKSB7XG4gICAgICAgIHJldHVybiBtb2RpZmllcnMxLnNvcnQoKS5qb2luKCcsJykgPT09IG1vZGlmaWVyczIuc29ydCgpLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0YWtlcyBhIGtleSBldmVudCBhbmQgZmlndXJlcyBvdXQgd2hhdCB0aGUgbW9kaWZpZXJzIGFyZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZXZlbnRNb2RpZmllcnMoZSkge1xuICAgICAgICB2YXIgbW9kaWZpZXJzID0gW107XG5cbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdzaGlmdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnYWx0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnY3RybCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ21ldGEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb2RpZmllcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHJldmVudHMgZGVmYXVsdCBmb3IgdGhpcyBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfcHJldmVudERlZmF1bHQoZSkge1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN0b3BzIHByb3BvZ2F0aW9uIGZvciB0aGlzIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9zdG9wUHJvcGFnYXRpb24oZSkge1xuICAgICAgICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGV0ZXJtaW5lcyBpZiB0aGUga2V5Y29kZSBzcGVjaWZpZWQgaXMgYSBtb2RpZmllciBrZXkgb3Igbm90XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2lzTW9kaWZpZXIoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NoaWZ0JyB8fCBrZXkgPT0gJ2N0cmwnIHx8IGtleSA9PSAnYWx0JyB8fCBrZXkgPT0gJ21ldGEnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldmVyc2VzIHRoZSBtYXAgbG9va3VwIHNvIHRoYXQgd2UgY2FuIGxvb2sgZm9yIHNwZWNpZmljIGtleXNcbiAgICAgKiB0byBzZWUgd2hhdCBjYW4gYW5kIGNhbid0IHVzZSBrZXlwcmVzc1xuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9nZXRSZXZlcnNlTWFwKCkge1xuICAgICAgICBpZiAoIV9SRVZFUlNFX01BUCkge1xuICAgICAgICAgICAgX1JFVkVSU0VfTUFQID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gX01BUCkge1xuXG4gICAgICAgICAgICAgICAgLy8gcHVsbCBvdXQgdGhlIG51bWVyaWMga2V5cGFkIGZyb20gaGVyZSBjYXVzZSBrZXlwcmVzcyBzaG91bGRcbiAgICAgICAgICAgICAgICAvLyBiZSBhYmxlIHRvIGRldGVjdCB0aGUga2V5cyBmcm9tIHRoZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID4gOTUgJiYga2V5IDwgMTEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfTUFQLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX1JFVkVSU0VfTUFQW19NQVBba2V5XV0gPSBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfUkVWRVJTRV9NQVA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGlja3MgdGhlIGJlc3QgYWN0aW9uIGJhc2VkIG9uIHRoZSBrZXkgY29tYmluYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBjaGFyYWN0ZXIgZm9yIGtleVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uIHBhc3NlZCBpblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9waWNrQmVzdEFjdGlvbihrZXksIG1vZGlmaWVycywgYWN0aW9uKSB7XG5cbiAgICAgICAgLy8gaWYgbm8gYWN0aW9uIHdhcyBwaWNrZWQgaW4gd2Ugc2hvdWxkIHRyeSB0byBwaWNrIHRoZSBvbmVcbiAgICAgICAgLy8gdGhhdCB3ZSB0aGluayB3b3VsZCB3b3JrIGJlc3QgZm9yIHRoaXMga2V5XG4gICAgICAgIGlmICghYWN0aW9uKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBfZ2V0UmV2ZXJzZU1hcCgpW2tleV0gPyAna2V5ZG93bicgOiAna2V5cHJlc3MnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW9kaWZpZXIga2V5cyBkb24ndCB3b3JrIGFzIGV4cGVjdGVkIHdpdGgga2V5cHJlc3MsXG4gICAgICAgIC8vIHN3aXRjaCB0byBrZXlkb3duXG4gICAgICAgIGlmIChhY3Rpb24gPT0gJ2tleXByZXNzJyAmJiBtb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAna2V5ZG93bic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGZyb20gYSBzdHJpbmcga2V5IGNvbWJpbmF0aW9uIHRvIGFuIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbWJpbmF0aW9uIGxpa2UgXCJjb21tYW5kK3NoaWZ0K2xcIlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9rZXlzRnJvbVN0cmluZyhjb21iaW5hdGlvbikge1xuICAgICAgICBpZiAoY29tYmluYXRpb24gPT09ICcrJykge1xuICAgICAgICAgICAgcmV0dXJuIFsnKyddO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tYmluYXRpb24gPSBjb21iaW5hdGlvbi5yZXBsYWNlKC9cXCt7Mn0vZywgJytwbHVzJyk7XG4gICAgICAgIHJldHVybiBjb21iaW5hdGlvbi5zcGxpdCgnKycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mbyBmb3IgYSBzcGVjaWZpYyBrZXkgY29tYmluYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29tYmluYXRpb24ga2V5IGNvbWJpbmF0aW9uIChcImNvbW1hbmQrc1wiIG9yIFwiYVwiIG9yIFwiKlwiKVxuICAgICAqIEBwYXJhbSAge3N0cmluZz19IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldEtleUluZm8oY29tYmluYXRpb24sIGFjdGlvbikge1xuICAgICAgICB2YXIga2V5cztcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBtb2RpZmllcnMgPSBbXTtcblxuICAgICAgICAvLyB0YWtlIHRoZSBrZXlzIGZyb20gdGhpcyBwYXR0ZXJuIGFuZCBmaWd1cmUgb3V0IHdoYXQgdGhlIGFjdHVhbFxuICAgICAgICAvLyBwYXR0ZXJuIGlzIGFsbCBhYm91dFxuICAgICAgICBrZXlzID0gX2tleXNGcm9tU3RyaW5nKGNvbWJpbmF0aW9uKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcblxuICAgICAgICAgICAgLy8gbm9ybWFsaXplIGtleSBuYW1lc1xuICAgICAgICAgICAgaWYgKF9TUEVDSUFMX0FMSUFTRVNba2V5XSkge1xuICAgICAgICAgICAgICAgIGtleSA9IF9TUEVDSUFMX0FMSUFTRVNba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBub3QgYSBrZXlwcmVzcyBldmVudCB0aGVuIHdlIHNob3VsZFxuICAgICAgICAgICAgLy8gYmUgc21hcnQgYWJvdXQgdXNpbmcgc2hpZnQga2V5c1xuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIG9ubHkgd29yayBmb3IgVVMga2V5Ym9hcmRzIGhvd2V2ZXJcbiAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uICE9ICdrZXlwcmVzcycgJiYgX1NISUZUX01BUFtrZXldKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gX1NISUZUX01BUFtrZXldO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdzaGlmdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGtleSBpcyBhIG1vZGlmaWVyIHRoZW4gYWRkIGl0IHRvIHRoZSBsaXN0IG9mIG1vZGlmaWVyc1xuICAgICAgICAgICAgaWYgKF9pc01vZGlmaWVyKGtleSkpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVwZW5kaW5nIG9uIHdoYXQgdGhlIGtleSBjb21iaW5hdGlvbiBpc1xuICAgICAgICAvLyB3ZSB3aWxsIHRyeSB0byBwaWNrIHRoZSBiZXN0IGV2ZW50IGZvciBpdFxuICAgICAgICBhY3Rpb24gPSBfcGlja0Jlc3RBY3Rpb24oa2V5LCBtb2RpZmllcnMsIGFjdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMsXG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9iZWxvbmdzVG8oZWxlbWVudCwgYW5jZXN0b3IpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50ID09PSBhbmNlc3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX2JlbG9uZ3NUbyhlbGVtZW50LnBhcmVudE5vZGUsIGFuY2VzdG9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBNb3VzZXRyYXAodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGFyZ2V0RWxlbWVudCA9IHRhcmdldEVsZW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICAgICAgaWYgKCEoc2VsZiBpbnN0YW5jZW9mIE1vdXNldHJhcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW91c2V0cmFwKHRhcmdldEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGVsZW1lbnQgdG8gYXR0YWNoIGtleSBldmVudHMgdG9cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLnRhcmdldCA9IHRhcmdldEVsZW1lbnQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGEgbGlzdCBvZiBhbGwgdGhlIGNhbGxiYWNrcyBzZXR1cCB2aWEgTW91c2V0cmFwLmJpbmQoKVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5fY2FsbGJhY2tzID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRpcmVjdCBtYXAgb2Ygc3RyaW5nIGNvbWJpbmF0aW9ucyB0byBjYWxsYmFja3MgdXNlZCBmb3IgdHJpZ2dlcigpXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9kaXJlY3RNYXAgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICoga2VlcHMgdHJhY2sgb2Ygd2hhdCBsZXZlbCBlYWNoIHNlcXVlbmNlIGlzIGF0IHNpbmNlIG11bHRpcGxlXG4gICAgICAgICAqIHNlcXVlbmNlcyBjYW4gc3RhcnQgb3V0IHdpdGggdGhlIHNhbWUgc2VxdWVuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfc2VxdWVuY2VMZXZlbHMgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdmFyaWFibGUgdG8gc3RvcmUgdGhlIHNldFRpbWVvdXQgY2FsbFxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7bnVsbHxudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX3Jlc2V0VGltZXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRlbXBvcmFyeSBzdGF0ZSB3aGVyZSB3ZSB3aWxsIGlnbm9yZSB0aGUgbmV4dCBrZXl1cFxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX2lnbm9yZU5leHRLZXl1cCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0ZW1wb3Jhcnkgc3RhdGUgd2hlcmUgd2Ugd2lsbCBpZ25vcmUgdGhlIG5leHQga2V5cHJlc3NcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX2lnbm9yZU5leHRLZXlwcmVzcyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhcmUgd2UgY3VycmVudGx5IGluc2lkZSBvZiBhIHNlcXVlbmNlP1xuICAgICAgICAgKiB0eXBlIG9mIGFjdGlvbiAoXCJrZXl1cFwiIG9yIFwia2V5ZG93blwiIG9yIFwia2V5cHJlc3NcIikgb3IgZmFsc2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW58c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVzZXRzIGFsbCBzZXF1ZW5jZSBjb3VudGVycyBleGNlcHQgZm9yIHRoZSBvbmVzIHBhc3NlZCBpblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9Ob3RSZXNldFxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfcmVzZXRTZXF1ZW5jZXMoZG9Ob3RSZXNldCkge1xuICAgICAgICAgICAgZG9Ob3RSZXNldCA9IGRvTm90UmVzZXQgfHwge307XG5cbiAgICAgICAgICAgIHZhciBhY3RpdmVTZXF1ZW5jZXMgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBrZXk7XG5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIF9zZXF1ZW5jZUxldmVscykge1xuICAgICAgICAgICAgICAgIGlmIChkb05vdFJlc2V0W2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlU2VxdWVuY2VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9zZXF1ZW5jZUxldmVsc1trZXldID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFhY3RpdmVTZXF1ZW5jZXMpIHtcbiAgICAgICAgICAgICAgICBfbmV4dEV4cGVjdGVkQWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZmluZHMgYWxsIGNhbGxiYWNrcyB0aGF0IG1hdGNoIGJhc2VkIG9uIHRoZSBrZXljb2RlLCBtb2RpZmllcnMsXG4gICAgICAgICAqIGFuZCBhY3Rpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAgICAgICAgICogQHBhcmFtIHtFdmVudHxPYmplY3R9IGVcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBzZXF1ZW5jZU5hbWUgLSBuYW1lIG9mIHRoZSBzZXF1ZW5jZSB3ZSBhcmUgbG9va2luZyBmb3JcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBjb21iaW5hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IGxldmVsXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRNYXRjaGVzKGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlLCBzZXF1ZW5jZU5hbWUsIGNvbWJpbmF0aW9uLCBsZXZlbCkge1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2s7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGUudHlwZTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIGV2ZW50cyByZWxhdGVkIHRvIHRoaXMga2V5Y29kZVxuICAgICAgICAgICAgaWYgKCFzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgYSBtb2RpZmllciBrZXkgaXMgY29taW5nIHVwIG9uIGl0cyBvd24gd2Ugc2hvdWxkIGFsbG93IGl0XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdrZXl1cCcgJiYgX2lzTW9kaWZpZXIoY2hhcmFjdGVyKSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycyA9IFtjaGFyYWN0ZXJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNhbGxiYWNrcyBmb3IgdGhlIGtleSB0aGF0IHdhcyBwcmVzc2VkXG4gICAgICAgICAgICAvLyBhbmQgc2VlIGlmIGFueSBvZiB0aGVtIG1hdGNoXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl0ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdW2ldO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgYSBzZXF1ZW5jZSBuYW1lIGlzIG5vdCBzcGVjaWZpZWQsIGJ1dCB0aGlzIGlzIGEgc2VxdWVuY2UgYXRcbiAgICAgICAgICAgICAgICAvLyB0aGUgd3JvbmcgbGV2ZWwgdGhlbiBtb3ZlIG9udG8gdGhlIG5leHQgbWF0Y2hcbiAgICAgICAgICAgICAgICBpZiAoIXNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5zZXEgJiYgX3NlcXVlbmNlTGV2ZWxzW2NhbGxiYWNrLnNlcV0gIT0gY2FsbGJhY2subGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFjdGlvbiB3ZSBhcmUgbG9va2luZyBmb3IgZG9lc24ndCBtYXRjaCB0aGUgYWN0aW9uIHdlIGdvdFxuICAgICAgICAgICAgICAgIC8vIHRoZW4gd2Ugc2hvdWxkIGtlZXAgZ29pbmdcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICE9IGNhbGxiYWNrLmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGEga2V5cHJlc3MgZXZlbnQgYW5kIHRoZSBtZXRhIGtleSBhbmQgY29udHJvbCBrZXlcbiAgICAgICAgICAgICAgICAvLyBhcmUgbm90IHByZXNzZWQgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gb25seSBsb29rIGF0IHRoZVxuICAgICAgICAgICAgICAgIC8vIGNoYXJhY3Rlciwgb3RoZXJ3aXNlIGNoZWNrIHRoZSBtb2RpZmllcnMgYXMgd2VsbFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gY2hyb21lIHdpbGwgbm90IGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIGNvbnRyb2wgaXMgZG93blxuICAgICAgICAgICAgICAgIC8vIHNhZmFyaSB3aWxsIGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIG1ldGErc2hpZnQgaXMgZG93blxuICAgICAgICAgICAgICAgIC8vIGZpcmVmb3ggd2lsbCBmaXJlIGEga2V5cHJlc3MgaWYgbWV0YSBvciBjb250cm9sIGlzIGRvd25cbiAgICAgICAgICAgICAgICBpZiAoKGFjdGlvbiA9PSAna2V5cHJlc3MnICYmICFlLm1ldGFLZXkgJiYgIWUuY3RybEtleSkgfHwgX21vZGlmaWVyc01hdGNoKG1vZGlmaWVycywgY2FsbGJhY2subW9kaWZpZXJzKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4geW91IGJpbmQgYSBjb21iaW5hdGlvbiBvciBzZXF1ZW5jZSBhIHNlY29uZCB0aW1lIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBvdmVyd3JpdGUgdGhlIGZpcnN0IG9uZS4gIGlmIGEgc2VxdWVuY2VOYW1lIG9yXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbWJpbmF0aW9uIGlzIHNwZWNpZmllZCBpbiB0aGlzIGNhbGwgaXQgZG9lcyBqdXN0IHRoYXRcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gbWFrZSBkZWxldGluZyBpdHMgb3duIG1ldGhvZD9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0ZUNvbWJvID0gIXNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5jb21ibyA9PSBjb21iaW5hdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0ZVNlcXVlbmNlID0gc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLnNlcSA9PSBzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2subGV2ZWwgPT0gbGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWxldGVDb21ibyB8fCBkZWxldGVTZXF1ZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFjdHVhbGx5IGNhbGxzIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBpZiB5b3VyIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UgdGhpcyB3aWxsIHVzZSB0aGUganF1ZXJ5XG4gICAgICAgICAqIGNvbnZlbnRpb24gLSBwcmV2ZW50IGRlZmF1bHQgYW5kIHN0b3AgcHJvcG9nYXRpb24gb24gdGhlIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2ZpcmVDYWxsYmFjayhjYWxsYmFjaywgZSwgY29tYm8sIHNlcXVlbmNlKSB7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgZXZlbnQgc2hvdWxkIG5vdCBoYXBwZW4gc3RvcCBoZXJlXG4gICAgICAgICAgICBpZiAoc2VsZi5zdG9wQ2FsbGJhY2soZSwgZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LCBjb21ibywgc2VxdWVuY2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soZSwgY29tYm8pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIF9wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgICAgICAgICBfc3RvcFByb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGhhbmRsZXMgYSBjaGFyYWN0ZXIga2V5IGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyYWN0ZXJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5faGFuZGxlS2V5ID0gZnVuY3Rpb24oY2hhcmFjdGVyLCBtb2RpZmllcnMsIGUpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSBfZ2V0TWF0Y2hlcyhjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSk7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHZhciBkb05vdFJlc2V0ID0ge307XG4gICAgICAgICAgICB2YXIgbWF4TGV2ZWwgPSAwO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBtYXhMZXZlbCBmb3Igc2VxdWVuY2VzIHNvIHdlIGNhbiBvbmx5IGV4ZWN1dGUgdGhlIGxvbmdlc3QgY2FsbGJhY2sgc2VxdWVuY2VcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLnNlcSkge1xuICAgICAgICAgICAgICAgICAgICBtYXhMZXZlbCA9IE1hdGgubWF4KG1heExldmVsLCBjYWxsYmFja3NbaV0ubGV2ZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIG1hdGNoaW5nIGNhbGxiYWNrcyBmb3IgdGhpcyBrZXkgZXZlbnRcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICAgICAgICAgIC8vIGZpcmUgZm9yIGFsbCBzZXF1ZW5jZSBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGJlY2F1c2UgaWYgZm9yIGV4YW1wbGUgeW91IGhhdmUgbXVsdGlwbGUgc2VxdWVuY2VzXG4gICAgICAgICAgICAgICAgLy8gYm91bmQgc3VjaCBhcyBcImcgaVwiIGFuZCBcImcgdFwiIHRoZXkgYm90aCBuZWVkIHRvIGZpcmUgdGhlXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgZm9yIG1hdGNoaW5nIGcgY2F1c2Ugb3RoZXJ3aXNlIHlvdSBjYW4gb25seSBldmVyXG4gICAgICAgICAgICAgICAgLy8gbWF0Y2ggdGhlIGZpcnN0IG9uZVxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0uc2VxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSBmaXJlIGNhbGxiYWNrcyBmb3IgdGhlIG1heExldmVsIHRvIHByZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gc3Vic2VxdWVuY2VzIGZyb20gYWxzbyBmaXJpbmdcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV4YW1wbGUgJ2Egb3B0aW9uIGInIHNob3VsZCBub3QgY2F1c2UgJ29wdGlvbiBiJyB0byBmaXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW4gdGhvdWdoICdvcHRpb24gYicgaXMgcGFydCBvZiB0aGUgb3RoZXIgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gYW55IHNlcXVlbmNlcyB0aGF0IGRvIG5vdCBtYXRjaCBoZXJlIHdpbGwgYmUgZGlzY2FyZGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGJlbG93IGJ5IHRoZSBfcmVzZXRTZXF1ZW5jZXMgY2FsbFxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzW2ldLmxldmVsICE9IG1heExldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGtlZXAgYSBsaXN0IG9mIHdoaWNoIHNlcXVlbmNlcyB3ZXJlIG1hdGNoZXMgZm9yIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIGRvTm90UmVzZXRbY2FsbGJhY2tzW2ldLnNlcV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrc1tpXS5jYWxsYmFjaywgZSwgY2FsbGJhY2tzW2ldLmNvbWJvLCBjYWxsYmFja3NbaV0uc2VxKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgd2VyZSBubyBzZXF1ZW5jZSBtYXRjaGVzIGJ1dCB3ZSBhcmUgc3RpbGwgaGVyZVxuICAgICAgICAgICAgICAgIC8vIHRoYXQgbWVhbnMgdGhpcyBpcyBhIHJlZ3VsYXIgbWF0Y2ggc28gd2Ugc2hvdWxkIGZpcmUgdGhhdFxuICAgICAgICAgICAgICAgIGlmICghcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrc1tpXS5jYWxsYmFjaywgZSwgY2FsbGJhY2tzW2ldLmNvbWJvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBrZXkgeW91IHByZXNzZWQgbWF0Y2hlcyB0aGUgdHlwZSBvZiBzZXF1ZW5jZSB3aXRob3V0XG4gICAgICAgICAgICAvLyBiZWluZyBhIG1vZGlmaWVyIChpZSBcImtleXVwXCIgb3IgXCJrZXlwcmVzc1wiKSB0aGVuIHdlIHNob3VsZFxuICAgICAgICAgICAgLy8gcmVzZXQgYWxsIHNlcXVlbmNlcyB0aGF0IHdlcmUgbm90IG1hdGNoZWQgYnkgdGhpcyBldmVudFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgc28sIGZvciBleGFtcGxlLCBpZiB5b3UgaGF2ZSB0aGUgc2VxdWVuY2UgXCJoIGEgdFwiIGFuZCB5b3VcbiAgICAgICAgICAgIC8vIHR5cGUgXCJoIGUgYSByIHRcIiBpdCBkb2VzIG5vdCBtYXRjaC4gIGluIHRoaXMgY2FzZSB0aGUgXCJlXCIgd2lsbFxuICAgICAgICAgICAgLy8gY2F1c2UgdGhlIHNlcXVlbmNlIHRvIHJlc2V0XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gbW9kaWZpZXIga2V5cyBhcmUgaWdub3JlZCBiZWNhdXNlIHlvdSBjYW4gaGF2ZSBhIHNlcXVlbmNlXG4gICAgICAgICAgICAvLyB0aGF0IGNvbnRhaW5zIG1vZGlmaWVycyBzdWNoIGFzIFwiZW50ZXIgY3RybCtzcGFjZVwiIGFuZCBpbiBtb3N0XG4gICAgICAgICAgICAvLyBjYXNlcyB0aGUgbW9kaWZpZXIga2V5IHdpbGwgYmUgcHJlc3NlZCBiZWZvcmUgdGhlIG5leHQga2V5XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gYWxzbyBpZiB5b3UgaGF2ZSBhIHNlcXVlbmNlIHN1Y2ggYXMgXCJjdHJsK2IgYVwiIHRoZW4gcHJlc3NpbmcgdGhlXG4gICAgICAgICAgICAvLyBcImJcIiBrZXkgd2lsbCB0cmlnZ2VyIGEgXCJrZXlwcmVzc1wiIGFuZCBhIFwia2V5ZG93blwiXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhlIFwia2V5ZG93blwiIGlzIGV4cGVjdGVkIHdoZW4gdGhlcmUgaXMgYSBtb2RpZmllciwgYnV0IHRoZVxuICAgICAgICAgICAgLy8gXCJrZXlwcmVzc1wiIGVuZHMgdXAgbWF0Y2hpbmcgdGhlIF9uZXh0RXhwZWN0ZWRBY3Rpb24gc2luY2UgaXQgb2NjdXJzXG4gICAgICAgICAgICAvLyBhZnRlciBhbmQgdGhhdCBjYXVzZXMgdGhlIHNlcXVlbmNlIHRvIHJlc2V0XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gd2UgaWdub3JlIGtleXByZXNzZXMgaW4gYSBzZXF1ZW5jZSB0aGF0IGRpcmVjdGx5IGZvbGxvdyBhIGtleWRvd25cbiAgICAgICAgICAgIC8vIGZvciB0aGUgc2FtZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHZhciBpZ25vcmVUaGlzS2V5cHJlc3MgPSBlLnR5cGUgPT0gJ2tleXByZXNzJyAmJiBfaWdub3JlTmV4dEtleXByZXNzO1xuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSBfbmV4dEV4cGVjdGVkQWN0aW9uICYmICFfaXNNb2RpZmllcihjaGFyYWN0ZXIpICYmICFpZ25vcmVUaGlzS2V5cHJlc3MpIHtcbiAgICAgICAgICAgICAgICBfcmVzZXRTZXF1ZW5jZXMoZG9Ob3RSZXNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5cHJlc3MgPSBwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrICYmIGUudHlwZSA9PSAna2V5ZG93bic7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGhhbmRsZXMgYSBrZXlkb3duIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2hhbmRsZUtleUV2ZW50KGUpIHtcblxuICAgICAgICAgICAgLy8gbm9ybWFsaXplIGUud2hpY2ggZm9yIGtleSBldmVudHNcbiAgICAgICAgICAgIC8vIEBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80Mjg1NjI3L2phdmFzY3JpcHQta2V5Y29kZS12cy1jaGFyY29kZS11dHRlci1jb25mdXNpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZS53aGljaCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBlLndoaWNoID0gZS5rZXlDb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gX2NoYXJhY3RlckZyb21FdmVudChlKTtcblxuICAgICAgICAgICAgLy8gbm8gY2hhcmFjdGVyIGZvdW5kIHRoZW4gc3RvcFxuICAgICAgICAgICAgaWYgKCFjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5lZWQgdG8gdXNlID09PSBmb3IgdGhlIGNoYXJhY3RlciBjaGVjayBiZWNhdXNlIHRoZSBjaGFyYWN0ZXIgY2FuIGJlIDBcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ2tleXVwJyAmJiBfaWdub3JlTmV4dEtleXVwID09PSBjaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICBfaWdub3JlTmV4dEtleXVwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmhhbmRsZUtleShjaGFyYWN0ZXIsIF9ldmVudE1vZGlmaWVycyhlKSwgZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogY2FsbGVkIHRvIHNldCBhIDEgc2Vjb25kIHRpbWVvdXQgb24gdGhlIHNwZWNpZmllZCBzZXF1ZW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiB0aGlzIGlzIHNvIGFmdGVyIGVhY2gga2V5IHByZXNzIGluIHRoZSBzZXF1ZW5jZSB5b3UgaGF2ZSAxIHNlY29uZFxuICAgICAgICAgKiB0byBwcmVzcyB0aGUgbmV4dCBrZXkgYmVmb3JlIHlvdSBoYXZlIHRvIHN0YXJ0IG92ZXJcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX3Jlc2V0U2VxdWVuY2VUaW1lcigpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfcmVzZXRUaW1lcik7XG4gICAgICAgICAgICBfcmVzZXRUaW1lciA9IHNldFRpbWVvdXQoX3Jlc2V0U2VxdWVuY2VzLCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBhIGtleSBzZXF1ZW5jZSB0byBhbiBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tYm8gLSBjb21ibyBzcGVjaWZpZWQgaW4gYmluZCBjYWxsXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGtleXNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2JpbmRTZXF1ZW5jZShjb21ibywga2V5cywgY2FsbGJhY2ssIGFjdGlvbikge1xuXG4gICAgICAgICAgICAvLyBzdGFydCBvZmYgYnkgYWRkaW5nIGEgc2VxdWVuY2UgbGV2ZWwgcmVjb3JkIGZvciB0aGlzIGNvbWJpbmF0aW9uXG4gICAgICAgICAgICAvLyBhbmQgc2V0dGluZyB0aGUgbGV2ZWwgdG8gMFxuICAgICAgICAgICAgX3NlcXVlbmNlTGV2ZWxzW2NvbWJvXSA9IDA7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogY2FsbGJhY2sgdG8gaW5jcmVhc2UgdGhlIHNlcXVlbmNlIGxldmVsIGZvciB0aGlzIHNlcXVlbmNlIGFuZCByZXNldFxuICAgICAgICAgICAgICogYWxsIG90aGVyIHNlcXVlbmNlcyB0aGF0IHdlcmUgYWN0aXZlXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5leHRBY3Rpb25cbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gX2luY3JlYXNlU2VxdWVuY2UobmV4dEFjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX25leHRFeHBlY3RlZEFjdGlvbiA9IG5leHRBY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICsrX3NlcXVlbmNlTGV2ZWxzW2NvbWJvXTtcbiAgICAgICAgICAgICAgICAgICAgX3Jlc2V0U2VxdWVuY2VUaW1lcigpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogd3JhcHMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayBpbnNpZGUgb2YgYW5vdGhlciBmdW5jdGlvbiBpbiBvcmRlclxuICAgICAgICAgICAgICogdG8gcmVzZXQgYWxsIHNlcXVlbmNlIGNvdW50ZXJzIGFzIHNvb24gYXMgdGhpcyBzZXF1ZW5jZSBpcyBkb25lXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBfY2FsbGJhY2tBbmRSZXNldChlKSB7XG4gICAgICAgICAgICAgICAgX2ZpcmVDYWxsYmFjayhjYWxsYmFjaywgZSwgY29tYm8pO1xuXG4gICAgICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGlnbm9yZSB0aGUgbmV4dCBrZXkgdXAgaWYgdGhlIGFjdGlvbiBpcyBrZXkgZG93blxuICAgICAgICAgICAgICAgIC8vIG9yIGtleXByZXNzLiAgdGhpcyBpcyBzbyBpZiB5b3UgZmluaXNoIGEgc2VxdWVuY2UgYW5kXG4gICAgICAgICAgICAgICAgLy8gcmVsZWFzZSB0aGUga2V5IHRoZSBmaW5hbCBrZXkgd2lsbCBub3QgdHJpZ2dlciBhIGtleXVwXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAhPT0gJ2tleXVwJykge1xuICAgICAgICAgICAgICAgICAgICBfaWdub3JlTmV4dEtleXVwID0gX2NoYXJhY3RlckZyb21FdmVudChlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB3ZWlyZCByYWNlIGNvbmRpdGlvbiBpZiBhIHNlcXVlbmNlIGVuZHMgd2l0aCB0aGUga2V5XG4gICAgICAgICAgICAgICAgLy8gYW5vdGhlciBzZXF1ZW5jZSBiZWdpbnMgd2l0aFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoX3Jlc2V0U2VxdWVuY2VzLCAxMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBrZXlzIG9uZSBhdCBhIHRpbWUgYW5kIGJpbmQgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrXG4gICAgICAgICAgICAvLyBmdW5jdGlvbi4gIGZvciBhbnkga2V5IGxlYWRpbmcgdXAgdG8gdGhlIGZpbmFsIG9uZSBpdCBzaG91bGRcbiAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBzZXF1ZW5jZS4gYWZ0ZXIgdGhlIGZpbmFsLCBpdCBzaG91bGQgcmVzZXQgYWxsIHNlcXVlbmNlc1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGlmIGFuIGFjdGlvbiBpcyBzcGVjaWZpZWQgaW4gdGhlIG9yaWdpbmFsIGJpbmQgY2FsbCB0aGVuIHRoYXQgd2lsbFxuICAgICAgICAgICAgLy8gYmUgdXNlZCB0aHJvdWdob3V0LiAgb3RoZXJ3aXNlIHdlIHdpbGwgcGFzcyB0aGUgYWN0aW9uIHRoYXQgdGhlXG4gICAgICAgICAgICAvLyBuZXh0IGtleSBpbiB0aGUgc2VxdWVuY2Ugc2hvdWxkIG1hdGNoLiAgdGhpcyBhbGxvd3MgYSBzZXF1ZW5jZVxuICAgICAgICAgICAgLy8gdG8gbWl4IGFuZCBtYXRjaCBrZXlwcmVzcyBhbmQga2V5ZG93biBldmVudHMgZGVwZW5kaW5nIG9uIHdoaWNoXG4gICAgICAgICAgICAvLyBvbmVzIGFyZSBiZXR0ZXIgc3VpdGVkIHRvIHRoZSBrZXkgcHJvdmlkZWRcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBpc0ZpbmFsID0gaSArIDEgPT09IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkQ2FsbGJhY2sgPSBpc0ZpbmFsID8gX2NhbGxiYWNrQW5kUmVzZXQgOiBfaW5jcmVhc2VTZXF1ZW5jZShhY3Rpb24gfHwgX2dldEtleUluZm8oa2V5c1tpICsgMV0pLmFjdGlvbik7XG4gICAgICAgICAgICAgICAgX2JpbmRTaW5nbGUoa2V5c1tpXSwgd3JhcHBlZENhbGxiYWNrLCBhY3Rpb24sIGNvbWJvLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBhIHNpbmdsZSBrZXlib2FyZCBjb21iaW5hdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tYmluYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmc9fSBzZXF1ZW5jZU5hbWUgLSBuYW1lIG9mIHNlcXVlbmNlIGlmIHBhcnQgb2Ygc2VxdWVuY2VcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXI9fSBsZXZlbCAtIHdoYXQgcGFydCBvZiB0aGUgc2VxdWVuY2UgdGhlIGNvbW1hbmQgaXNcbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2JpbmRTaW5nbGUoY29tYmluYXRpb24sIGNhbGxiYWNrLCBhY3Rpb24sIHNlcXVlbmNlTmFtZSwgbGV2ZWwpIHtcblxuICAgICAgICAgICAgLy8gc3RvcmUgYSBkaXJlY3QgbWFwcGVkIHJlZmVyZW5jZSBmb3IgdXNlIHdpdGggTW91c2V0cmFwLnRyaWdnZXJcbiAgICAgICAgICAgIHNlbGYuX2RpcmVjdE1hcFtjb21iaW5hdGlvbiArICc6JyArIGFjdGlvbl0gPSBjYWxsYmFjaztcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIG11bHRpcGxlIHNwYWNlcyBpbiBhIHJvdyBiZWNvbWUgYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgICAgIGNvbWJpbmF0aW9uID0gY29tYmluYXRpb24ucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuXG4gICAgICAgICAgICB2YXIgc2VxdWVuY2UgPSBjb21iaW5hdGlvbi5zcGxpdCgnICcpO1xuICAgICAgICAgICAgdmFyIGluZm87XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMgcGF0dGVybiBpcyBhIHNlcXVlbmNlIG9mIGtleXMgdGhlbiBydW4gdGhyb3VnaCB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgLy8gdG8gcmVwcm9jZXNzIGVhY2ggcGF0dGVybiBvbmUga2V5IGF0IGEgdGltZVxuICAgICAgICAgICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBfYmluZFNlcXVlbmNlKGNvbWJpbmF0aW9uLCBzZXF1ZW5jZSwgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmZvID0gX2dldEtleUluZm8oY29tYmluYXRpb24sIGFjdGlvbik7XG5cbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0byBpbml0aWFsaXplIGFycmF5IGlmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgICAgIC8vIGEgY2FsbGJhY2sgaXMgYWRkZWQgZm9yIHRoaXMga2V5XG4gICAgICAgICAgICBzZWxmLl9jYWxsYmFja3NbaW5mby5rZXldID0gc2VsZi5fY2FsbGJhY2tzW2luZm8ua2V5XSB8fCBbXTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFuIGV4aXN0aW5nIG1hdGNoIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgICAgX2dldE1hdGNoZXMoaW5mby5rZXksIGluZm8ubW9kaWZpZXJzLCB7dHlwZTogaW5mby5hY3Rpb259LCBzZXF1ZW5jZU5hbWUsIGNvbWJpbmF0aW9uLCBsZXZlbCk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGlzIGNhbGwgYmFjayB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGEgc2VxdWVuY2UgcHV0IGl0IGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIC8vIGlmIG5vdCBwdXQgaXQgYXQgdGhlIGVuZFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IGJlY2F1c2UgdGhlIHdheSB0aGVzZSBhcmUgcHJvY2Vzc2VkIGV4cGVjdHNcbiAgICAgICAgICAgIC8vIHRoZSBzZXF1ZW5jZSBvbmVzIHRvIGNvbWUgZmlyc3RcbiAgICAgICAgICAgIHNlbGYuX2NhbGxiYWNrc1tpbmZvLmtleV1bc2VxdWVuY2VOYW1lID8gJ3Vuc2hpZnQnIDogJ3B1c2gnXSh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyczogaW5mby5tb2RpZmllcnMsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBpbmZvLmFjdGlvbixcbiAgICAgICAgICAgICAgICBzZXE6IHNlcXVlbmNlTmFtZSxcbiAgICAgICAgICAgICAgICBsZXZlbDogbGV2ZWwsXG4gICAgICAgICAgICAgICAgY29tYm86IGNvbWJpbmF0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBiaW5kcyBtdWx0aXBsZSBjb21iaW5hdGlvbnMgdG8gdGhlIHNhbWUgY2FsbGJhY2tcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gY29tYmluYXRpb25zXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gYWN0aW9uXG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2JpbmRNdWx0aXBsZSA9IGZ1bmN0aW9uKGNvbWJpbmF0aW9ucywgY2FsbGJhY2ssIGFjdGlvbikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21iaW5hdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBfYmluZFNpbmdsZShjb21iaW5hdGlvbnNbaV0sIGNhbGxiYWNrLCBhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHN0YXJ0IVxuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleXByZXNzJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICAgICAgX2FkZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXlkb3duJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICAgICAgX2FkZEV2ZW50KHRhcmdldEVsZW1lbnQsICdrZXl1cCcsIF9oYW5kbGVLZXlFdmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZHMgYW4gZXZlbnQgdG8gbW91c2V0cmFwXG4gICAgICpcbiAgICAgKiBjYW4gYmUgYSBzaW5nbGUga2V5LCBhIGNvbWJpbmF0aW9uIG9mIGtleXMgc2VwYXJhdGVkIHdpdGggKyxcbiAgICAgKiBhbiBhcnJheSBvZiBrZXlzLCBvciBhIHNlcXVlbmNlIG9mIGtleXMgc2VwYXJhdGVkIGJ5IHNwYWNlc1xuICAgICAqXG4gICAgICogYmUgc3VyZSB0byBsaXN0IHRoZSBtb2RpZmllciBrZXlzIGZpcnN0IHRvIG1ha2Ugc3VyZSB0aGF0IHRoZVxuICAgICAqIGNvcnJlY3Qga2V5IGVuZHMgdXAgZ2V0dGluZyBib3VuZCAodGhlIGxhc3Qga2V5IGluIHRoZSBwYXR0ZXJuKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGtleXNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYWN0aW9uIC0gJ2tleXByZXNzJywgJ2tleWRvd24nLCBvciAna2V5dXAnXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGtleXMsIGNhbGxiYWNrLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBrZXlzID0ga2V5cyBpbnN0YW5jZW9mIEFycmF5ID8ga2V5cyA6IFtrZXlzXTtcbiAgICAgICAgc2VsZi5fYmluZE11bHRpcGxlLmNhbGwoc2VsZiwga2V5cywgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmRzIGFuIGV2ZW50IHRvIG1vdXNldHJhcFxuICAgICAqXG4gICAgICogdGhlIHVuYmluZGluZyBzZXRzIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvZiB0aGUgc3BlY2lmaWVkIGtleSBjb21ib1xuICAgICAqIHRvIGFuIGVtcHR5IGZ1bmN0aW9uIGFuZCBkZWxldGVzIHRoZSBjb3JyZXNwb25kaW5nIGtleSBpbiB0aGVcbiAgICAgKiBfZGlyZWN0TWFwIGRpY3QuXG4gICAgICpcbiAgICAgKiBUT0RPOiBhY3R1YWxseSByZW1vdmUgdGhpcyBmcm9tIHRoZSBfY2FsbGJhY2tzIGRpY3Rpb25hcnkgaW5zdGVhZFxuICAgICAqIG9mIGJpbmRpbmcgYW4gZW1wdHkgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIHRoZSBrZXljb21ibythY3Rpb24gaGFzIHRvIGJlIGV4YWN0bHkgdGhlIHNhbWUgYXNcbiAgICAgKiBpdCB3YXMgZGVmaW5lZCBpbiB0aGUgYmluZCBtZXRob2RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBrZXlzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uKGtleXMsIGFjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLmJpbmQuY2FsbChzZWxmLCBrZXlzLCBmdW5jdGlvbigpIHt9LCBhY3Rpb24pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0cmlnZ2VycyBhbiBldmVudCB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gYm91bmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlzXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb25cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24oa2V5cywgYWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuX2RpcmVjdE1hcFtrZXlzICsgJzonICsgYWN0aW9uXSkge1xuICAgICAgICAgICAgc2VsZi5fZGlyZWN0TWFwW2tleXMgKyAnOicgKyBhY3Rpb25dKHt9LCBrZXlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogcmVzZXRzIHRoZSBsaWJyYXJ5IGJhY2sgdG8gaXRzIGluaXRpYWwgc3RhdGUuICB0aGlzIGlzIHVzZWZ1bFxuICAgICAqIGlmIHlvdSB3YW50IHRvIGNsZWFyIG91dCB0aGUgY3VycmVudCBrZXlib2FyZCBzaG9ydGN1dHMgYW5kIGJpbmRcbiAgICAgKiBuZXcgb25lcyAtIGZvciBleGFtcGxlIGlmIHlvdSBzd2l0Y2ggdG8gYW5vdGhlciBwYWdlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYuX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICBzZWxmLl9kaXJlY3RNYXAgPSB7fTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHNob3VsZCB3ZSBzdG9wIHRoaXMgZXZlbnQgYmVmb3JlIGZpcmluZyBvZmYgY2FsbGJhY2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKGUsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIC8vIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3MgXCJtb3VzZXRyYXBcIiB0aGVuIG5vIG5lZWQgdG8gc3RvcFxuICAgICAgICBpZiAoKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgbW91c2V0cmFwICcpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfYmVsb25nc1RvKGVsZW1lbnQsIHNlbGYudGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcCBmb3IgaW5wdXQsIHNlbGVjdCwgYW5kIHRleHRhcmVhXG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT0gJ0lOUFVUJyB8fCBlbGVtZW50LnRhZ05hbWUgPT0gJ1NFTEVDVCcgfHwgZWxlbWVudC50YWdOYW1lID09ICdURVhUQVJFQScgfHwgZWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZXhwb3NlcyBfaGFuZGxlS2V5IHB1YmxpY2x5IHNvIGl0IGNhbiBiZSBvdmVyd3JpdHRlbiBieSBleHRlbnNpb25zXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5oYW5kbGVLZXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gc2VsZi5faGFuZGxlS2V5LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGFsbG93IGN1c3RvbSBrZXkgbWFwcGluZ3NcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAuYWRkS2V5Y29kZXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgX01BUFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX1JFVkVSU0VfTUFQID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdCB0aGUgZ2xvYmFsIG1vdXNldHJhcCBmdW5jdGlvbnNcbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIG5lZWRlZCB0byBhbGxvdyB0aGUgZ2xvYmFsIG1vdXNldHJhcCBmdW5jdGlvbnMgdG8gd29ya1xuICAgICAqIG5vdyB0aGF0IG1vdXNldHJhcCBpcyBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIE1vdXNldHJhcC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkb2N1bWVudE1vdXNldHJhcCA9IE1vdXNldHJhcChkb2N1bWVudCk7XG4gICAgICAgIGZvciAodmFyIG1ldGhvZCBpbiBkb2N1bWVudE1vdXNldHJhcCkge1xuICAgICAgICAgICAgaWYgKG1ldGhvZC5jaGFyQXQoMCkgIT09ICdfJykge1xuICAgICAgICAgICAgICAgIE1vdXNldHJhcFttZXRob2RdID0gKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRNb3VzZXRyYXBbbWV0aG9kXS5hcHBseShkb2N1bWVudE1vdXNldHJhcCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IChtZXRob2QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBNb3VzZXRyYXAuaW5pdCgpO1xuXG4gICAgLy8gZXhwb3NlIG1vdXNldHJhcCB0byB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIHdpbmRvdy5Nb3VzZXRyYXAgPSBNb3VzZXRyYXA7XG5cbiAgICAvLyBleHBvc2UgYXMgYSBjb21tb24ganMgbW9kdWxlXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gTW91c2V0cmFwO1xuICAgIH1cblxuICAgIC8vIGV4cG9zZSBtb3VzZXRyYXAgYXMgYW4gQU1EIG1vZHVsZVxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vdXNldHJhcDtcbiAgICAgICAgfSk7XG4gICAgfVxufSkgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogbnVsbCwgdHlwZW9mICB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiBudWxsKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9tb3VzZXRyYXAvbW91c2V0cmFwLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9