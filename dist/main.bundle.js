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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Editor = __webpack_require__(1);
	var Leaderboard = __webpack_require__(2);
	
	var App = function () {
	    function App() {
	        _classCallCheck(this, App);
	
	        this.editor = new Editor("editor");
	        this.leaderboard = new Leaderboard(".ranks");
	    }
	
	    _createClass(App, [{
	        key: "initEditor",
	        value: function initEditor() {}
	    }]);
	
	    return App;
	}();
	
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
	
	        this.list = document.querySelector(query);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmJkOTI3MTMyOGUwMmQwZTcyNGYiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9FZGl0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vTGVhZGVyYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vVGVhbS5qcyJdLCJuYW1lcyI6WyJFZGl0b3IiLCJyZXF1aXJlIiwiTGVhZGVyYm9hcmQiLCJBcHAiLCJlZGl0b3IiLCJsZWFkZXJib2FyZCIsIndpbmRvdyIsImFwcCIsImlkIiwiYWNlIiwiZWRpdCIsInNlc3Npb24iLCJnZXRTZXNzaW9uIiwic2V0VGFiU2l6ZSIsInNldE9wdGlvbnMiLCJlbmFibGVCYXNpY0F1dG9jb21wbGV0aW9uIiwiZW5hYmxlTGl2ZUF1dG9jb21wbGV0aW9uIiwic2V0VGhlbWUiLCJzZXRMYW5nIiwicmVtZW1iZXIiLCJvbiIsIm9uQ2hhbmdlIiwiYmluZCIsImxvY2FsU3RvcmFnZSIsInVuZGVmaW5lZCIsInZhbHVlIiwidGhlbWUiLCJsYW5nIiwic2V0TW9kZSIsImdldFZhbHVlIiwidmFsIiwic2V0VmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIiwiVGVhbSIsInF1ZXJ5IiwibGlzdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRlYW1zIiwibmFtZSIsInNjb3JlIiwidGVhbSIsImFwcGVuZENoaWxkIiwiZWxlbWVudCIsInB1c2giLCJkZWZpbmVFbGVtZW50Iiwic2NvcmVFbGVtZW50IiwicHJvZ3Jlc3NFbGVtZW50IiwibGkiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwicGVyY2VudCIsInN0eWxlIiwid2lkdGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtB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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVoQjs7Ozs7O0FBSUxWLFFBQU9DLE9BQVAsR0FBaUIvQixXQUFqQixDOzs7Ozs7Ozs7Ozs7S0NuQk1nQyxJO0FBQ0YsbUJBQWE3QixXQUFiLEVBQTBCRyxFQUExQixFQUE4QmdDLElBQTlCLEVBQW9DQyxLQUFwQyxFQUEyQztBQUFBOztBQUN2QyxjQUFLcEMsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxjQUFLRyxFQUFMLEdBQVVBLEVBQVY7QUFDQSxjQUFLZ0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsY0FBS0csT0FBTCxHQUFlLEtBQUtFLGFBQUwsRUFBZjtBQUNBLGNBQUtDLFlBQUwsR0FBb0IsS0FBS0gsT0FBTCxDQUFhTixhQUFiLENBQTJCLFFBQTNCLENBQXBCO0FBQ0EsY0FBS1UsZUFBTCxHQUF1QixLQUFLSixPQUFMLENBQWFOLGFBQWIsQ0FBMkIsV0FBM0IsQ0FBdkI7QUFDSDs7Ozt5Q0FDZ0I7QUFDYixpQkFBTVcsS0FBS1osU0FBU2EsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0FELGdCQUFHRSxTQUFILDZCQUFxQyxLQUFLWCxJQUExQywrREFDc0MsS0FBS0MsS0FEM0M7QUFHQSxvQkFBT1EsRUFBUDtBQUNIOzs7a0NBQ1NSLEssRUFBTztBQUNiLGtCQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxrQkFBS00sWUFBTCxDQUFrQkksU0FBbEIsR0FBOEJWLEtBQTlCO0FBQ0g7OztxQ0FDWVcsTyxFQUFTO0FBQ2xCLGtCQUFLSixlQUFMLENBQXFCSyxLQUFyQixDQUEyQkMsS0FBM0IsR0FBbUNGLFVBQVUsR0FBN0M7QUFDSDs7Ozs7O0FBR0xwQixRQUFPQyxPQUFQLEdBQWlCQyxJQUFqQixDIiwiZmlsZSI6Ii4vZGlzdC9tYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJiZDkyNzEzMjhlMDJkMGU3MjRmIiwiY29uc3QgRWRpdG9yID0gcmVxdWlyZShcIi4vRWRpdG9yXCIpXG5jb25zdCBMZWFkZXJib2FyZCA9IHJlcXVpcmUoXCIuL0xlYWRlcmJvYXJkXCIpXG5cbmNsYXNzIEFwcCB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLmVkaXRvciA9IG5ldyBFZGl0b3IoXCJlZGl0b3JcIilcbiAgICAgICAgdGhpcy5sZWFkZXJib2FyZCA9IG5ldyBMZWFkZXJib2FyZChcIi5yYW5rc1wiKVxuICAgIH1cbiAgICBpbml0RWRpdG9yICgpIHtcbiAgICAgICAgXG4gICAgfVxufVxuXG53aW5kb3cuYXBwID0gbmV3IEFwcCgpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbWFpbi5qcyIsImNsYXNzIEVkaXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvciAoaWQpIHtcclxuICAgICAgICBhY2UucmVxdWlyZShcImFjZS9leHQvbGFuZ3VhZ2VfdG9vbHNcIik7XHJcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBhY2UuZWRpdChpZCk7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpXHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLnNldFRhYlNpemUoNCk7XHJcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyh7XHJcbiAgICAgICAgICAgIGVuYWJsZUJhc2ljQXV0b2NvbXBsZXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIGVuYWJsZUxpdmVBdXRvY29tcGxldGlvbjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWUoXCJjbG91ZHNcIilcclxuICAgICAgICB0aGlzLnNldExhbmcoXCJqYXZhc2NyaXB0XCIpXHJcbiAgICAgICAgdGhpcy5yZW1lbWJlcigpXHJcbiAgICAgICAgdGhpcy5zZXNzaW9uLm9uKFwiY2hhbmdlXCIsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSlcclxuICAgIH1cclxuICAgIHJlbWVtYmVyICgpIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZVsnY29kZSddICE9PSB1bmRlZmluZWQpIHRoaXMudmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydjb2RlJ11cclxuICAgIH1cclxuICAgIHNldFRoZW1lICh0aGVtZSkge1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLnNldFRoZW1lKFwiYWNlL3RoZW1lL1wiICsgdGhlbWUpO1xyXG4gICAgfVxyXG4gICAgc2V0TGFuZyAobGFuZykge1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvXCIgKyBsYW5nKTtcclxuICAgIH1cclxuICAgIGdldCB2YWx1ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5nZXRWYWx1ZSgpXHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXRWYWx1ZSh2YWwpXHJcbiAgICB9XHJcbiAgICBvbkNoYW5nZSAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVsnY29kZSddID0gdGhpcy52YWx1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvclxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0VkaXRvci5qcyIsImNvbnN0IFRlYW0gPSByZXF1aXJlKFwiLi9UZWFtXCIpXHJcblxyXG5jbGFzcyBMZWFkZXJib2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvciAocXVlcnkpIHtcclxuICAgICAgICB0aGlzLmxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KVxyXG4gICAgICAgIHRoaXMudGVhbXMgPSBbXVxyXG4gICAgfVxyXG4gICAgYWRkVGVhbSAoaWQsIG5hbWUsIHNjb3JlKSB7XHJcbiAgICAgICAgY29uc3QgdGVhbSA9IG5ldyBUZWFtKHRoaXMsIGlkLCBuYW1lLCBzY29yZSlcclxuICAgICAgICB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQodGVhbS5lbGVtZW50KVxyXG4gICAgICAgIHRoaXMudGVhbXMucHVzaCh0ZWFtKVxyXG4gICAgICAgIHJldHVybiB0ZWFtLmVsZW1lbnRcclxuICAgIH1cclxuICAgIGdldFRlYW1CeUlkIChpZCkge1xyXG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgdGhpcy50ZWFtcykgaWYgKHRlYW0uaWQgPT0gaWQpIHJldHVybiB0ZWFtXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMZWFkZXJib2FyZFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0xlYWRlcmJvYXJkLmpzIiwiY2xhc3MgVGVhbSB7XHJcbiAgICBjb25zdHJ1Y3RvciAobGVhZGVyYm9hcmQsIGlkLCBuYW1lLCBzY29yZSkge1xyXG4gICAgICAgIHRoaXMubGVhZGVyYm9hcmQgPSBsZWFkZXJib2FyZFxyXG4gICAgICAgIHRoaXMuaWQgPSBpZFxyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmVcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmRlZmluZUVsZW1lbnQoKVxyXG4gICAgICAgIHRoaXMuc2NvcmVFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVcIilcclxuICAgICAgICB0aGlzLnByb2dyZXNzRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpXHJcbiAgICB9XHJcbiAgICBkZWZpbmVFbGVtZW50ICgpIHtcclxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxyXG4gICAgICAgIGxpLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIm5hbWVcIj4ke3RoaXMubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2NvcmVcIj4ke3RoaXMuc2NvcmV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5gXHJcbiAgICAgICAgcmV0dXJuIGxpO1xyXG4gICAgfVxyXG4gICAgc2V0U2NvcmUgKHNjb3JlKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlXHJcbiAgICAgICAgdGhpcy5zY29yZUVsZW1lbnQuaW5uZXJIVE1MID0gc2NvcmVcclxuICAgIH1cclxuICAgIHNldFByb2dyZXNzIChwZXJjZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0VsZW1lbnQuc3R5bGUud2lkdGggPSBwZXJjZW50ICsgXCIlXCJcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUZWFtXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vVGVhbS5qcyJdLCJzb3VyY2VSb290IjoiIn0=