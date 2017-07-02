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
	            this.hightscore = this.teams[0].score;
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = this.teams[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var _team2 = _step6.value;
	
	                    _team2.place = place++;
	                    if (this.hightscore !== 0) _team2.progress = _team2.score / this.hightscore;else _team2.progress = 0;
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
	            if (this.isMe) $('header .team .score').innerHTML = score;
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
	        this.socket.on('score-changed', this.onScoreChanged.bind(this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWUwNWQ4YmJmZDgyYWRkZTc0NTciLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy9EOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly8vRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vRWRpdG9yLmpzIiwid2VicGFjazovLy8uL0xlYWRlcmJvYXJkLmpzIiwid2VicGFjazovLy8uL1RlYW0uanMiLCJ3ZWJwYWNrOi8vLy4vVUkuanMiLCJ3ZWJwYWNrOi8vLy4vVGFicy5qcyIsIndlYnBhY2s6Ly8vLi9Tb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9tb3VzZXRyYXAvbW91c2V0cmFwLmpzIl0sIm5hbWVzIjpbImF4aW9zIiwicmVxdWlyZSIsIkFwcCIsIndpbmRvdyIsIiQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeSIsIiQkIiwicXVlcnlTZWxlY3RvckFsbCIsIkF1dGgiLCJib3giLCJ1c2VybmFtZSIsImxvZ2luQnRuIiwib25sb2FkIiwib25SZWFkeSIsImJpbmQiLCJyZW1lbWJlciIsImxvY2FsU3RvcmFnZSIsInVuZGVmaW5lZCIsInZhbHVlIiwibG9naW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJvbmNsaWNrIiwib25rZXlkb3duIiwiZSIsIndoaWNoIiwidXNpbmdMb2NhbFN0b3JhZ2UiLCJyZW1vdmUiLCJwb3N0IiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsInN0YXR1cyIsInN0YXJ0QXBwIiwiYWxlcnQiLCJtZXNzYWdlIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJsb2NhdGlvbiIsInJlbG9hZCIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJzdG9yZSIsImFwcCIsIkVkaXRvciIsIkxlYWRlcmJvYXJkIiwiVUkiLCJTb2NrZXQiLCJNb3VzZXRyYXAiLCJhdXRoIiwibW9kZSIsImNvbm5lY3Rpb24iLCJlZGl0b3IiLCJsZWFkZXJib2FyZCIsInVpIiwic29ja2V0IiwiaW5pdFNob3J0Y3V0cyIsImxvZ291dCIsImRpc2FibGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiaWQiLCJhY2UiLCJlZGl0Iiwic2Vzc2lvbiIsImdldFNlc3Npb24iLCJzZXRUYWJTaXplIiwic2V0T3B0aW9ucyIsImVuYWJsZUJhc2ljQXV0b2NvbXBsZXRpb24iLCJlbmFibGVMaXZlQXV0b2NvbXBsZXRpb24iLCJzZXRUaGVtZSIsInNldExhbmciLCJvbiIsIm9uQ2hhbmdlIiwidGhlbWUiLCJsYW5nIiwic2V0TW9kZSIsImdldFZhbHVlIiwidmFsIiwic2V0VmFsdWUiLCJUZWFtIiwibGlzdCIsInRlYW1zIiwiaGlnaHRzY29yZSIsIm5hbWUiLCJzY29yZSIsIm5lZWRzVXBkYXRlIiwidGVhbSIsImFwcGVuZENoaWxkIiwiZWxlbWVudCIsInB1c2giLCJ1cGRhdGVUZWFtcyIsImdldFRlYW1CeVVzZXJuYW1lIiwiY2xlYXJBbGwiLCJhZGRUZWFtIiwiaW5pdFByb2ZpbGUiLCJnZXRUaGlzVGVhbSIsInNjb3JlcyIsInBsYWNlIiwiZmlsdGVyIiwiaSIsImluZGV4T2YiLCJzb3J0IiwiQSIsIkIiLCJyYW5rIiwicHJvZ3Jlc3MiLCJfcmFuayIsIl9wbGFjZSIsImlzTWUiLCJfc2NvcmUiLCJkZWZpbmVFbGVtZW50Iiwic2NvcmVFbGVtZW50IiwicHJvZ3Jlc3NFbGVtZW50IiwibGkiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwidG9wIiwib2Zmc2V0SGVpZ2h0IiwicmF0ZSIsIndpZHRoIiwiVGFicyIsInRhYnMiLCJ1c2VybmFtZVR4dCIsInNjb3JlVHh0IiwibXlUZWFtIiwic2Vjb25kcyIsInNlY3MiLCJtaW5zIiwidGFiIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbGVjdCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInRyeVRvUmVtZW1iZXIiLCJwYWdlIiwiaXRlbSIsInN0b3JlTGFzdFRhYlNlbGVjdGVkIiwiYWRkcmVzcyIsImlvIiwiY29ubmVjdCIsIm9uSW5pdGlhbFNldHRpbmdzIiwib25UaW1lU3luYyIsIm9uU2NvcmVDaGFuZ2VkIiwiX2Nvbm5lY3RlZCIsInRlc3RDb25uZWN0aW9uSW50ZXJ2YWwiLCJpc0Nvbm5lY3RlZCIsInRpbWUiLCJpbml0aWFsaXplVGVhbXMiLCJlbWl0IiwiZW50ZXJOaXRyb01vZGUiLCJlbnRlclRpbWVzVXBNb2RlIiwic2V0VGltZXIiLCJjaGVja0Nvbm5lY3Rpb25PblRpbWVyU3luY2VkIiwiY2xlYXJUaW1lb3V0Iiwic2hvdWxkQ29ubmVjdCIsIm9uQ29ubmVjdGlvbkZvdW5kIiwib25Db25uZWN0aW9uTG9zdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsS0FBTUEsUUFBUSxtQkFBQUMsQ0FBUSxDQUFSLENBQWQ7QUFDQSxLQUFNQyxNQUFNLG1CQUFBRCxDQUFRLEVBQVIsQ0FBWjs7QUFFQUUsUUFBT0MsQ0FBUCxHQUFXO0FBQUEsWUFBU0MsU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsQ0FBVDtBQUFBLEVBQVg7QUFDQUosUUFBT0ssRUFBUCxHQUFZO0FBQUEsWUFBU0gsU0FBU0ksZ0JBQVQsQ0FBMEJGLEtBQTFCLENBQVQ7QUFBQSxFQUFaOztLQUVNRyxJO0FBQ0YscUJBQWU7QUFBQTs7QUFDWCxjQUFLQyxHQUFMLEdBQVdQLEVBQUUsWUFBRixDQUFYO0FBQ0EsY0FBS1EsUUFBTCxHQUFnQlIsRUFBRSxzQkFBRixDQUFoQjtBQUNBLGNBQUtTLFFBQUwsR0FBZ0JULEVBQUUsbUJBQUYsQ0FBaEI7QUFDQUQsZ0JBQU9XLE1BQVAsR0FBZ0IsS0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQWhCO0FBQ0EsY0FBS0MsUUFBTDtBQUNIOzs7O29DQUNXO0FBQ1IsaUJBQUlDLGFBQWEsVUFBYixNQUE2QkMsU0FBakMsRUFBNEM7QUFDeEMsc0JBQUtQLFFBQUwsQ0FBY1EsS0FBZCxHQUFzQkYsYUFBYSxVQUFiLENBQXRCO0FBQ0Esc0JBQUtHLEtBQUwsQ0FBVyxJQUFYO0FBQ0g7QUFDSjs7OytCQUNNVCxRLEVBQVU7QUFDYk0sMEJBQWEsVUFBYixJQUEyQk4sUUFBM0I7QUFDSDs7O21DQUNVO0FBQUE7O0FBQ1Asa0JBQUtELEdBQUwsQ0FBU1csU0FBVCxDQUFtQkMsR0FBbkIsQ0FBdUIsU0FBdkI7QUFDQSxrQkFBS1YsUUFBTCxDQUFjVyxPQUFkLEdBQXdCO0FBQUEsd0JBQU0sTUFBS0gsS0FBTCxDQUFXLEtBQVgsQ0FBTjtBQUFBLGNBQXhCO0FBQ0Esa0JBQUtULFFBQUwsQ0FBY2EsU0FBZCxHQUEwQixVQUFDQyxDQUFELEVBQU87QUFBRSxxQkFBSUEsRUFBRUMsS0FBRixLQUFZLEVBQWhCLEVBQW9CLE1BQUtOLEtBQUwsQ0FBVyxLQUFYO0FBQW1CLGNBQTFFO0FBQ0g7OzsrQkFDTU8saUIsRUFBbUI7QUFBQTs7QUFDdEIsa0JBQUtoQixRQUFMLENBQWNVLFNBQWQsQ0FBd0JPLE1BQXhCLENBQStCLE9BQS9CO0FBQ0EsaUJBQUksS0FBS2pCLFFBQUwsQ0FBY1EsS0FBZCxLQUF3QixFQUE1QixFQUFnQyxLQUFLUixRQUFMLENBQWNVLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLE9BQTVCLEVBQWhDLEtBQ0s7QUFDRHZCLHVCQUFNOEIsSUFBTixDQUFXLFFBQVgsRUFBcUI7QUFDakJsQiwrQkFBVSxLQUFLQSxRQUFMLENBQWNRO0FBRFAsa0JBQXJCLEVBR0NXLElBSEQsQ0FHTSxVQUFDQyxRQUFELEVBQWM7QUFDaEIseUJBQUlBLFNBQVNDLElBQVQsQ0FBY0MsTUFBZCxJQUF3QixDQUE1QixFQUErQjtBQUMzQixnQ0FBS0MsUUFBTCxDQUFjLE9BQUt2QixRQUFMLENBQWNRLEtBQTVCLEVBQW1DUSxpQkFBbkM7QUFDSCxzQkFGRCxNQUVPO0FBQ0gsZ0NBQUtoQixRQUFMLENBQWNVLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLE9BQTVCO0FBQ0FhLCtCQUFNSixTQUFTQyxJQUFULENBQWNJLE9BQXBCO0FBQ0g7QUFDSixrQkFWRCxFQVdDQyxLQVhELENBV08sVUFBQ0MsS0FBRCxFQUFXO0FBQ2RDLDZCQUFRQyxHQUFSLENBQVlGLEtBQVo7QUFDSCxrQkFiRDtBQWNIO0FBQ0o7OztrQ0FDUztBQUNOckIsMEJBQWEsVUFBYixJQUEyQixFQUEzQjtBQUNBZixvQkFBT3VDLFFBQVAsQ0FBZ0JDLE1BQWhCO0FBQ0g7OztrQ0FDUy9CLFEsRUFBcUM7QUFBQTs7QUFBQSxpQkFBM0JnQixpQkFBMkIsdUVBQVAsS0FBTzs7QUFDM0Msa0JBQUtqQixHQUFMLENBQVNXLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLFFBQXZCO0FBQ0EsaUJBQUlLLGlCQUFKLEVBQXVCO0FBQ25CLHNCQUFLakIsR0FBTCxDQUFTaUMsS0FBVCxDQUFlQyxPQUFmLEdBQXlCLE1BQXpCO0FBQ0gsY0FGRCxNQUVPO0FBQ0hDLDRCQUFXO0FBQUEsNEJBQU0sT0FBS25DLEdBQUwsQ0FBU2lDLEtBQVQsQ0FBZUMsT0FBZixHQUF5QixNQUEvQjtBQUFBLGtCQUFYLEVBQWtELElBQWxEO0FBQ0Esc0JBQUtFLEtBQUwsQ0FBV25DLFFBQVg7QUFDSDtBQUNELGtCQUFLb0MsR0FBTCxHQUFXLElBQUk5QyxHQUFKLENBQVEsSUFBUixFQUFjVSxRQUFkLENBQVg7QUFDSDs7Ozs7O0FBRUwsS0FBSUYsSUFBSixHOzs7Ozs7QUMvREEseUM7Ozs7OztBQ0FBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7OztBQ25EQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxhQUFhO0FBQ3hCLFlBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFNBQVMsR0FBRyxTQUFTO0FBQzVDLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHdDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlTQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQSxrREFBaUQsZ0JBQWdCO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRDtBQUNoRDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxpREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQzs7QUFFRDs7Ozs7OztBQ3JGQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSx3REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTyxZQUFZO0FBQ25CO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7Ozs7Ozs7QUMzRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVTs7Ozs7OztBQ3ZMdEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOzs7Ozs7O0FDWEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7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QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsU0FBUztBQUM1QixvQkFBbUIsTUFBTTtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsT0FBTztBQUMxQixvQkFBbUIsTUFBTTtBQUN6QixvQkFBbUIsTUFBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF1QixzQkFBc0I7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsT0FBTztBQUMxQixvQkFBbUIsTUFBTTtBQUN6QixvQkFBbUIsU0FBUztBQUM1QixvQkFBbUIsUUFBUTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLE9BQU87QUFDOUIsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsTUFBTTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixPQUFPO0FBQzFCLG9CQUFtQixTQUFTO0FBQzVCLG9CQUFtQixRQUFRO0FBQzNCLG9CQUFtQixRQUFRO0FBQzNCLG9CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW1ELGtCQUFrQjs7QUFFckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLE1BQU07QUFDekIsb0JBQW1CLFNBQVM7QUFDNUIsb0JBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSw0QkFBMkIseUJBQXlCO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGFBQWE7QUFDNUIsZ0JBQWUsU0FBUztBQUN4QixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxhQUFhO0FBQzVCLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBdUQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQ7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE1BQU07QUFDckIsZ0JBQWUsUUFBUTtBQUN2QixpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsRUFBQyIsImZpbGUiOiIuL2Rpc3QvbWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZTA1ZDhiYmZkODJhZGRlNzQ1NyIsImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKVxuY29uc3QgQXBwID0gcmVxdWlyZSgnLi9BcHAnKVxuXG53aW5kb3cuJCA9IHF1ZXJ5ID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpXG53aW5kb3cuJCQgPSBxdWVyeSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KVxuXG5jbGFzcyBBdXRoIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuYm94ID0gJCgnLmZsb2F0LWJveCcpXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSAkKCcuZmxvYXQtYm94IC51c2VybmFtZScpXG4gICAgICAgIHRoaXMubG9naW5CdG4gPSAkKCcuZmxvYXQtYm94IGJ1dHRvbicpXG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSB0aGlzLm9uUmVhZHkuYmluZCh0aGlzKVxuICAgICAgICB0aGlzLnJlbWVtYmVyKClcbiAgICB9XG4gICAgcmVtZW1iZXIgKCkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlWyd1c2VybmFtZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXNlcm5hbWUudmFsdWUgPSBsb2NhbFN0b3JhZ2VbJ3VzZXJuYW1lJ11cbiAgICAgICAgICAgIHRoaXMubG9naW4odHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9yZSAodXNlcm5hbWUpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlWyd1c2VybmFtZSddID0gdXNlcm5hbWVcbiAgICB9XG4gICAgb25SZWFkeSAoKSB7XG4gICAgICAgIHRoaXMuYm94LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUnKVxuICAgICAgICB0aGlzLmxvZ2luQnRuLm9uY2xpY2sgPSAoKSA9PiB0aGlzLmxvZ2luKGZhbHNlKVxuICAgICAgICB0aGlzLnVzZXJuYW1lLm9ua2V5ZG93biA9IChlKSA9PiB7IGlmIChlLndoaWNoID09PSAxMykgdGhpcy5sb2dpbihmYWxzZSkgfVxuICAgIH1cbiAgICBsb2dpbiAodXNpbmdMb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy51c2VybmFtZS5jbGFzc0xpc3QucmVtb3ZlKCd3cm9uZycpXG4gICAgICAgIGlmICh0aGlzLnVzZXJuYW1lLnZhbHVlID09PSAnJykgdGhpcy51c2VybmFtZS5jbGFzc0xpc3QuYWRkKCd3cm9uZycpXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXhpb3MucG9zdCgnL2xvZ2luJywge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJuYW1lLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEFwcCh0aGlzLnVzZXJuYW1lLnZhbHVlLCB1c2luZ0xvY2FsU3RvcmFnZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJuYW1lLmNsYXNzTGlzdC5hZGQoJ3dyb25nJylcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzcG9uc2UuZGF0YS5tZXNzYWdlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9nb3V0ICgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlWyd1c2VybmFtZSddID0gJydcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgfVxuICAgIHN0YXJ0QXBwICh1c2VybmFtZSwgdXNpbmdMb2NhbFN0b3JhZ2UgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmJveC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICBpZiAodXNpbmdMb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuYm94LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnLCAxMDAwKVxuICAgICAgICAgICAgdGhpcy5zdG9yZSh1c2VybmFtZSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcCA9IG5ldyBBcHAodGhpcywgdXNlcm5hbWUpXG4gICAgfVxufVxubmV3IEF1dGhcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9tYWluLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgJiYgIWlzQXJyYXkob2JqKSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywgdGhpcy5kZWZhdWx0cywgeyBtZXRob2Q6ICdnZXQnIH0sIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvQXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2RlZmF1bHRzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIEQ6L3dhbXAvd3d3L0hhY2thUGFuZWwvfi9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBEOi93YW1wL3d3dy9IYWNrYVBhbmVsL34vYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBFZGl0b3IgPSByZXF1aXJlKFwiLi9FZGl0b3JcIilcclxuY29uc3QgTGVhZGVyYm9hcmQgPSByZXF1aXJlKFwiLi9MZWFkZXJib2FyZFwiKVxyXG5jb25zdCBVSSA9IHJlcXVpcmUoXCIuL1VJXCIpXHJcbmNvbnN0IFNvY2tldCA9IHJlcXVpcmUoXCIuL1NvY2tldFwiKVxyXG5jb25zdCBNb3VzZXRyYXAgPSByZXF1aXJlKCdtb3VzZXRyYXAnKVxyXG5cclxuY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yIChhdXRoLCB1c2VybmFtZSkge1xyXG4gICAgICAgIHRoaXMuYXV0aCA9IGF1dGhcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWVcclxuICAgICAgICB0aGlzLm1vZGUgPSAnY29kaW5nJ1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IHt9XHJcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgRWRpdG9yKFwiZWRpdG9yXCIpXHJcbiAgICAgICAgdGhpcy5sZWFkZXJib2FyZCA9IG5ldyBMZWFkZXJib2FyZCh0aGlzLCBcIi5yYW5rc1wiKVxyXG4gICAgICAgIHRoaXMudWkgPSBuZXcgVUkodGhpcylcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgJy8nKVxyXG4gICAgICAgIHRoaXMuaW5pdFNob3J0Y3V0cygpXHJcbiAgICB9XHJcbiAgICBpbml0U2hvcnRjdXRzICgpIHtcclxuICAgICAgICBNb3VzZXRyYXAuYmluZChcImFsdCBhbHQgYWx0IGFsdCBhbHQgYWx0XCIsICgpID0+IHsgdGhpcy5hdXRoLmxvZ291dCgpIH0pXHJcbiAgICB9XHJcbiAgICBlbnRlck5pdHJvTW9kZSAoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gJ25pdHJvJ1xyXG4gICAgICAgIHRoaXMubGVhZGVyYm9hcmQuZGlzYWJsZSgpXHJcbiAgICB9XHJcbiAgICBlbnRlclRpbWVzVXBNb2RlICgpIHtcclxuICAgICAgICB0aGlzLm1vZGUgPSAndGltZXN1cCdcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcHBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9BcHAuanMiLCJjbGFzcyBFZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IgKGlkKSB7XHJcbiAgICAgICAgYWNlLnJlcXVpcmUoXCJhY2UvZXh0L2xhbmd1YWdlX3Rvb2xzXCIpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yID0gYWNlLmVkaXQoaWQpO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKVxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXRUYWJTaXplKDQpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldE9wdGlvbnMoe1xyXG4gICAgICAgICAgICBlbmFibGVCYXNpY0F1dG9jb21wbGV0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBlbmFibGVMaXZlQXV0b2NvbXBsZXRpb246IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldFRoZW1lKFwiY2xvdWRzXCIpXHJcbiAgICAgICAgdGhpcy5zZXRMYW5nKFwiamF2YXNjcmlwdFwiKVxyXG4gICAgICAgIHRoaXMucmVtZW1iZXIoKVxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5vbihcImNoYW5nZVwiLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpXHJcbiAgICB9XHJcbiAgICByZW1lbWJlciAoKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2NvZGUnXSAhPT0gdW5kZWZpbmVkKSB0aGlzLnZhbHVlID0gd2luZG93LmxvY2FsU3RvcmFnZVsnY29kZSddXHJcbiAgICB9XHJcbiAgICBzZXRUaGVtZSAodGhlbWUpIHtcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShcImFjZS90aGVtZS9cIiArIHRoZW1lKTtcclxuICAgIH1cclxuICAgIHNldExhbmcgKGxhbmcpIHtcclxuICAgICAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShcImFjZS9tb2RlL1wiICsgbGFuZyk7XHJcbiAgICB9XHJcbiAgICBnZXQgdmFsdWUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uZ2V0VmFsdWUoKVxyXG4gICAgfVxyXG4gICAgc2V0IHZhbHVlICh2YWwpIHtcclxuICAgICAgICB0aGlzLnNlc3Npb24uc2V0VmFsdWUodmFsKVxyXG4gICAgfVxyXG4gICAgb25DaGFuZ2UgKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2NvZGUnXSA9IHRoaXMudmFsdWVcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9FZGl0b3IuanMiLCJjb25zdCBUZWFtID0gcmVxdWlyZShcIi4vVGVhbVwiKVxyXG5cclxuY2xhc3MgTGVhZGVyYm9hcmQge1xyXG4gICAgY29uc3RydWN0b3IgKGFwcCwgcXVlcnkpIHtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcFxyXG4gICAgICAgIHRoaXMubGlzdCA9ICQocXVlcnkpXHJcbiAgICAgICAgdGhpcy50ZWFtcyA9IFtdXHJcbiAgICAgICAgdGhpcy5oaWdodHNjb3JlID0gMFxyXG4gICAgfVxyXG4gICAgYWRkVGVhbSAoaWQsIHVzZXJuYW1lLCBuYW1lLCBzY29yZSwgbmVlZHNVcGRhdGUgPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgdGVhbSA9IG5ldyBUZWFtKHRoaXMsIGlkLCB1c2VybmFtZSwgbmFtZSwgc2NvcmUpXHJcbiAgICAgICAgdGhpcy5saXN0LmFwcGVuZENoaWxkKHRlYW0uZWxlbWVudClcclxuICAgICAgICB0aGlzLnRlYW1zLnB1c2godGVhbSlcclxuICAgICAgICBpZiAobmVlZHNVcGRhdGUpIHRoaXMudXBkYXRlVGVhbXMoKVxyXG4gICAgICAgIHJldHVybiB0ZWFtLmVsZW1lbnRcclxuICAgIH1cclxuICAgIGNsZWFyQWxsICgpIHtcclxuICAgICAgICBmb3IgKGxldCB0ZWFtIG9mIHRoaXMudGVhbXMpIHtcclxuICAgICAgICAgICAgdGVhbS5lbGVtZW50LnJlbW92ZSgpXHJcbiAgICAgICAgICAgIHRlYW0gPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGVhbXMgPSBbXVxyXG4gICAgfVxyXG4gICAgZ2V0VGVhbUJ5SWQgKGlkKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKSBpZiAodGVhbS5pZCA9PSBpZCkgcmV0dXJuIHRlYW1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIGdldFRlYW1CeVVzZXJuYW1lICh1c2VybmFtZSkge1xyXG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcykgaWYgKHRlYW0udXNlcm5hbWUgPT0gdXNlcm5hbWUpIHJldHVybiB0ZWFtXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9IFxyXG4gICAgZ2V0VGhpc1RlYW0gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRlYW1CeVVzZXJuYW1lKHRoaXMuYXBwLnVzZXJuYW1lKVxyXG4gICAgfVxyXG4gICAgaW5pdGlhbGl6ZVRlYW1zICh0ZWFtcykge1xyXG4gICAgICAgIHRoaXMuY2xlYXJBbGwoKVxyXG4gICAgICAgIGZvciAobGV0IHVzZXJuYW1lIGluIHRlYW1zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSB0ZWFtc1t1c2VybmFtZV1cclxuICAgICAgICAgICAgaWYgKHVzZXJuYW1lID09PSB0aGlzLmFwcC51c2VybmFtZSkgdGVhbS5pZCA9IHRoaXMuYXBwLmNvbm5lY3Rpb24uaWRcclxuICAgICAgICAgICAgdGhpcy5hZGRUZWFtKHRlYW0uaWQsIHVzZXJuYW1lLCB0ZWFtLm5hbWUsIHRlYW0uc2NvcmUsIGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFwcC51aS5pbml0UHJvZmlsZSh0aGlzLmdldFRoaXNUZWFtKCkpXHJcbiAgICAgICAgdGhpcy51cGRhdGVUZWFtcygpXHJcbiAgICB9XHJcbiAgICB1cGRhdGVUZWFtcyAoKSB7XHJcbiAgICAgICAgbGV0IHNjb3JlcyA9IFtdLCBwbGFjZSA9IDBcclxuICAgICAgICBmb3IgKGxldCB0ZWFtIG9mIHRoaXMudGVhbXMpIHNjb3Jlcy5wdXNoKHRlYW0uc2NvcmUpXHJcbiAgICAgICAgc2NvcmVzID0gc2NvcmVzLmZpbHRlcigoc2NvcmUsIGkpID0+IHNjb3Jlcy5pbmRleE9mKHNjb3JlKSA9PSBpKS5zb3J0KChBLCBCKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKEEgPCBCKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgaWYoQSA+IEIpIHJldHVybiAtMTtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBmb3IgKGxldCB0ZWFtIG9mIHRoaXMudGVhbXMpIHRlYW0ucmFuayA9IHNjb3Jlcy5pbmRleE9mKHRlYW0uc2NvcmUpICsgMVxyXG4gICAgICAgIHRoaXMudGVhbXMuc29ydCgoQSwgQikgPT4ge1xyXG4gICAgICAgICAgICBpZihBLnJhbmsgPCBCLnJhbmspIHJldHVybiAtMTtcclxuICAgICAgICAgICAgaWYoQS5yYW5rID4gQi5yYW5rKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmhpZ2h0c2NvcmUgPSB0aGlzLnRlYW1zWzBdLnNjb3JlXHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiB0aGlzLnRlYW1zKSB7XHJcbiAgICAgICAgICAgIHRlYW0ucGxhY2UgPSBwbGFjZSsrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhpZ2h0c2NvcmUgIT09IDApIHRlYW0ucHJvZ3Jlc3MgPSB0ZWFtLnNjb3JlIC8gdGhpcy5oaWdodHNjb3JlXHJcbiAgICAgICAgICAgIGVsc2UgdGVhbS5wcm9ncmVzcyA9IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkaXNhYmxlICgpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGVhZGVyYm9hcmRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9MZWFkZXJib2FyZC5qcyIsImNsYXNzIFRlYW0ge1xyXG4gICAgY29uc3RydWN0b3IgKGxlYWRlcmJvYXJkLCBpZCwgdXNlcm5hbWUsIG5hbWUsIHNjb3JlKSB7XHJcbiAgICAgICAgdGhpcy5sZWFkZXJib2FyZCA9IGxlYWRlcmJvYXJkXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkXHJcbiAgICAgICAgdGhpcy5fcmFuayA9IDFcclxuICAgICAgICB0aGlzLl9wbGFjZSA9IDBcclxuICAgICAgICB0aGlzLmlzTWUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWVcclxuICAgICAgICB0aGlzLl9zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5kZWZpbmVFbGVtZW50KClcclxuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0VsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKVxyXG4gICAgfVxyXG4gICAgZGVmaW5lRWxlbWVudCAoKSB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJuYW1lXCI+JHt0aGlzLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNjb3JlXCI+JHt0aGlzLnNjb3JlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiZWhpbmQtcHJvZ3Jlc3NcIj48L2Rpdj5gXHJcbiAgICAgICAgaWYgKHRoaXMudXNlcm5hbWUgPT09IHRoaXMubGVhZGVyYm9hcmQuYXBwLnVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ21lJylcclxuICAgICAgICAgICAgdGhpcy5pc01lID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGk7XHJcbiAgICB9XHJcbiAgICBnZXQgc2NvcmUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZVxyXG4gICAgfVxyXG4gICAgc2V0IHNjb3JlIChzY29yZSkge1xyXG4gICAgICAgIHRoaXMuX3Njb3JlID0gc2NvcmVcclxuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudC5pbm5lckhUTUwgPSBzY29yZVxyXG4gICAgICAgIGlmICh0aGlzLmlzTWUpICQoJ2hlYWRlciAudGVhbSAuc2NvcmUnKS5pbm5lckhUTUwgPSBzY29yZVxyXG4gICAgICAgIHRoaXMubGVhZGVyYm9hcmQudXBkYXRlVGVhbXMoKVxyXG4gICAgfVxyXG4gICAgZ2V0IHBsYWNlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGxhY2VcclxuICAgIH1cclxuICAgIHNldCBwbGFjZSAocGxhY2UpIHtcclxuICAgICAgICB0aGlzLl9wbGFjZSA9IHBsYWNlXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9ICh0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgNSkgKiB0aGlzLnBsYWNlICsgXCJweFwiXHJcbiAgICB9XHJcbiAgICBnZXQgcmFuayAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmtcclxuICAgIH1cclxuICAgIHNldCByYW5rIChyYW5rKSB7XHJcbiAgICAgICAgdGhpcy5fcmFuayA9IHJhbmtcclxuICAgICAgICAvLyB0aGlzLnJhbmtFbGVtZW50LmlubmVySFRNTCA9IHJhbmtcclxuICAgIH1cclxuICAgIHNldCBwcm9ncmVzcyAocmF0ZSkge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NFbGVtZW50LnN0eWxlLndpZHRoID0gKHJhdGUgKiAxMDApICsgXCIlXCJcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUZWFtXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGVhbS5qcyIsImNvbnN0IFRhYnMgPSByZXF1aXJlKFwiLi9UYWJzXCIpXHJcblxyXG5jbGFzcyBVSSB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcclxuICAgICAgICB0aGlzLnRhYnMgPSBuZXcgVGFic1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWVUeHQgPSAkKCdoZWFkZXIgLnRlYW0gLm5hbWUnKVxyXG4gICAgICAgIHRoaXMuc2NvcmVUeHQgPSAkKCdoZWFkZXIgLnRlYW0gLnNjb3JlJylcclxuICAgIH1cclxuICAgIGluaXRQcm9maWxlIChteVRlYW0pIHtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lVHh0LmlubmVySFRNTCA9IG15VGVhbS5uYW1lXHJcbiAgICAgICAgdGhpcy5zY29yZVR4dC5pbm5lckhUTUwgPSBteVRlYW0uc2NvcmVcclxuICAgIH1cclxuICAgIHNldFRpbWVyIChzZWNvbmRzKSB7XHJcbiAgICAgICAgbGV0IHNlY3MgPSBzZWNvbmRzICUgNjBcclxuICAgICAgICBsZXQgbWlucyA9IChzZWNvbmRzIC0gc2VjcykgLyA2MFxyXG4gICAgICAgIGlmIChzZWNzIDwgMTApIHNlY3MgPSBcIjBcIiArIHNlY3NcclxuICAgICAgICAkKFwiaGVhZGVyID4gdGltZVwiKS5pbm5lckhUTUwgPSBzZWNvbmRzID4gMCA/IChtaW5zICsgXCI6XCIgKyBzZWNzKSA6IFwiVGltZSdzIHVwIVwiXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVUlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9VSS5qcyIsImNsYXNzIFRhYnMge1xyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIGNvbnN0IHRhYnMgPSAkJChcImJvZHkgPiBtYWluID4gc2VjdGlvbiA+IG5hdiA+IGxpXCIpXHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIHRhYnMpIHtcclxuICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHRoaXMuc2VsZWN0KGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtcGFnZVwiKSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJ5VG9SZW1lbWJlcigpXHJcbiAgICB9XHJcbiAgICB0cnlUb1JlbWVtYmVyICgpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlWyd0YWItc2VsZWN0ZWQnXSAhPT0gdW5kZWZpbmVkKSB0aGlzLnNlbGVjdChsb2NhbFN0b3JhZ2VbJ3RhYi1zZWxlY3RlZCddKVxyXG4gICAgICAgIGVsc2UgdGhpcy5zZWxlY3QoXCJjaGFsbGVuZ2VcIilcclxuICAgIH1cclxuICAgIHN0b3JlTGFzdFRhYlNlbGVjdGVkICh3aGljaCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZVsndGFiLXNlbGVjdGVkJ10gPSB3aGljaFxyXG4gICAgfVxyXG4gICAgc2VsZWN0ICh3aGljaCkge1xyXG4gICAgICAgIC8vIHNob3cgdGhlIHNlbGVjdGVkIHRhYiBhbmQgaGlkZSB0aGUgb3RoZXJzXHJcbiAgICAgICAgZm9yIChsZXQgcGFnZSBvZiAkJChcIi50YWItcGFnZVwiKSkgcGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAkKFwiLnRhYi1wYWdlI1wiICsgd2hpY2gpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIlxyXG4gICAgICAgIC8vIGRlYWN0aXZlIGFsbCBpdGVtcyBidXQgdGhlIHNlbGVjdGVkIGl0ZW0sIGFuZCBtYWtlIGl0IGFjdGl2ZVxyXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiAkJChgYm9keSA+IG1haW4gPiBzZWN0aW9uID4gbmF2ID4gbGlgKSkgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgJChgYm9keSA+IG1haW4gPiBzZWN0aW9uID4gbmF2ID4gbGk6bm90KC5zdWJtaXQpW2RhdGEtcGFnZT1cIiR7d2hpY2h9XCJdYCkuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgICAgIC8vIFN0b3JlXHJcbiAgICAgICAgdGhpcy5zdG9yZUxhc3RUYWJTZWxlY3RlZCh3aGljaClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYWJzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGFicy5qcyIsImNsYXNzIFNvY2tldCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwLCBhZGRyZXNzKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoYWRkcmVzcylcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignaW5pdGlhbC1zZXR0aW5ncycsIHRoaXMub25Jbml0aWFsU2V0dGluZ3MuYmluZCh0aGlzKSlcclxuICAgICAgICB0aGlzLnNvY2tldC5vbigndGltZS1zeW5jJywgdGhpcy5vblRpbWVTeW5jLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ3Njb3JlLWNoYW5nZWQnLCB0aGlzLm9uU2NvcmVDaGFuZ2VkLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMudGVzdENvbm5lY3Rpb25JbnRlcnZhbCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlLCA1MDAwKVxyXG4gICAgfVxyXG4gICAgb25Jbml0aWFsU2V0dGluZ3MgKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmFwcC5jb25uZWN0aW9uLmlkID0gZGF0YS5pZFxyXG4gICAgICAgIHRoaXMub25UaW1lU3luYyhkYXRhLnRpbWUpXHJcbiAgICAgICAgdGhpcy5hcHAubGVhZGVyYm9hcmQuaW5pdGlhbGl6ZVRlYW1zKGRhdGEudGVhbXMpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgndXNlci1jb25uZWN0Jywge1xyXG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5hcHAudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmFwcC5jb25uZWN0aW9uLmlkXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIG9uVGltZVN5bmMgKHNlY29uZHMpIHtcclxuICAgICAgICBpZiAoc2Vjb25kcyA8ICgxMCAqIDYwKSAmJiB0aGlzLmFwcC5tb2RlID09PSAnY29kaW5nJykgdGhpcy5hcHAuZW50ZXJOaXRyb01vZGUoKVxyXG4gICAgICAgIGlmIChzZWNvbmRzIDw9IDAgJiYgKHRoaXMuYXBwLm1vZGUgPT09ICduaXRybycgfHwgdGhpcy5hcHAubW9kZSA9PT0gJ2NvZGluZycpKSB0aGlzLmFwcC5lbnRlclRpbWVzVXBNb2RlKClcclxuICAgICAgICB0aGlzLmFwcC51aS5zZXRUaW1lcihzZWNvbmRzKVxyXG4gICAgICAgIHRoaXMuY2hlY2tDb25uZWN0aW9uT25UaW1lclN5bmNlZCgpXHJcbiAgICB9XHJcbiAgICBjaGVja0Nvbm5lY3Rpb25PblRpbWVyU3luY2VkICgpIHtcclxuICAgICAgICB0aGlzLmlzQ29ubmVjdGVkID0gdHJ1ZVxyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRlc3RDb25uZWN0aW9uSW50ZXJ2YWwpXHJcbiAgICAgICAgdGhpcy50ZXN0Q29ubmVjdGlvbkludGVydmFsID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2UsIDUwMDApXHJcbiAgICB9XHJcbiAgICBnZXQgaXNDb25uZWN0ZWQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWRcclxuICAgIH1cclxuICAgIHNldCBpc0Nvbm5lY3RlZCAoc2hvdWxkQ29ubmVjdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY29ubmVjdGVkICYmIHNob3VsZENvbm5lY3QpIHRoaXMub25Db25uZWN0aW9uRm91bmQoKVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2Nvbm5lY3RlZCAmJiAhc2hvdWxkQ29ubmVjdCkgdGhpcy5vbkNvbm5lY3Rpb25Mb3N0KClcclxuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBzaG91bGRDb25uZWN0XHJcbiAgICB9XHJcbiAgICBvbkNvbm5lY3Rpb25Gb3VuZCAoKSB7XHJcbiAgICAgICAgJCgnZm9vdGVyIC5jb25uZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnZmFpbCcpXHJcbiAgICB9XHJcbiAgICBvbkNvbm5lY3Rpb25Mb3N0ICgpIHtcclxuICAgICAgICAkKCdmb290ZXIgLmNvbm5lY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdmYWlsJylcclxuICAgIH1cclxuICAgIG9uU2NvcmVDaGFuZ2VkIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5hcHAubGVhZGVyYm9hcmQuZ2V0VGVhbUJ5VXNlcm5hbWUoZGF0YS51c2VybmFtZSkuc2NvcmUgPSBkYXRhLnNjb3JlXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29ja2V0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vU29ja2V0LmpzIiwiLypnbG9iYWwgZGVmaW5lOmZhbHNlICovXG4vKipcbiAqIENvcHlyaWdodCAyMDEyLTIwMTcgQ3JhaWcgQ2FtcGJlbGxcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBNb3VzZXRyYXAgaXMgYSBzaW1wbGUga2V5Ym9hcmQgc2hvcnRjdXQgbGlicmFyeSBmb3IgSmF2YXNjcmlwdCB3aXRoXG4gKiBubyBleHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqXG4gKiBAdmVyc2lvbiAxLjYuMVxuICogQHVybCBjcmFpZy5pcy9raWxsaW5nL21pY2VcbiAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG4gICAgLy8gQ2hlY2sgaWYgbW91c2V0cmFwIGlzIHVzZWQgaW5zaWRlIGJyb3dzZXIsIGlmIG5vdCwgcmV0dXJuXG4gICAgaWYgKCF3aW5kb3cpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG1hcHBpbmcgb2Ygc3BlY2lhbCBrZXljb2RlcyB0byB0aGVpciBjb3JyZXNwb25kaW5nIGtleXNcbiAgICAgKlxuICAgICAqIGV2ZXJ5dGhpbmcgaW4gdGhpcyBkaWN0aW9uYXJ5IGNhbm5vdCB1c2Uga2V5cHJlc3MgZXZlbnRzXG4gICAgICogc28gaXQgaGFzIHRvIGJlIGhlcmUgdG8gbWFwIHRvIHRoZSBjb3JyZWN0IGtleWNvZGVzIGZvclxuICAgICAqIGtleXVwL2tleWRvd24gZXZlbnRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHZhciBfTUFQID0ge1xuICAgICAgICA4OiAnYmFja3NwYWNlJyxcbiAgICAgICAgOTogJ3RhYicsXG4gICAgICAgIDEzOiAnZW50ZXInLFxuICAgICAgICAxNjogJ3NoaWZ0JyxcbiAgICAgICAgMTc6ICdjdHJsJyxcbiAgICAgICAgMTg6ICdhbHQnLFxuICAgICAgICAyMDogJ2NhcHNsb2NrJyxcbiAgICAgICAgMjc6ICdlc2MnLFxuICAgICAgICAzMjogJ3NwYWNlJyxcbiAgICAgICAgMzM6ICdwYWdldXAnLFxuICAgICAgICAzNDogJ3BhZ2Vkb3duJyxcbiAgICAgICAgMzU6ICdlbmQnLFxuICAgICAgICAzNjogJ2hvbWUnLFxuICAgICAgICAzNzogJ2xlZnQnLFxuICAgICAgICAzODogJ3VwJyxcbiAgICAgICAgMzk6ICdyaWdodCcsXG4gICAgICAgIDQwOiAnZG93bicsXG4gICAgICAgIDQ1OiAnaW5zJyxcbiAgICAgICAgNDY6ICdkZWwnLFxuICAgICAgICA5MTogJ21ldGEnLFxuICAgICAgICA5MzogJ21ldGEnLFxuICAgICAgICAyMjQ6ICdtZXRhJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBtYXBwaW5nIGZvciBzcGVjaWFsIGNoYXJhY3RlcnMgc28gdGhleSBjYW4gc3VwcG9ydFxuICAgICAqXG4gICAgICogdGhpcyBkaWN0aW9uYXJ5IGlzIG9ubHkgdXNlZCBpbmNhc2UgeW91IHdhbnQgdG8gYmluZCBhXG4gICAgICoga2V5dXAgb3Iga2V5ZG93biBldmVudCB0byBvbmUgb2YgdGhlc2Uga2V5c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX0tFWUNPREVfTUFQID0ge1xuICAgICAgICAxMDY6ICcqJyxcbiAgICAgICAgMTA3OiAnKycsXG4gICAgICAgIDEwOTogJy0nLFxuICAgICAgICAxMTA6ICcuJyxcbiAgICAgICAgMTExIDogJy8nLFxuICAgICAgICAxODY6ICc7JyxcbiAgICAgICAgMTg3OiAnPScsXG4gICAgICAgIDE4ODogJywnLFxuICAgICAgICAxODk6ICctJyxcbiAgICAgICAgMTkwOiAnLicsXG4gICAgICAgIDE5MTogJy8nLFxuICAgICAgICAxOTI6ICdgJyxcbiAgICAgICAgMjE5OiAnWycsXG4gICAgICAgIDIyMDogJ1xcXFwnLFxuICAgICAgICAyMjE6ICddJyxcbiAgICAgICAgMjIyOiAnXFwnJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0aGlzIGlzIGEgbWFwcGluZyBvZiBrZXlzIHRoYXQgcmVxdWlyZSBzaGlmdCBvbiBhIFVTIGtleXBhZFxuICAgICAqIGJhY2sgdG8gdGhlIG5vbiBzaGlmdCBlcXVpdmVsZW50c1xuICAgICAqXG4gICAgICogdGhpcyBpcyBzbyB5b3UgY2FuIHVzZSBrZXl1cCBldmVudHMgd2l0aCB0aGVzZSBrZXlzXG4gICAgICpcbiAgICAgKiBub3RlIHRoYXQgdGhpcyB3aWxsIG9ubHkgd29yayByZWxpYWJseSBvbiBVUyBrZXlib2FyZHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdmFyIF9TSElGVF9NQVAgPSB7XG4gICAgICAgICd+JzogJ2AnLFxuICAgICAgICAnISc6ICcxJyxcbiAgICAgICAgJ0AnOiAnMicsXG4gICAgICAgICcjJzogJzMnLFxuICAgICAgICAnJCc6ICc0JyxcbiAgICAgICAgJyUnOiAnNScsXG4gICAgICAgICdeJzogJzYnLFxuICAgICAgICAnJic6ICc3JyxcbiAgICAgICAgJyonOiAnOCcsXG4gICAgICAgICcoJzogJzknLFxuICAgICAgICAnKSc6ICcwJyxcbiAgICAgICAgJ18nOiAnLScsXG4gICAgICAgICcrJzogJz0nLFxuICAgICAgICAnOic6ICc7JyxcbiAgICAgICAgJ1xcXCInOiAnXFwnJyxcbiAgICAgICAgJzwnOiAnLCcsXG4gICAgICAgICc+JzogJy4nLFxuICAgICAgICAnPyc6ICcvJyxcbiAgICAgICAgJ3wnOiAnXFxcXCdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdGhpcyBpcyBhIGxpc3Qgb2Ygc3BlY2lhbCBzdHJpbmdzIHlvdSBjYW4gdXNlIHRvIG1hcFxuICAgICAqIHRvIG1vZGlmaWVyIGtleXMgd2hlbiB5b3Ugc3BlY2lmeSB5b3VyIGtleWJvYXJkIHNob3J0Y3V0c1xuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB2YXIgX1NQRUNJQUxfQUxJQVNFUyA9IHtcbiAgICAgICAgJ29wdGlvbic6ICdhbHQnLFxuICAgICAgICAnY29tbWFuZCc6ICdtZXRhJyxcbiAgICAgICAgJ3JldHVybic6ICdlbnRlcicsXG4gICAgICAgICdlc2NhcGUnOiAnZXNjJyxcbiAgICAgICAgJ3BsdXMnOiAnKycsXG4gICAgICAgICdtb2QnOiAvTWFjfGlQb2R8aVBob25lfGlQYWQvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSA/ICdtZXRhJyA6ICdjdHJsJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB2YXJpYWJsZSB0byBzdG9yZSB0aGUgZmxpcHBlZCB2ZXJzaW9uIG9mIF9NQVAgZnJvbSBhYm92ZVxuICAgICAqIG5lZWRlZCB0byBjaGVjayBpZiB3ZSBzaG91bGQgdXNlIGtleXByZXNzIG9yIG5vdCB3aGVuIG5vIGFjdGlvblxuICAgICAqIGlzIHNwZWNpZmllZFxuICAgICAqXG4gICAgICogQHR5cGUge09iamVjdHx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdmFyIF9SRVZFUlNFX01BUDtcblxuICAgIC8qKlxuICAgICAqIGxvb3AgdGhyb3VnaCB0aGUgZiBrZXlzLCBmMSB0byBmMTkgYW5kIGFkZCB0aGVtIHRvIHRoZSBtYXBcbiAgICAgKiBwcm9ncmFtYXRpY2FsbHlcbiAgICAgKi9cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDIwOyArK2kpIHtcbiAgICAgICAgX01BUFsxMTEgKyBpXSA9ICdmJyArIGk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9vcCB0aHJvdWdoIHRvIG1hcCBudW1iZXJzIG9uIHRoZSBudW1lcmljIGtleXBhZFxuICAgICAqL1xuICAgIGZvciAoaSA9IDA7IGkgPD0gOTsgKytpKSB7XG5cbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byB1c2UgYSBzdHJpbmcgY2F1c2Ugb3RoZXJ3aXNlIHNpbmNlIDAgaXMgZmFsc2V5XG4gICAgICAgIC8vIG1vdXNldHJhcCB3aWxsIG5ldmVyIGZpcmUgZm9yIG51bXBhZCAwIHByZXNzZWQgYXMgcGFydCBvZiBhIGtleWRvd25cbiAgICAgICAgLy8gZXZlbnQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2NjYW1wYmVsbC9tb3VzZXRyYXAvcHVsbC8yNThcbiAgICAgICAgX01BUFtpICsgOTZdID0gaS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNyb3NzIGJyb3dzZXIgYWRkIGV2ZW50IG1ldGhvZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fEhUTUxEb2N1bWVudH0gb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfYWRkRXZlbnQob2JqZWN0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAob2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9iamVjdC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvYmplY3QuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0YWtlcyB0aGUgZXZlbnQgYW5kIHJldHVybnMgdGhlIGtleSBjaGFyYWN0ZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2NoYXJhY3RlckZyb21FdmVudChlKSB7XG5cbiAgICAgICAgLy8gZm9yIGtleXByZXNzIGV2ZW50cyB3ZSBzaG91bGQgcmV0dXJuIHRoZSBjaGFyYWN0ZXIgYXMgaXNcbiAgICAgICAgaWYgKGUudHlwZSA9PSAna2V5cHJlc3MnKSB7XG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIHNoaWZ0IGtleSBpcyBub3QgcHJlc3NlZCB0aGVuIGl0IGlzIHNhZmUgdG8gYXNzdW1lXG4gICAgICAgICAgICAvLyB0aGF0IHdlIHdhbnQgdGhlIGNoYXJhY3RlciB0byBiZSBsb3dlcmNhc2UuICB0aGlzIG1lYW5zIGlmXG4gICAgICAgICAgICAvLyB5b3UgYWNjaWRlbnRhbGx5IGhhdmUgY2FwcyBsb2NrIG9uIHRoZW4geW91ciBrZXkgYmluZGluZ3NcbiAgICAgICAgICAgIC8vIHdpbGwgY29udGludWUgdG8gd29ya1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoZSBvbmx5IHNpZGUgZWZmZWN0IHRoYXQgbWlnaHQgbm90IGJlIGRlc2lyZWQgaXMgaWYgeW91XG4gICAgICAgICAgICAvLyBiaW5kIHNvbWV0aGluZyBsaWtlICdBJyBjYXVzZSB5b3Ugd2FudCB0byB0cmlnZ2VyIGFuXG4gICAgICAgICAgICAvLyBldmVudCB3aGVuIGNhcGl0YWwgQSBpcyBwcmVzc2VkIGNhcHMgbG9jayB3aWxsIG5vIGxvbmdlclxuICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQuICBzaGlmdCthIHdpbGwgdGhvdWdoLlxuICAgICAgICAgICAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyID0gY2hhcmFjdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3Igbm9uIGtleXByZXNzIGV2ZW50cyB0aGUgc3BlY2lhbCBtYXBzIGFyZSBuZWVkZWRcbiAgICAgICAgaWYgKF9NQVBbZS53aGljaF0pIHtcbiAgICAgICAgICAgIHJldHVybiBfTUFQW2Uud2hpY2hdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9LRVlDT0RFX01BUFtlLndoaWNoXSkge1xuICAgICAgICAgICAgcmV0dXJuIF9LRVlDT0RFX01BUFtlLndoaWNoXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGl0IGlzIG5vdCBpbiB0aGUgc3BlY2lhbCBtYXBcblxuICAgICAgICAvLyB3aXRoIGtleWRvd24gYW5kIGtleXVwIGV2ZW50cyB0aGUgY2hhcmFjdGVyIHNlZW1zIHRvIGFsd2F5c1xuICAgICAgICAvLyBjb21lIGluIGFzIGFuIHVwcGVyY2FzZSBjaGFyYWN0ZXIgd2hldGhlciB5b3UgYXJlIHByZXNzaW5nIHNoaWZ0XG4gICAgICAgIC8vIG9yIG5vdC4gIHdlIHNob3VsZCBtYWtlIHN1cmUgaXQgaXMgYWx3YXlzIGxvd2VyY2FzZSBmb3IgY29tcGFyaXNvbnNcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGVja3MgaWYgdHdvIGFycmF5cyBhcmUgZXF1YWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyczFcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX21vZGlmaWVyc01hdGNoKG1vZGlmaWVyczEsIG1vZGlmaWVyczIpIHtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVyczEuc29ydCgpLmpvaW4oJywnKSA9PT0gbW9kaWZpZXJzMi5zb3J0KCkuam9pbignLCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRha2VzIGEga2V5IGV2ZW50IGFuZCBmaWd1cmVzIG91dCB3aGF0IHRoZSBtb2RpZmllcnMgYXJlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9ldmVudE1vZGlmaWVycyhlKSB7XG4gICAgICAgIHZhciBtb2RpZmllcnMgPSBbXTtcblxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3NoaWZ0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdhbHQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmN0cmxLZXkpIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKCdjdHJsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICBtb2RpZmllcnMucHVzaCgnbWV0YScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcmV2ZW50cyBkZWZhdWx0IGZvciB0aGlzIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9wcmV2ZW50RGVmYXVsdChlKSB7XG4gICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RvcHMgcHJvcG9nYXRpb24gZm9yIHRoaXMgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3N0b3BQcm9wYWdhdGlvbihlKSB7XG4gICAgICAgIGlmIChlLnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBrZXljb2RlIHNwZWNpZmllZCBpcyBhIG1vZGlmaWVyIGtleSBvciBub3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfaXNNb2RpZmllcihrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSAnc2hpZnQnIHx8IGtleSA9PSAnY3RybCcgfHwga2V5ID09ICdhbHQnIHx8IGtleSA9PSAnbWV0YSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV2ZXJzZXMgdGhlIG1hcCBsb29rdXAgc28gdGhhdCB3ZSBjYW4gbG9vayBmb3Igc3BlY2lmaWMga2V5c1xuICAgICAqIHRvIHNlZSB3aGF0IGNhbiBhbmQgY2FuJ3QgdXNlIGtleXByZXNzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldFJldmVyc2VNYXAoKSB7XG4gICAgICAgIGlmICghX1JFVkVSU0VfTUFQKSB7XG4gICAgICAgICAgICBfUkVWRVJTRV9NQVAgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBfTUFQKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBwdWxsIG91dCB0aGUgbnVtZXJpYyBrZXlwYWQgZnJvbSBoZXJlIGNhdXNlIGtleXByZXNzIHNob3VsZFxuICAgICAgICAgICAgICAgIC8vIGJlIGFibGUgdG8gZGV0ZWN0IHRoZSBrZXlzIGZyb20gdGhlIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPiA5NSAmJiBrZXkgPCAxMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9NQVAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBfUkVWRVJTRV9NQVBbX01BUFtrZXldXSA9IGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9SRVZFUlNFX01BUDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwaWNrcyB0aGUgYmVzdCBhY3Rpb24gYmFzZWQgb24gdGhlIGtleSBjb21iaW5hdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGNoYXJhY3RlciBmb3Iga2V5XG4gICAgICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb24gcGFzc2VkIGluXG4gICAgICovXG4gICAgZnVuY3Rpb24gX3BpY2tCZXN0QWN0aW9uKGtleSwgbW9kaWZpZXJzLCBhY3Rpb24pIHtcblxuICAgICAgICAvLyBpZiBubyBhY3Rpb24gd2FzIHBpY2tlZCBpbiB3ZSBzaG91bGQgdHJ5IHRvIHBpY2sgdGhlIG9uZVxuICAgICAgICAvLyB0aGF0IHdlIHRoaW5rIHdvdWxkIHdvcmsgYmVzdCBmb3IgdGhpcyBrZXlcbiAgICAgICAgaWYgKCFhY3Rpb24pIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IF9nZXRSZXZlcnNlTWFwKClba2V5XSA/ICdrZXlkb3duJyA6ICdrZXlwcmVzcyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb2RpZmllciBrZXlzIGRvbid0IHdvcmsgYXMgZXhwZWN0ZWQgd2l0aCBrZXlwcmVzcyxcbiAgICAgICAgLy8gc3dpdGNoIHRvIGtleWRvd25cbiAgICAgICAgaWYgKGFjdGlvbiA9PSAna2V5cHJlc3MnICYmIG1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICdrZXlkb3duJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgZnJvbSBhIHN0cmluZyBrZXkgY29tYmluYXRpb24gdG8gYW4gYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29tYmluYXRpb24gbGlrZSBcImNvbW1hbmQrc2hpZnQrbFwiXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2tleXNGcm9tU3RyaW5nKGNvbWJpbmF0aW9uKSB7XG4gICAgICAgIGlmIChjb21iaW5hdGlvbiA9PT0gJysnKSB7XG4gICAgICAgICAgICByZXR1cm4gWycrJ107XG4gICAgICAgIH1cblxuICAgICAgICBjb21iaW5hdGlvbiA9IGNvbWJpbmF0aW9uLnJlcGxhY2UoL1xcK3syfS9nLCAnK3BsdXMnKTtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmF0aW9uLnNwbGl0KCcrJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvIGZvciBhIHNwZWNpZmljIGtleSBjb21iaW5hdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBjb21iaW5hdGlvbiBrZXkgY29tYmluYXRpb24gKFwiY29tbWFuZCtzXCIgb3IgXCJhXCIgb3IgXCIqXCIpXG4gICAgICogQHBhcmFtICB7c3RyaW5nPX0gYWN0aW9uXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0S2V5SW5mbyhjb21iaW5hdGlvbiwgYWN0aW9uKSB7XG4gICAgICAgIHZhciBrZXlzO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIG1vZGlmaWVycyA9IFtdO1xuXG4gICAgICAgIC8vIHRha2UgdGhlIGtleXMgZnJvbSB0aGlzIHBhdHRlcm4gYW5kIGZpZ3VyZSBvdXQgd2hhdCB0aGUgYWN0dWFsXG4gICAgICAgIC8vIHBhdHRlcm4gaXMgYWxsIGFib3V0XG4gICAgICAgIGtleXMgPSBfa2V5c0Zyb21TdHJpbmcoY29tYmluYXRpb24pO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUga2V5IG5hbWVzXG4gICAgICAgICAgICBpZiAoX1NQRUNJQUxfQUxJQVNFU1trZXldKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gX1NQRUNJQUxfQUxJQVNFU1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIG5vdCBhIGtleXByZXNzIGV2ZW50IHRoZW4gd2Ugc2hvdWxkXG4gICAgICAgICAgICAvLyBiZSBzbWFydCBhYm91dCB1c2luZyBzaGlmdCBrZXlzXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgb25seSB3b3JrIGZvciBVUyBrZXlib2FyZHMgaG93ZXZlclxuICAgICAgICAgICAgaWYgKGFjdGlvbiAmJiBhY3Rpb24gIT0gJ2tleXByZXNzJyAmJiBfU0hJRlRfTUFQW2tleV0pIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBfU0hJRlRfTUFQW2tleV07XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3NoaWZ0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoaXMga2V5IGlzIGEgbW9kaWZpZXIgdGhlbiBhZGQgaXQgdG8gdGhlIGxpc3Qgb2YgbW9kaWZpZXJzXG4gICAgICAgICAgICBpZiAoX2lzTW9kaWZpZXIoa2V5KSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVycy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXBlbmRpbmcgb24gd2hhdCB0aGUga2V5IGNvbWJpbmF0aW9uIGlzXG4gICAgICAgIC8vIHdlIHdpbGwgdHJ5IHRvIHBpY2sgdGhlIGJlc3QgZXZlbnQgZm9yIGl0XG4gICAgICAgIGFjdGlvbiA9IF9waWNrQmVzdEFjdGlvbihrZXksIG1vZGlmaWVycywgYWN0aW9uKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBtb2RpZmllcnM6IG1vZGlmaWVycyxcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2JlbG9uZ3NUbyhlbGVtZW50LCBhbmNlc3Rvcikge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IGFuY2VzdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfYmVsb25nc1RvKGVsZW1lbnQucGFyZW50Tm9kZSwgYW5jZXN0b3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIE1vdXNldHJhcCh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0YXJnZXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudCB8fCBkb2N1bWVudDtcblxuICAgICAgICBpZiAoIShzZWxmIGluc3RhbmNlb2YgTW91c2V0cmFwKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNb3VzZXRyYXAodGFyZ2V0RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogZWxlbWVudCB0byBhdHRhY2gga2V5IGV2ZW50cyB0b1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGYudGFyZ2V0ID0gdGFyZ2V0RWxlbWVudDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYSBsaXN0IG9mIGFsbCB0aGUgY2FsbGJhY2tzIHNldHVwIHZpYSBNb3VzZXRyYXAuYmluZCgpXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9jYWxsYmFja3MgPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGlyZWN0IG1hcCBvZiBzdHJpbmcgY29tYmluYXRpb25zIHRvIGNhbGxiYWNrcyB1c2VkIGZvciB0cmlnZ2VyKClcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHNlbGYuX2RpcmVjdE1hcCA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBrZWVwcyB0cmFjayBvZiB3aGF0IGxldmVsIGVhY2ggc2VxdWVuY2UgaXMgYXQgc2luY2UgbXVsdGlwbGVcbiAgICAgICAgICogc2VxdWVuY2VzIGNhbiBzdGFydCBvdXQgd2l0aCB0aGUgc2FtZSBzZXF1ZW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF9zZXF1ZW5jZUxldmVscyA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB2YXJpYWJsZSB0byBzdG9yZSB0aGUgc2V0VGltZW91dCBjYWxsXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtudWxsfG51bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfcmVzZXRUaW1lcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdGVtcG9yYXJ5IHN0YXRlIHdoZXJlIHdlIHdpbGwgaWdub3JlIHRoZSBuZXh0IGtleXVwXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufHN0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfaWdub3JlTmV4dEtleXVwID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRlbXBvcmFyeSBzdGF0ZSB3aGVyZSB3ZSB3aWxsIGlnbm9yZSB0aGUgbmV4dCBrZXlwcmVzc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBfaWdub3JlTmV4dEtleXByZXNzID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFyZSB3ZSBjdXJyZW50bHkgaW5zaWRlIG9mIGEgc2VxdWVuY2U/XG4gICAgICAgICAqIHR5cGUgb2YgYWN0aW9uIChcImtleXVwXCIgb3IgXCJrZXlkb3duXCIgb3IgXCJrZXlwcmVzc1wiKSBvciBmYWxzZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbnxzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgX25leHRFeHBlY3RlZEFjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXNldHMgYWxsIHNlcXVlbmNlIGNvdW50ZXJzIGV4Y2VwdCBmb3IgdGhlIG9uZXMgcGFzc2VkIGluXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkb05vdFJlc2V0XG4gICAgICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9yZXNldFNlcXVlbmNlcyhkb05vdFJlc2V0KSB7XG4gICAgICAgICAgICBkb05vdFJlc2V0ID0gZG9Ob3RSZXNldCB8fCB7fTtcblxuICAgICAgICAgICAgdmFyIGFjdGl2ZVNlcXVlbmNlcyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtleTtcblxuICAgICAgICAgICAgZm9yIChrZXkgaW4gX3NlcXVlbmNlTGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvTm90UmVzZXRba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZXF1ZW5jZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3NlcXVlbmNlTGV2ZWxzW2tleV0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZVNlcXVlbmNlcykge1xuICAgICAgICAgICAgICAgIF9uZXh0RXhwZWN0ZWRBY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBmaW5kcyBhbGwgY2FsbGJhY2tzIHRoYXQgbWF0Y2ggYmFzZWQgb24gdGhlIGtleWNvZGUsIG1vZGlmaWVycyxcbiAgICAgICAgICogYW5kIGFjdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhcmFjdGVyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVyc1xuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fE9iamVjdH0gZVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IHNlcXVlbmNlTmFtZSAtIG5hbWUgb2YgdGhlIHNlcXVlbmNlIHdlIGFyZSBsb29raW5nIGZvclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGNvbWJpbmF0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gbGV2ZWxcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2dldE1hdGNoZXMoY2hhcmFjdGVyLCBtb2RpZmllcnMsIGUsIHNlcXVlbmNlTmFtZSwgY29tYmluYXRpb24sIGxldmVsKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjaztcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gW107XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gZS50eXBlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHJlbGF0ZWQgdG8gdGhpcyBrZXljb2RlXG4gICAgICAgICAgICBpZiAoIXNlbGYuX2NhbGxiYWNrc1tjaGFyYWN0ZXJdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBhIG1vZGlmaWVyIGtleSBpcyBjb21pbmcgdXAgb24gaXRzIG93biB3ZSBzaG91bGQgYWxsb3cgaXRcbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2tleXVwJyAmJiBfaXNNb2RpZmllcihjaGFyYWN0ZXIpKSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzID0gW2NoYXJhY3Rlcl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY2FsbGJhY2tzIGZvciB0aGUga2V5IHRoYXQgd2FzIHByZXNzZWRcbiAgICAgICAgICAgIC8vIGFuZCBzZWUgaWYgYW55IG9mIHRoZW0gbWF0Y2hcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gc2VsZi5fY2FsbGJhY2tzW2NoYXJhY3Rlcl1baV07XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBhIHNlcXVlbmNlIG5hbWUgaXMgbm90IHNwZWNpZmllZCwgYnV0IHRoaXMgaXMgYSBzZXF1ZW5jZSBhdFxuICAgICAgICAgICAgICAgIC8vIHRoZSB3cm9uZyBsZXZlbCB0aGVuIG1vdmUgb250byB0aGUgbmV4dCBtYXRjaFxuICAgICAgICAgICAgICAgIGlmICghc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLnNlcSAmJiBfc2VxdWVuY2VMZXZlbHNbY2FsbGJhY2suc2VxXSAhPSBjYWxsYmFjay5sZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWN0aW9uIHdlIGFyZSBsb29raW5nIGZvciBkb2Vzbid0IG1hdGNoIHRoZSBhY3Rpb24gd2UgZ290XG4gICAgICAgICAgICAgICAgLy8gdGhlbiB3ZSBzaG91bGQga2VlcCBnb2luZ1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gIT0gY2FsbGJhY2suYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSBrZXlwcmVzcyBldmVudCBhbmQgdGhlIG1ldGEga2V5IGFuZCBjb250cm9sIGtleVxuICAgICAgICAgICAgICAgIC8vIGFyZSBub3QgcHJlc3NlZCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBvbmx5IGxvb2sgYXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyLCBvdGhlcndpc2UgY2hlY2sgdGhlIG1vZGlmaWVycyBhcyB3ZWxsXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBjaHJvbWUgd2lsbCBub3QgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgY29udHJvbCBpcyBkb3duXG4gICAgICAgICAgICAgICAgLy8gc2FmYXJpIHdpbGwgZmlyZSBhIGtleXByZXNzIGlmIG1ldGEgb3IgbWV0YStzaGlmdCBpcyBkb3duXG4gICAgICAgICAgICAgICAgLy8gZmlyZWZveCB3aWxsIGZpcmUgYSBrZXlwcmVzcyBpZiBtZXRhIG9yIGNvbnRyb2wgaXMgZG93blxuICAgICAgICAgICAgICAgIGlmICgoYWN0aW9uID09ICdrZXlwcmVzcycgJiYgIWUubWV0YUtleSAmJiAhZS5jdHJsS2V5KSB8fCBfbW9kaWZpZXJzTWF0Y2gobW9kaWZpZXJzLCBjYWxsYmFjay5tb2RpZmllcnMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB5b3UgYmluZCBhIGNvbWJpbmF0aW9uIG9yIHNlcXVlbmNlIGEgc2Vjb25kIHRpbWUgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIG92ZXJ3cml0ZSB0aGUgZmlyc3Qgb25lLiAgaWYgYSBzZXF1ZW5jZU5hbWUgb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tYmluYXRpb24gaXMgc3BlY2lmaWVkIGluIHRoaXMgY2FsbCBpdCBkb2VzIGp1c3QgdGhhdFxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBAdG9kbyBtYWtlIGRlbGV0aW5nIGl0cyBvd24gbWV0aG9kP1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsZXRlQ29tYm8gPSAhc2VxdWVuY2VOYW1lICYmIGNhbGxiYWNrLmNvbWJvID09IGNvbWJpbmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsZXRlU2VxdWVuY2UgPSBzZXF1ZW5jZU5hbWUgJiYgY2FsbGJhY2suc2VxID09IHNlcXVlbmNlTmFtZSAmJiBjYWxsYmFjay5sZXZlbCA9PSBsZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0ZUNvbWJvIHx8IGRlbGV0ZVNlcXVlbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jYWxsYmFja3NbY2hhcmFjdGVyXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogYWN0dWFsbHkgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIGlmIHlvdXIgY2FsbGJhY2sgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB0aGlzIHdpbGwgdXNlIHRoZSBqcXVlcnlcbiAgICAgICAgICogY29udmVudGlvbiAtIHByZXZlbnQgZGVmYXVsdCBhbmQgc3RvcCBwcm9wb2dhdGlvbiBvbiB0aGUgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrLCBlLCBjb21ibywgc2VxdWVuY2UpIHtcblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBldmVudCBzaG91bGQgbm90IGhhcHBlbiBzdG9wIGhlcmVcbiAgICAgICAgICAgIGlmIChzZWxmLnN0b3BDYWxsYmFjayhlLCBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsIGNvbWJvLCBzZXF1ZW5jZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhlLCBjb21ibykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgX3ByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgICAgICAgICAgIF9zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogaGFuZGxlcyBhIGNoYXJhY3RlciBrZXkgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBzZWxmLl9oYW5kbGVLZXkgPSBmdW5jdGlvbihjaGFyYWN0ZXIsIG1vZGlmaWVycywgZSkge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IF9nZXRNYXRjaGVzKGNoYXJhY3RlciwgbW9kaWZpZXJzLCBlKTtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIGRvTm90UmVzZXQgPSB7fTtcbiAgICAgICAgICAgIHZhciBtYXhMZXZlbCA9IDA7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIG1heExldmVsIGZvciBzZXF1ZW5jZXMgc28gd2UgY2FuIG9ubHkgZXhlY3V0ZSB0aGUgbG9uZ2VzdCBjYWxsYmFjayBzZXF1ZW5jZVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0uc2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heExldmVsID0gTWF0aC5tYXgobWF4TGV2ZWwsIGNhbGxiYWNrc1tpXS5sZXZlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggbWF0Y2hpbmcgY2FsbGJhY2tzIGZvciB0aGlzIGtleSBldmVudFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgICAgICAgICAgLy8gZmlyZSBmb3IgYWxsIHNlcXVlbmNlIGNhbGxiYWNrc1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYmVjYXVzZSBpZiBmb3IgZXhhbXBsZSB5b3UgaGF2ZSBtdWx0aXBsZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgICAvLyBib3VuZCBzdWNoIGFzIFwiZyBpXCIgYW5kIFwiZyB0XCIgdGhleSBib3RoIG5lZWQgdG8gZmlyZSB0aGVcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayBmb3IgbWF0Y2hpbmcgZyBjYXVzZSBvdGhlcndpc2UgeW91IGNhbiBvbmx5IGV2ZXJcbiAgICAgICAgICAgICAgICAvLyBtYXRjaCB0aGUgZmlyc3Qgb25lXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrc1tpXS5zZXEpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGZpcmUgY2FsbGJhY2tzIGZvciB0aGUgbWF4TGV2ZWwgdG8gcHJldmVudFxuICAgICAgICAgICAgICAgICAgICAvLyBzdWJzZXF1ZW5jZXMgZnJvbSBhbHNvIGZpcmluZ1xuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSAnYSBvcHRpb24gYicgc2hvdWxkIG5vdCBjYXVzZSAnb3B0aW9uIGInIHRvIGZpcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbiB0aG91Z2ggJ29wdGlvbiBiJyBpcyBwYXJ0IG9mIHRoZSBvdGhlciBzZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAvLyBhbnkgc2VxdWVuY2VzIHRoYXQgZG8gbm90IG1hdGNoIGhlcmUgd2lsbCBiZSBkaXNjYXJkZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVsb3cgYnkgdGhlIF9yZXNldFNlcXVlbmNlcyBjYWxsXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3NbaV0ubGV2ZWwgIT0gbWF4TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkU2VxdWVuY2VDYWxsYmFjayA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCBhIGxpc3Qgb2Ygd2hpY2ggc2VxdWVuY2VzIHdlcmUgbWF0Y2hlcyBmb3IgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgZG9Ob3RSZXNldFtjYWxsYmFja3NbaV0uc2VxXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIF9maXJlQ2FsbGJhY2soY2FsbGJhY2tzW2ldLmNhbGxiYWNrLCBlLCBjYWxsYmFja3NbaV0uY29tYm8sIGNhbGxiYWNrc1tpXS5zZXEpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSB3ZXJlIG5vIHNlcXVlbmNlIG1hdGNoZXMgYnV0IHdlIGFyZSBzdGlsbCBoZXJlXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBtZWFucyB0aGlzIGlzIGEgcmVndWxhciBtYXRjaCBzbyB3ZSBzaG91bGQgZmlyZSB0aGF0XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9jZXNzZWRTZXF1ZW5jZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9maXJlQ2FsbGJhY2soY2FsbGJhY2tzW2ldLmNhbGxiYWNrLCBlLCBjYWxsYmFja3NbaV0uY29tYm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIGtleSB5b3UgcHJlc3NlZCBtYXRjaGVzIHRoZSB0eXBlIG9mIHNlcXVlbmNlIHdpdGhvdXRcbiAgICAgICAgICAgIC8vIGJlaW5nIGEgbW9kaWZpZXIgKGllIFwia2V5dXBcIiBvciBcImtleXByZXNzXCIpIHRoZW4gd2Ugc2hvdWxkXG4gICAgICAgICAgICAvLyByZXNldCBhbGwgc2VxdWVuY2VzIHRoYXQgd2VyZSBub3QgbWF0Y2hlZCBieSB0aGlzIGV2ZW50XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBzbywgZm9yIGV4YW1wbGUsIGlmIHlvdSBoYXZlIHRoZSBzZXF1ZW5jZSBcImggYSB0XCIgYW5kIHlvdVxuICAgICAgICAgICAgLy8gdHlwZSBcImggZSBhIHIgdFwiIGl0IGRvZXMgbm90IG1hdGNoLiAgaW4gdGhpcyBjYXNlIHRoZSBcImVcIiB3aWxsXG4gICAgICAgICAgICAvLyBjYXVzZSB0aGUgc2VxdWVuY2UgdG8gcmVzZXRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBtb2RpZmllciBrZXlzIGFyZSBpZ25vcmVkIGJlY2F1c2UgeW91IGNhbiBoYXZlIGEgc2VxdWVuY2VcbiAgICAgICAgICAgIC8vIHRoYXQgY29udGFpbnMgbW9kaWZpZXJzIHN1Y2ggYXMgXCJlbnRlciBjdHJsK3NwYWNlXCIgYW5kIGluIG1vc3RcbiAgICAgICAgICAgIC8vIGNhc2VzIHRoZSBtb2RpZmllciBrZXkgd2lsbCBiZSBwcmVzc2VkIGJlZm9yZSB0aGUgbmV4dCBrZXlcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBhbHNvIGlmIHlvdSBoYXZlIGEgc2VxdWVuY2Ugc3VjaCBhcyBcImN0cmwrYiBhXCIgdGhlbiBwcmVzc2luZyB0aGVcbiAgICAgICAgICAgIC8vIFwiYlwiIGtleSB3aWxsIHRyaWdnZXIgYSBcImtleXByZXNzXCIgYW5kIGEgXCJrZXlkb3duXCJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGUgXCJrZXlkb3duXCIgaXMgZXhwZWN0ZWQgd2hlbiB0aGVyZSBpcyBhIG1vZGlmaWVyLCBidXQgdGhlXG4gICAgICAgICAgICAvLyBcImtleXByZXNzXCIgZW5kcyB1cCBtYXRjaGluZyB0aGUgX25leHRFeHBlY3RlZEFjdGlvbiBzaW5jZSBpdCBvY2N1cnNcbiAgICAgICAgICAgIC8vIGFmdGVyIGFuZCB0aGF0IGNhdXNlcyB0aGUgc2VxdWVuY2UgdG8gcmVzZXRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB3ZSBpZ25vcmUga2V5cHJlc3NlcyBpbiBhIHNlcXVlbmNlIHRoYXQgZGlyZWN0bHkgZm9sbG93IGEga2V5ZG93blxuICAgICAgICAgICAgLy8gZm9yIHRoZSBzYW1lIGNoYXJhY3RlclxuICAgICAgICAgICAgdmFyIGlnbm9yZVRoaXNLZXlwcmVzcyA9IGUudHlwZSA9PSAna2V5cHJlc3MnICYmIF9pZ25vcmVOZXh0S2V5cHJlc3M7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09IF9uZXh0RXhwZWN0ZWRBY3Rpb24gJiYgIV9pc01vZGlmaWVyKGNoYXJhY3RlcikgJiYgIWlnbm9yZVRoaXNLZXlwcmVzcykge1xuICAgICAgICAgICAgICAgIF9yZXNldFNlcXVlbmNlcyhkb05vdFJlc2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2lnbm9yZU5leHRLZXlwcmVzcyA9IHByb2Nlc3NlZFNlcXVlbmNlQ2FsbGJhY2sgJiYgZS50eXBlID09ICdrZXlkb3duJztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaGFuZGxlcyBhIGtleWRvd24gZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfaGFuZGxlS2V5RXZlbnQoZSkge1xuXG4gICAgICAgICAgICAvLyBub3JtYWxpemUgZS53aGljaCBmb3Iga2V5IGV2ZW50c1xuICAgICAgICAgICAgLy8gQHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQyODU2MjcvamF2YXNjcmlwdC1rZXljb2RlLXZzLWNoYXJjb2RlLXV0dGVyLWNvbmZ1c2lvblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlLndoaWNoICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGUud2hpY2ggPSBlLmtleUNvZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpO1xuXG4gICAgICAgICAgICAvLyBubyBjaGFyYWN0ZXIgZm91bmQgdGhlbiBzdG9wXG4gICAgICAgICAgICBpZiAoIWNoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbmVlZCB0byB1c2UgPT09IGZvciB0aGUgY2hhcmFjdGVyIGNoZWNrIGJlY2F1c2UgdGhlIGNoYXJhY3RlciBjYW4gYmUgMFxuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAna2V5dXAnICYmIF9pZ25vcmVOZXh0S2V5dXAgPT09IGNoYXJhY3Rlcikge1xuICAgICAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5dXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuaGFuZGxlS2V5KGNoYXJhY3RlciwgX2V2ZW50TW9kaWZpZXJzKGUpLCBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYWxsZWQgdG8gc2V0IGEgMSBzZWNvbmQgdGltZW91dCBvbiB0aGUgc3BlY2lmaWVkIHNlcXVlbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIHRoaXMgaXMgc28gYWZ0ZXIgZWFjaCBrZXkgcHJlc3MgaW4gdGhlIHNlcXVlbmNlIHlvdSBoYXZlIDEgc2Vjb25kXG4gICAgICAgICAqIHRvIHByZXNzIHRoZSBuZXh0IGtleSBiZWZvcmUgeW91IGhhdmUgdG8gc3RhcnQgb3ZlclxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfcmVzZXRTZXF1ZW5jZVRpbWVyKCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF9yZXNldFRpbWVyKTtcbiAgICAgICAgICAgIF9yZXNldFRpbWVyID0gc2V0VGltZW91dChfcmVzZXRTZXF1ZW5jZXMsIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIGEga2V5IHNlcXVlbmNlIHRvIGFuIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21ibyAtIGNvbWJvIHNwZWNpZmllZCBpbiBiaW5kIGNhbGxcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0ga2V5c1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfYmluZFNlcXVlbmNlKGNvbWJvLCBrZXlzLCBjYWxsYmFjaywgYWN0aW9uKSB7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IG9mZiBieSBhZGRpbmcgYSBzZXF1ZW5jZSBsZXZlbCByZWNvcmQgZm9yIHRoaXMgY29tYmluYXRpb25cbiAgICAgICAgICAgIC8vIGFuZCBzZXR0aW5nIHRoZSBsZXZlbCB0byAwXG4gICAgICAgICAgICBfc2VxdWVuY2VMZXZlbHNbY29tYm9dID0gMDtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjYWxsYmFjayB0byBpbmNyZWFzZSB0aGUgc2VxdWVuY2UgbGV2ZWwgZm9yIHRoaXMgc2VxdWVuY2UgYW5kIHJlc2V0XG4gICAgICAgICAgICAgKiBhbGwgb3RoZXIgc2VxdWVuY2VzIHRoYXQgd2VyZSBhY3RpdmVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV4dEFjdGlvblxuICAgICAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBfaW5jcmVhc2VTZXF1ZW5jZShuZXh0QWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfbmV4dEV4cGVjdGVkQWN0aW9uID0gbmV4dEFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgKytfc2VxdWVuY2VMZXZlbHNbY29tYm9dO1xuICAgICAgICAgICAgICAgICAgICBfcmVzZXRTZXF1ZW5jZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiB3cmFwcyB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrIGluc2lkZSBvZiBhbm90aGVyIGZ1bmN0aW9uIGluIG9yZGVyXG4gICAgICAgICAgICAgKiB0byByZXNldCBhbGwgc2VxdWVuY2UgY291bnRlcnMgYXMgc29vbiBhcyB0aGlzIHNlcXVlbmNlIGlzIGRvbmVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIF9jYWxsYmFja0FuZFJlc2V0KGUpIHtcbiAgICAgICAgICAgICAgICBfZmlyZUNhbGxiYWNrKGNhbGxiYWNrLCBlLCBjb21ibyk7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgaWdub3JlIHRoZSBuZXh0IGtleSB1cCBpZiB0aGUgYWN0aW9uIGlzIGtleSBkb3duXG4gICAgICAgICAgICAgICAgLy8gb3Iga2V5cHJlc3MuICB0aGlzIGlzIHNvIGlmIHlvdSBmaW5pc2ggYSBzZXF1ZW5jZSBhbmRcbiAgICAgICAgICAgICAgICAvLyByZWxlYXNlIHRoZSBrZXkgdGhlIGZpbmFsIGtleSB3aWxsIG5vdCB0cmlnZ2VyIGEga2V5dXBcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICE9PSAna2V5dXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pZ25vcmVOZXh0S2V5dXAgPSBfY2hhcmFjdGVyRnJvbUV2ZW50KGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHdlaXJkIHJhY2UgY29uZGl0aW9uIGlmIGEgc2VxdWVuY2UgZW5kcyB3aXRoIHRoZSBrZXlcbiAgICAgICAgICAgICAgICAvLyBhbm90aGVyIHNlcXVlbmNlIGJlZ2lucyB3aXRoXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChfcmVzZXRTZXF1ZW5jZXMsIDEwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGtleXMgb25lIGF0IGEgdGltZSBhbmQgYmluZCB0aGUgYXBwcm9wcmlhdGUgY2FsbGJhY2tcbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uLiAgZm9yIGFueSBrZXkgbGVhZGluZyB1cCB0byB0aGUgZmluYWwgb25lIGl0IHNob3VsZFxuICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIHNlcXVlbmNlLiBhZnRlciB0aGUgZmluYWwsIGl0IHNob3VsZCByZXNldCBhbGwgc2VxdWVuY2VzXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gaWYgYW4gYWN0aW9uIGlzIHNwZWNpZmllZCBpbiB0aGUgb3JpZ2luYWwgYmluZCBjYWxsIHRoZW4gdGhhdCB3aWxsXG4gICAgICAgICAgICAvLyBiZSB1c2VkIHRocm91Z2hvdXQuICBvdGhlcndpc2Ugd2Ugd2lsbCBwYXNzIHRoZSBhY3Rpb24gdGhhdCB0aGVcbiAgICAgICAgICAgIC8vIG5leHQga2V5IGluIHRoZSBzZXF1ZW5jZSBzaG91bGQgbWF0Y2guICB0aGlzIGFsbG93cyBhIHNlcXVlbmNlXG4gICAgICAgICAgICAvLyB0byBtaXggYW5kIG1hdGNoIGtleXByZXNzIGFuZCBrZXlkb3duIGV2ZW50cyBkZXBlbmRpbmcgb24gd2hpY2hcbiAgICAgICAgICAgIC8vIG9uZXMgYXJlIGJldHRlciBzdWl0ZWQgdG8gdGhlIGtleSBwcm92aWRlZFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzRmluYWwgPSBpICsgMSA9PT0ga2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGlzRmluYWwgPyBfY2FsbGJhY2tBbmRSZXNldCA6IF9pbmNyZWFzZVNlcXVlbmNlKGFjdGlvbiB8fCBfZ2V0S2V5SW5mbyhrZXlzW2kgKyAxXSkuYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBfYmluZFNpbmdsZShrZXlzW2ldLCB3cmFwcGVkQ2FsbGJhY2ssIGFjdGlvbiwgY29tYm8sIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIGEgc2luZ2xlIGtleWJvYXJkIGNvbWJpbmF0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21iaW5hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZz19IHNlcXVlbmNlTmFtZSAtIG5hbWUgb2Ygc2VxdWVuY2UgaWYgcGFydCBvZiBzZXF1ZW5jZVxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcj19IGxldmVsIC0gd2hhdCBwYXJ0IG9mIHRoZSBzZXF1ZW5jZSB0aGUgY29tbWFuZCBpc1xuICAgICAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfYmluZFNpbmdsZShjb21iaW5hdGlvbiwgY2FsbGJhY2ssIGFjdGlvbiwgc2VxdWVuY2VOYW1lLCBsZXZlbCkge1xuXG4gICAgICAgICAgICAvLyBzdG9yZSBhIGRpcmVjdCBtYXBwZWQgcmVmZXJlbmNlIGZvciB1c2Ugd2l0aCBNb3VzZXRyYXAudHJpZ2dlclxuICAgICAgICAgICAgc2VsZi5fZGlyZWN0TWFwW2NvbWJpbmF0aW9uICsgJzonICsgYWN0aW9uXSA9IGNhbGxiYWNrO1xuXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgbXVsdGlwbGUgc3BhY2VzIGluIGEgcm93IGJlY29tZSBhIHNpbmdsZSBzcGFjZVxuICAgICAgICAgICAgY29tYmluYXRpb24gPSBjb21iaW5hdGlvbi5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG5cbiAgICAgICAgICAgIHZhciBzZXF1ZW5jZSA9IGNvbWJpbmF0aW9uLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICB2YXIgaW5mbztcblxuICAgICAgICAgICAgLy8gaWYgdGhpcyBwYXR0ZXJuIGlzIGEgc2VxdWVuY2Ugb2Yga2V5cyB0aGVuIHJ1biB0aHJvdWdoIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICAvLyB0byByZXByb2Nlc3MgZWFjaCBwYXR0ZXJuIG9uZSBrZXkgYXQgYSB0aW1lXG4gICAgICAgICAgICBpZiAoc2VxdWVuY2UubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIF9iaW5kU2VxdWVuY2UoY29tYmluYXRpb24sIHNlcXVlbmNlLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZm8gPSBfZ2V0S2V5SW5mbyhjb21iaW5hdGlvbiwgYWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGluaXRpYWxpemUgYXJyYXkgaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZVxuICAgICAgICAgICAgLy8gYSBjYWxsYmFjayBpcyBhZGRlZCBmb3IgdGhpcyBrZXlcbiAgICAgICAgICAgIHNlbGYuX2NhbGxiYWNrc1tpbmZvLmtleV0gPSBzZWxmLl9jYWxsYmFja3NbaW5mby5rZXldIHx8IFtdO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgYW4gZXhpc3RpbmcgbWF0Y2ggaWYgdGhlcmUgaXMgb25lXG4gICAgICAgICAgICBfZ2V0TWF0Y2hlcyhpbmZvLmtleSwgaW5mby5tb2RpZmllcnMsIHt0eXBlOiBpbmZvLmFjdGlvbn0sIHNlcXVlbmNlTmFtZSwgY29tYmluYXRpb24sIGxldmVsKTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoaXMgY2FsbCBiYWNrIHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYSBzZXF1ZW5jZSBwdXQgaXQgYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgLy8gaWYgbm90IHB1dCBpdCBhdCB0aGUgZW5kXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZSB0aGUgd2F5IHRoZXNlIGFyZSBwcm9jZXNzZWQgZXhwZWN0c1xuICAgICAgICAgICAgLy8gdGhlIHNlcXVlbmNlIG9uZXMgdG8gY29tZSBmaXJzdFxuICAgICAgICAgICAgc2VsZi5fY2FsbGJhY2tzW2luZm8ua2V5XVtzZXF1ZW5jZU5hbWUgPyAndW5zaGlmdCcgOiAncHVzaCddKHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBpbmZvLm1vZGlmaWVycyxcbiAgICAgICAgICAgICAgICBhY3Rpb246IGluZm8uYWN0aW9uLFxuICAgICAgICAgICAgICAgIHNlcTogc2VxdWVuY2VOYW1lLFxuICAgICAgICAgICAgICAgIGxldmVsOiBsZXZlbCxcbiAgICAgICAgICAgICAgICBjb21ibzogY29tYmluYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGJpbmRzIG11bHRpcGxlIGNvbWJpbmF0aW9ucyB0byB0aGUgc2FtZSBjYWxsYmFja1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBjb21iaW5hdGlvbnNcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBhY3Rpb25cbiAgICAgICAgICogQHJldHVybnMgdm9pZFxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZi5fYmluZE11bHRpcGxlID0gZnVuY3Rpb24oY29tYmluYXRpb25zLCBjYWxsYmFjaywgYWN0aW9uKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbWJpbmF0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIF9iaW5kU2luZ2xlKGNvbWJpbmF0aW9uc1tpXSwgY2FsbGJhY2ssIGFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gc3RhcnQhXG4gICAgICAgIF9hZGRFdmVudCh0YXJnZXRFbGVtZW50LCAna2V5cHJlc3MnLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleWRvd24nLCBfaGFuZGxlS2V5RXZlbnQpO1xuICAgICAgICBfYWRkRXZlbnQodGFyZ2V0RWxlbWVudCwgJ2tleXVwJywgX2hhbmRsZUtleUV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kcyBhbiBldmVudCB0byBtb3VzZXRyYXBcbiAgICAgKlxuICAgICAqIGNhbiBiZSBhIHNpbmdsZSBrZXksIGEgY29tYmluYXRpb24gb2Yga2V5cyBzZXBhcmF0ZWQgd2l0aCArLFxuICAgICAqIGFuIGFycmF5IG9mIGtleXMsIG9yIGEgc2VxdWVuY2Ugb2Yga2V5cyBzZXBhcmF0ZWQgYnkgc3BhY2VzXG4gICAgICpcbiAgICAgKiBiZSBzdXJlIHRvIGxpc3QgdGhlIG1vZGlmaWVyIGtleXMgZmlyc3QgdG8gbWFrZSBzdXJlIHRoYXQgdGhlXG4gICAgICogY29ycmVjdCBrZXkgZW5kcyB1cCBnZXR0aW5nIGJvdW5kICh0aGUgbGFzdCBrZXkgaW4gdGhlIHBhdHRlcm4pXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0ga2V5c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBhY3Rpb24gLSAna2V5cHJlc3MnLCAna2V5ZG93bicsIG9yICdrZXl1cCdcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oa2V5cywgY2FsbGJhY2ssIGFjdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGtleXMgPSBrZXlzIGluc3RhbmNlb2YgQXJyYXkgPyBrZXlzIDogW2tleXNdO1xuICAgICAgICBzZWxmLl9iaW5kTXVsdGlwbGUuY2FsbChzZWxmLCBrZXlzLCBjYWxsYmFjaywgYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHVuYmluZHMgYW4gZXZlbnQgdG8gbW91c2V0cmFwXG4gICAgICpcbiAgICAgKiB0aGUgdW5iaW5kaW5nIHNldHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9mIHRoZSBzcGVjaWZpZWQga2V5IGNvbWJvXG4gICAgICogdG8gYW4gZW1wdHkgZnVuY3Rpb24gYW5kIGRlbGV0ZXMgdGhlIGNvcnJlc3BvbmRpbmcga2V5IGluIHRoZVxuICAgICAqIF9kaXJlY3RNYXAgZGljdC5cbiAgICAgKlxuICAgICAqIFRPRE86IGFjdHVhbGx5IHJlbW92ZSB0aGlzIGZyb20gdGhlIF9jYWxsYmFja3MgZGljdGlvbmFyeSBpbnN0ZWFkXG4gICAgICogb2YgYmluZGluZyBhbiBlbXB0eSBmdW5jdGlvblxuICAgICAqXG4gICAgICogdGhlIGtleWNvbWJvK2FjdGlvbiBoYXMgdG8gYmUgZXhhY3RseSB0aGUgc2FtZSBhc1xuICAgICAqIGl0IHdhcyBkZWZpbmVkIGluIHRoZSBiaW5kIG1ldGhvZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGtleXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24oa2V5cywgYWN0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHNlbGYuYmluZC5jYWxsKHNlbGYsIGtleXMsIGZ1bmN0aW9uKCkge30sIGFjdGlvbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHRyaWdnZXJzIGFuIGV2ZW50IHRoYXQgaGFzIGFscmVhZHkgYmVlbiBib3VuZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGFjdGlvblxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbihrZXlzLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5fZGlyZWN0TWFwW2tleXMgKyAnOicgKyBhY3Rpb25dKSB7XG4gICAgICAgICAgICBzZWxmLl9kaXJlY3RNYXBba2V5cyArICc6JyArIGFjdGlvbl0oe30sIGtleXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZXNldHMgdGhlIGxpYnJhcnkgYmFjayB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gIHRoaXMgaXMgdXNlZnVsXG4gICAgICogaWYgeW91IHdhbnQgdG8gY2xlYXIgb3V0IHRoZSBjdXJyZW50IGtleWJvYXJkIHNob3J0Y3V0cyBhbmQgYmluZFxuICAgICAqIG5ldyBvbmVzIC0gZm9yIGV4YW1wbGUgaWYgeW91IHN3aXRjaCB0byBhbm90aGVyIHBhZ2VcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5fY2FsbGJhY2tzID0ge307XG4gICAgICAgIHNlbGYuX2RpcmVjdE1hcCA9IHt9O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogc2hvdWxkIHdlIHN0b3AgdGhpcyBldmVudCBiZWZvcmUgZmlyaW5nIG9mZiBjYWxsYmFja3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuc3RvcENhbGxiYWNrID0gZnVuY3Rpb24oZSwgZWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLy8gaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBjbGFzcyBcIm1vdXNldHJhcFwiIHRoZW4gbm8gbmVlZCB0byBzdG9wXG4gICAgICAgIGlmICgoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyBtb3VzZXRyYXAgJykgPiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9iZWxvbmdzVG8oZWxlbWVudCwgc2VsZi50YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9wIGZvciBpbnB1dCwgc2VsZWN0LCBhbmQgdGV4dGFyZWFcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PSAnSU5QVVQnIHx8IGVsZW1lbnQudGFnTmFtZSA9PSAnU0VMRUNUJyB8fCBlbGVtZW50LnRhZ05hbWUgPT0gJ1RFWFRBUkVBJyB8fCBlbGVtZW50LmlzQ29udGVudEVkaXRhYmxlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBleHBvc2VzIF9oYW5kbGVLZXkgcHVibGljbHkgc28gaXQgY2FuIGJlIG92ZXJ3cml0dGVuIGJ5IGV4dGVuc2lvbnNcbiAgICAgKi9cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLmhhbmRsZUtleSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBzZWxmLl9oYW5kbGVLZXkuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogYWxsb3cgY3VzdG9tIGtleSBtYXBwaW5nc1xuICAgICAqL1xuICAgIE1vdXNldHJhcC5hZGRLZXljb2RlcyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBfTUFQW2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfUkVWRVJTRV9NQVAgPSBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0IHRoZSBnbG9iYWwgbW91c2V0cmFwIGZ1bmN0aW9uc1xuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgaXMgbmVlZGVkIHRvIGFsbG93IHRoZSBnbG9iYWwgbW91c2V0cmFwIGZ1bmN0aW9ucyB0byB3b3JrXG4gICAgICogbm93IHRoYXQgbW91c2V0cmFwIGlzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICovXG4gICAgTW91c2V0cmFwLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRvY3VtZW50TW91c2V0cmFwID0gTW91c2V0cmFwKGRvY3VtZW50KTtcbiAgICAgICAgZm9yICh2YXIgbWV0aG9kIGluIGRvY3VtZW50TW91c2V0cmFwKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kLmNoYXJBdCgwKSAhPT0gJ18nKSB7XG4gICAgICAgICAgICAgICAgTW91c2V0cmFwW21ldGhvZF0gPSAoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudE1vdXNldHJhcFttZXRob2RdLmFwcGx5KGRvY3VtZW50TW91c2V0cmFwLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gKG1ldGhvZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIE1vdXNldHJhcC5pbml0KCk7XG5cbiAgICAvLyBleHBvc2UgbW91c2V0cmFwIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgd2luZG93Lk1vdXNldHJhcCA9IE1vdXNldHJhcDtcblxuICAgIC8vIGV4cG9zZSBhcyBhIGNvbW1vbiBqcyBtb2R1bGVcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBNb3VzZXRyYXA7XG4gICAgfVxuXG4gICAgLy8gZXhwb3NlIG1vdXNldHJhcCBhcyBhbiBBTUQgbW9kdWxlXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTW91c2V0cmFwO1xuICAgICAgICB9KTtcbiAgICB9XG59KSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsLCB0eXBlb2YgIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IG51bGwpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gRDovd2FtcC93d3cvSGFja2FQYW5lbC9+L21vdXNldHJhcC9tb3VzZXRyYXAuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=