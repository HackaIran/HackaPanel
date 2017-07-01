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

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Editor = __webpack_require__(1);
	var Leaderboard = __webpack_require__(2);
	var UI = __webpack_require__(4);
	var Socket = __webpack_require__(6);
	
	window.$ = function (query) {
	    return document.querySelector(query);
	};
	window.$$ = function (query) {
	    return document.querySelectorAll(query);
	};
	
	var App = function App() {
	    _classCallCheck(this, App);
	
	    this.editor = new Editor("editor");
	    this.leaderboard = new Leaderboard(".ranks");
	    this.ui = new UI(this);
	    this.socket = new Socket(this, '/');
	};
	
	window.app = new App();

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Team = __webpack_require__(3);
	
	var Leaderboard = function () {
	    function Leaderboard(query) {
	        _classCallCheck(this, Leaderboard);
	
	        this.list = $(query);
	        this.teams = [];
	    }
	
	    _createClass(Leaderboard, [{
	        key: "addTeam",
	        value: function addTeam(id, name, score) {
	            var team = new Team(this, id, name, score);
	            this.list.appendChild(team.element);
	            this.teams.push(team);
	            return team.element;
	        }
	    }, {
	        key: "getTeamById",
	        value: function getTeamById(id) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this.teams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var team = _step.value;
	                    if (team.id == id) return team;
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
	    }]);
	
	    return Leaderboard;
	}();
	
	module.exports = Leaderboard;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Team = function () {
	    function Team(leaderboard, id, name, score) {
	        _classCallCheck(this, Team);
	
	        this.leaderboard = leaderboard;
	        this.id = id;
	        this.name = name;
	        this.score = score;
	        this.element = this.defineElement();
	        this.scoreElement = this.element.querySelector(".score");
	        this.progressElement = this.element.querySelector(".progress");
	    }
	
	    _createClass(Team, [{
	        key: "defineElement",
	        value: function defineElement() {
	            var li = document.createElement("li");
	            li.innerHTML = "<span class=\"name\">" + this.name + "</span>\n                        <span class=\"score\">" + this.score + "</span>\n                        <div class=\"progress\"></div>";
	            return li;
	        }
	    }, {
	        key: "setScore",
	        value: function setScore(score) {
	            this.score = score;
	            this.scoreElement.innerHTML = score;
	        }
	    }, {
	        key: "setProgress",
	        value: function setProgress(percent) {
	            this.progressElement.style.width = percent + "%";
	        }
	    }]);
	
	    return Team;
	}();
	
	module.exports = Team;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tabs = __webpack_require__(5);
	
	var UI = function () {
	    function UI(app) {
	        _classCallCheck(this, UI);
	
	        this.app = app;
	        this.tabs = new Tabs();
	    }
	
	    _createClass(UI, [{
	        key: "setTimer",
	        value: function setTimer(seconds) {
	            var secs = seconds % 60;
	            var mins = (seconds - secs) / 60;
	            if (secs < 10) secs = "0" + secs;
	            $("header > time").innerHTML = mins + ":" + secs;
	        }
	    }]);
	
	    return UI;
	}();
	
	module.exports = UI;

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Socket = function () {
	    function Socket(app, address) {
	        var _this = this;
	
	        _classCallCheck(this, Socket);
	
	        this.app = app;
	        this.socket = io.connect(address);
	        this.socket.on('time-sync', this.onTimeSync.bind(this));
	        this._connected = true;
	        this.testConnectionInterval = setTimeout(function () {
	            return _this.isConnected = false;
	        }, 5000);
	    }
	
	    _createClass(Socket, [{
	        key: "onTimeSync",
	        value: function onTimeSync(seconds) {
	            this.app.ui.setTimer(seconds);
	            this.checkConnectionOnTimerSynced();
	        }
	    }, {
	        key: "checkConnectionOnTimerSynced",
	        value: function checkConnectionOnTimerSynced() {
	            var _this2 = this;
	
	            this.isConnected = true;
	            clearTimeout(this.testConnectionInterval);
	            this.testConnectionInterval = setTimeout(function () {
	                return _this2.isConnected = false;
	            }, 5000);
	        }
	    }, {
	        key: "onConnectionFound",
	        value: function onConnectionFound() {
	            console.log("Connection Found!");
	        }
	    }, {
	        key: "onConnectionLost",
	        value: function onConnectionLost() {
	            console.log("Connection Lost!");
	        }
	    }, {
	        key: "isConnected",
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzIwNWY5YjRiN2IxMmQxZjU3YjkiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9FZGl0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vTGVhZGVyYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vVGVhbS5qcyIsIndlYnBhY2s6Ly8vLi9VSS5qcyIsIndlYnBhY2s6Ly8vLi9UYWJzLmpzIiwid2VicGFjazovLy8uL1NvY2tldC5qcyJdLCJuYW1lcyI6WyJFZGl0b3IiLCJyZXF1aXJlIiwiTGVhZGVyYm9hcmQiLCJVSSIsIlNvY2tldCIsIndpbmRvdyIsIiQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeSIsIiQkIiwicXVlcnlTZWxlY3RvckFsbCIsIkFwcCIsImVkaXRvciIsImxlYWRlcmJvYXJkIiwidWkiLCJzb2NrZXQiLCJhcHAiLCJpZCIsImFjZSIsImVkaXQiLCJzZXNzaW9uIiwiZ2V0U2Vzc2lvbiIsInNldFRhYlNpemUiLCJzZXRPcHRpb25zIiwiZW5hYmxlQmFzaWNBdXRvY29tcGxldGlvbiIsImVuYWJsZUxpdmVBdXRvY29tcGxldGlvbiIsInNldFRoZW1lIiwic2V0TGFuZyIsInJlbWVtYmVyIiwib24iLCJvbkNoYW5nZSIsImJpbmQiLCJsb2NhbFN0b3JhZ2UiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsInRoZW1lIiwibGFuZyIsInNldE1vZGUiLCJnZXRWYWx1ZSIsInZhbCIsInNldFZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyIsIlRlYW0iLCJsaXN0IiwidGVhbXMiLCJuYW1lIiwic2NvcmUiLCJ0ZWFtIiwiYXBwZW5kQ2hpbGQiLCJlbGVtZW50IiwicHVzaCIsImRlZmluZUVsZW1lbnQiLCJzY29yZUVsZW1lbnQiLCJwcm9ncmVzc0VsZW1lbnQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJwZXJjZW50Iiwic3R5bGUiLCJ3aWR0aCIsIlRhYnMiLCJ0YWJzIiwic2Vjb25kcyIsInNlY3MiLCJtaW5zIiwidGFiIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbGVjdCIsImUiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJ0cnlUb1JlbWVtYmVyIiwid2hpY2giLCJwYWdlIiwiZGlzcGxheSIsIml0ZW0iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzdG9yZUxhc3RUYWJTZWxlY3RlZCIsImFkZHJlc3MiLCJpbyIsImNvbm5lY3QiLCJvblRpbWVTeW5jIiwiX2Nvbm5lY3RlZCIsInRlc3RDb25uZWN0aW9uSW50ZXJ2YWwiLCJzZXRUaW1lb3V0IiwiaXNDb25uZWN0ZWQiLCJzZXRUaW1lciIsImNoZWNrQ29ubmVjdGlvbk9uVGltZXJTeW5jZWQiLCJjbGVhclRpbWVvdXQiLCJjb25zb2xlIiwibG9nIiwic2hvdWxkQ29ubmVjdCIsIm9uQ29ubmVjdGlvbkZvdW5kIiwib25Db25uZWN0aW9uTG9zdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBLEtBQU1BLFNBQVMsbUJBQUFDLENBQVEsQ0FBUixDQUFmO0FBQ0EsS0FBTUMsY0FBYyxtQkFBQUQsQ0FBUSxDQUFSLENBQXBCO0FBQ0EsS0FBTUUsS0FBSyxtQkFBQUYsQ0FBUSxDQUFSLENBQVg7QUFDQSxLQUFNRyxTQUFTLG1CQUFBSCxDQUFRLENBQVIsQ0FBZjs7QUFFQUksUUFBT0MsQ0FBUCxHQUFXO0FBQUEsWUFBU0MsU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsQ0FBVDtBQUFBLEVBQVg7QUFDQUosUUFBT0ssRUFBUCxHQUFZO0FBQUEsWUFBU0gsU0FBU0ksZ0JBQVQsQ0FBMEJGLEtBQTFCLENBQVQ7QUFBQSxFQUFa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LEVBQVM7QUFDakIsa0JBQUsvQyxHQUFMLENBQVNGLEVBQVQsQ0FBWTJFLFFBQVosQ0FBcUIxQixPQUFyQjtBQUNBLGtCQUFLMkIsNEJBQUw7QUFDSDs7O3dEQUMrQjtBQUFBOztBQUM1QixrQkFBS0YsV0FBTCxHQUFtQixJQUFuQjtBQUNBRywwQkFBYSxLQUFLTCxzQkFBbEI7QUFDQSxrQkFBS0Esc0JBQUwsR0FBOEJDLFdBQVc7QUFBQSx3QkFBTSxPQUFLQyxXQUFMLEdBQW1CLEtBQXpCO0FBQUEsY0FBWCxFQUEyQyxJQUEzQyxDQUE5QjtBQUNIOzs7NkNBU29CO0FBQ2pCSSxxQkFBUUMsR0FBUixDQUFZLG1CQUFaO0FBQ0g7Ozs0Q0FDbUI7QUFDaEJELHFCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDSDs7OzZCQWJrQjtBQUNmLG9CQUFPLEtBQUtSLFVBQVo7QUFDSCxVOzJCQUNnQlMsYSxFQUFlO0FBQzVCLGlCQUFJLENBQUMsS0FBS1QsVUFBTixJQUFvQlMsYUFBeEIsRUFBdUMsS0FBS0MsaUJBQUwsR0FBdkMsS0FDSyxJQUFJLEtBQUtWLFVBQUwsSUFBbUIsQ0FBQ1MsYUFBeEIsRUFBdUMsS0FBS0UsZ0JBQUw7QUFDNUMsa0JBQUtYLFVBQUwsR0FBa0JTLGFBQWxCO0FBQ0g7Ozs7OztBQVNMckQsUUFBT0MsT0FBUCxHQUFpQnZDLE1BQWpCLEMiLCJmaWxlIjoiLi9kaXN0L21haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzIwNWY5YjRiN2IxMmQxZjU3YjkiLCJjb25zdCBFZGl0b3IgPSByZXF1aXJlKFwiLi9FZGl0b3JcIilcbmNvbnN0IExlYWRlcmJvYXJkID0gcmVxdWlyZShcIi4vTGVhZGVyYm9hcmRcIilcbmNvbnN0IFVJID0gcmVxdWlyZShcIi4vVUlcIilcbmNvbnN0IFNvY2tldCA9IHJlcXVpcmUoXCIuL1NvY2tldFwiKVxuXG53aW5kb3cuJCA9IHF1ZXJ5ID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpXG53aW5kb3cuJCQgPSBxdWVyeSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KVxuXG5jbGFzcyBBcHAge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBuZXcgRWRpdG9yKFwiZWRpdG9yXCIpXG4gICAgICAgIHRoaXMubGVhZGVyYm9hcmQgPSBuZXcgTGVhZGVyYm9hcmQoXCIucmFua3NcIilcbiAgICAgICAgdGhpcy51aSA9IG5ldyBVSSh0aGlzKVxuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgJy8nKVxuICAgIH1cbn1cblxud2luZG93LmFwcCA9IG5ldyBBcHAoKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21haW4uanMiLCJjbGFzcyBFZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IgKGlkKSB7XHJcbiAgICAgICAgYWNlLnJlcXVpcmUoXCJhY2UvZXh0L2xhbmd1YWdlX3Rvb2xzXCIpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yID0gYWNlLmVkaXQoaWQpO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKVxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXRUYWJTaXplKDQpO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldE9wdGlvbnMoe1xyXG4gICAgICAgICAgICBlbmFibGVCYXNpY0F1dG9jb21wbGV0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBlbmFibGVMaXZlQXV0b2NvbXBsZXRpb246IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldFRoZW1lKFwiY2xvdWRzXCIpXHJcbiAgICAgICAgdGhpcy5zZXRMYW5nKFwiamF2YXNjcmlwdFwiKVxyXG4gICAgICAgIHRoaXMucmVtZW1iZXIoKVxyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5vbihcImNoYW5nZVwiLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpXHJcbiAgICB9XHJcbiAgICByZW1lbWJlciAoKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2NvZGUnXSAhPT0gdW5kZWZpbmVkKSB0aGlzLnZhbHVlID0gd2luZG93LmxvY2FsU3RvcmFnZVsnY29kZSddXHJcbiAgICB9XHJcbiAgICBzZXRUaGVtZSAodGhlbWUpIHtcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRUaGVtZShcImFjZS90aGVtZS9cIiArIHRoZW1lKTtcclxuICAgIH1cclxuICAgIHNldExhbmcgKGxhbmcpIHtcclxuICAgICAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShcImFjZS9tb2RlL1wiICsgbGFuZyk7XHJcbiAgICB9XHJcbiAgICBnZXQgdmFsdWUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uZ2V0VmFsdWUoKVxyXG4gICAgfVxyXG4gICAgc2V0IHZhbHVlICh2YWwpIHtcclxuICAgICAgICB0aGlzLnNlc3Npb24uc2V0VmFsdWUodmFsKVxyXG4gICAgfVxyXG4gICAgb25DaGFuZ2UgKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2NvZGUnXSA9IHRoaXMudmFsdWVcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9FZGl0b3IuanMiLCJjb25zdCBUZWFtID0gcmVxdWlyZShcIi4vVGVhbVwiKVxyXG5cclxuY2xhc3MgTGVhZGVyYm9hcmQge1xyXG4gICAgY29uc3RydWN0b3IgKHF1ZXJ5KSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gJChxdWVyeSlcclxuICAgICAgICB0aGlzLnRlYW1zID0gW11cclxuICAgIH1cclxuICAgIGFkZFRlYW0gKGlkLCBuYW1lLCBzY29yZSkge1xyXG4gICAgICAgIGNvbnN0IHRlYW0gPSBuZXcgVGVhbSh0aGlzLCBpZCwgbmFtZSwgc2NvcmUpXHJcbiAgICAgICAgdGhpcy5saXN0LmFwcGVuZENoaWxkKHRlYW0uZWxlbWVudClcclxuICAgICAgICB0aGlzLnRlYW1zLnB1c2godGVhbSlcclxuICAgICAgICByZXR1cm4gdGVhbS5lbGVtZW50XHJcbiAgICB9XHJcbiAgICBnZXRUZWFtQnlJZCAoaWQpIHtcclxuICAgICAgICBmb3IgKGxldCB0ZWFtIG9mIHRoaXMudGVhbXMpIGlmICh0ZWFtLmlkID09IGlkKSByZXR1cm4gdGVhbVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGVhZGVyYm9hcmRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9MZWFkZXJib2FyZC5qcyIsImNsYXNzIFRlYW0ge1xyXG4gICAgY29uc3RydWN0b3IgKGxlYWRlcmJvYXJkLCBpZCwgbmFtZSwgc2NvcmUpIHtcclxuICAgICAgICB0aGlzLmxlYWRlcmJvYXJkID0gbGVhZGVyYm9hcmRcclxuICAgICAgICB0aGlzLmlkID0gaWRcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5kZWZpbmVFbGVtZW50KClcclxuICAgICAgICB0aGlzLnNjb3JlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlXCIpXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0VsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKVxyXG4gICAgfVxyXG4gICAgZGVmaW5lRWxlbWVudCAoKSB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJuYW1lXCI+JHt0aGlzLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNjb3JlXCI+JHt0aGlzLnNjb3JlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+YFxyXG4gICAgICAgIHJldHVybiBsaTtcclxuICAgIH1cclxuICAgIHNldFNjb3JlIChzY29yZSkge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZVxyXG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50LmlubmVySFRNTCA9IHNjb3JlXHJcbiAgICB9XHJcbiAgICBzZXRQcm9ncmVzcyAocGVyY2VudCkge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NFbGVtZW50LnN0eWxlLndpZHRoID0gcGVyY2VudCArIFwiJVwiXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGVhbVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL1RlYW0uanMiLCJjb25zdCBUYWJzID0gcmVxdWlyZShcIi4vVGFic1wiKVxyXG5cclxuY2xhc3MgVUkge1xyXG4gICAgY29uc3RydWN0b3IgKGFwcCkge1xyXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXHJcbiAgICAgICAgdGhpcy50YWJzID0gbmV3IFRhYnNcclxuICAgIH1cclxuICAgIHNldFRpbWVyIChzZWNvbmRzKSB7XHJcbiAgICAgICAgbGV0IHNlY3MgPSBzZWNvbmRzICUgNjBcclxuICAgICAgICBsZXQgbWlucyA9IChzZWNvbmRzIC0gc2VjcykgLyA2MFxyXG4gICAgICAgIGlmIChzZWNzIDwgMTApIHNlY3MgPSBcIjBcIiArIHNlY3NcclxuICAgICAgICAkKFwiaGVhZGVyID4gdGltZVwiKS5pbm5lckhUTUwgPSBtaW5zICsgXCI6XCIgKyBzZWNzXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVUlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9VSS5qcyIsImNsYXNzIFRhYnMge1xyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIGNvbnN0IHRhYnMgPSAkJChcImJvZHkgPiBtYWluID4gc2VjdGlvbiA+IG5hdiA+IGxpXCIpXHJcbiAgICAgICAgZm9yIChsZXQgdGFiIG9mIHRhYnMpIHtcclxuICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHRoaXMuc2VsZWN0KGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtcGFnZVwiKSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJ5VG9SZW1lbWJlcigpXHJcbiAgICB9XHJcbiAgICB0cnlUb1JlbWVtYmVyICgpIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlWyd0YWItc2VsZWN0ZWQnXSAhPT0gdW5kZWZpbmVkKSB0aGlzLnNlbGVjdChsb2NhbFN0b3JhZ2VbJ3RhYi1zZWxlY3RlZCddKVxyXG4gICAgICAgIGVsc2UgdGhpcy5zZWxlY3QoXCJjaGFsbGVuZ2VcIilcclxuICAgIH1cclxuICAgIHN0b3JlTGFzdFRhYlNlbGVjdGVkICh3aGljaCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZVsndGFiLXNlbGVjdGVkJ10gPSB3aGljaFxyXG4gICAgfVxyXG4gICAgc2VsZWN0ICh3aGljaCkge1xyXG4gICAgICAgIC8vIHNob3cgdGhlIHNlbGVjdGVkIHRhYiBhbmQgaGlkZSB0aGUgb3RoZXJzXHJcbiAgICAgICAgZm9yIChsZXQgcGFnZSBvZiAkJChcIi50YWItcGFnZVwiKSkgcGFnZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAkKFwiLnRhYi1wYWdlI1wiICsgd2hpY2gpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIlxyXG4gICAgICAgIC8vIGRlYWN0aXZlIGFsbCBpdGVtcyBidXQgdGhlIHNlbGVjdGVkIGl0ZW0sIGFuZCBtYWtlIGl0IGFjdGl2ZVxyXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiAkJChgYm9keSA+IG1haW4gPiBzZWN0aW9uID4gbmF2ID4gbGlgKSkgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgJChgYm9keSA+IG1haW4gPiBzZWN0aW9uID4gbmF2ID4gbGk6bm90KC5zdWJtaXQpW2RhdGEtcGFnZT1cIiR7d2hpY2h9XCJdYCkuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgICAgIC8vIFN0b3JlXHJcbiAgICAgICAgdGhpcy5zdG9yZUxhc3RUYWJTZWxlY3RlZCh3aGljaClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYWJzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGFicy5qcyIsImNsYXNzIFNvY2tldCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwLCBhZGRyZXNzKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcclxuICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoYWRkcmVzcylcclxuICAgICAgICB0aGlzLnNvY2tldC5vbigndGltZS1zeW5jJywgdGhpcy5vblRpbWVTeW5jLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMudGVzdENvbm5lY3Rpb25JbnRlcnZhbCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc0Nvbm5lY3RlZCA9IGZhbHNlLCA1MDAwKVxyXG4gICAgfVxyXG4gICAgb25UaW1lU3luYyAoc2Vjb25kcykge1xyXG4gICAgICAgIHRoaXMuYXBwLnVpLnNldFRpbWVyKHNlY29uZHMpXHJcbiAgICAgICAgdGhpcy5jaGVja0Nvbm5lY3Rpb25PblRpbWVyU3luY2VkKClcclxuICAgIH1cclxuICAgIGNoZWNrQ29ubmVjdGlvbk9uVGltZXJTeW5jZWQgKCkge1xyXG4gICAgICAgIHRoaXMuaXNDb25uZWN0ZWQgPSB0cnVlXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGVzdENvbm5lY3Rpb25JbnRlcnZhbClcclxuICAgICAgICB0aGlzLnRlc3RDb25uZWN0aW9uSW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaXNDb25uZWN0ZWQgPSBmYWxzZSwgNTAwMClcclxuICAgIH1cclxuICAgIGdldCBpc0Nvbm5lY3RlZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZFxyXG4gICAgfVxyXG4gICAgc2V0IGlzQ29ubmVjdGVkIChzaG91bGRDb25uZWN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb25uZWN0ZWQgJiYgc2hvdWxkQ29ubmVjdCkgdGhpcy5vbkNvbm5lY3Rpb25Gb3VuZCgpXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fY29ubmVjdGVkICYmICFzaG91bGRDb25uZWN0KSB0aGlzLm9uQ29ubmVjdGlvbkxvc3QoKVxyXG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IHNob3VsZENvbm5lY3RcclxuICAgIH1cclxuICAgIG9uQ29ubmVjdGlvbkZvdW5kICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gRm91bmQhXCIpXHJcbiAgICB9XHJcbiAgICBvbkNvbm5lY3Rpb25Mb3N0ICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gTG9zdCFcIilcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb2NrZXRcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9Tb2NrZXQuanMiXSwic291cmNlUm9vdCI6IiJ9