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
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ReactDOM, React, App_1) {
	    "use strict";
	
	    window.addEventListener('load', function (e) {
	        ReactDOM.render(React.createElement(App_1["default"], null), document.querySelector('main'));
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this && this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(4), __webpack_require__(7), __webpack_require__(8), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, VisualKeyboard_1, TextGenerator_1, Statistics_1, React) {
	    "use strict";
	
	    var App = function (_super) {
	        __extends(App, _super);
	        function App() {
	            var _this = this;
	            _super.call(this);
	            this.textGenerator = new TextGenerator_1["default"]();
	            this.keyDown = function (e) {
	                if (e.key !== 'Shift') {
	                    e.preventDefault();
	                    _this.nextLetter(e.key, e.shiftKey);
	                }
	            };
	            this.keyUp = function (e) {
	                _this.setState({ pressedLetter: { char: '', correct: true } });
	            };
	            this.state = {
	                sentence: [],
	                textNext: '',
	                currentLetter: '',
	                letterCompleted: [],
	                pressedLetter: { char: '', correct: true },
	                history: { start: 0, end: 0, typings: [] }
	            };
	            this.next();
	        }
	        App.prototype.shouldComponentUpdate = function (nextProps, nextState) {
	            return this.state.textNext !== nextState.textNext || this.state.currentLetter !== nextState.currentLetter;
	        };
	        App.prototype.next = function () {
	            var _this = this;
	            this.textGenerator.generate().then(function (words) {
	                _this.reset(words);
	            }, function (err) {
	                return console.error(err);
	            });
	        };
	        App.prototype.reset = function (sentence) {
	            if (sentence === void 0) {
	                sentence = this.state.sentence;
	            }
	            this.setState({
	                sentence: sentence,
	                textNext: sentence.join(' ').slice(1),
	                currentLetter: sentence[0][0],
	                letterCompleted: [],
	                pressedLetter: { char: '', correct: true },
	                history: { start: 0, end: 0, typings: [] }
	            });
	            this.on();
	        };
	        App.prototype.nextLetter = function (char, shift) {
	            var currentChar = this.state.currentLetter;
	            var correct = char === currentChar;
	            var letter = this.state.textNext[0];
	            if (this.state.letterCompleted.length === 0) this.state.history.start = Date.now();
	            this.setState({
	                letterCompleted: this.state.letterCompleted.concat({ correct: correct, char: currentChar }),
	                textNext: this.state.textNext.slice(1),
	                currentLetter: letter,
	                pressedLetter: { char: char, correct: correct }
	            });
	            this.state.history.typings.push({ correct: correct, char: char, correctChar: currentChar });
	            if (!this.state.currentLetter) {
	                this.state.history.end = Date.now();
	                this.off();
	            }
	        };
	        App.prototype.render = function () {
	            var _this = this;
	            return React.createElement("div", null, React.createElement("button", { onClick: function () {
	                    return _this.reset();
	                } }, "Reset"), React.createElement("button", { onClick: function () {
	                    return _this.next();
	                } }, "Next"), React.createElement(Statistics_1["default"], { history: this.state.history }), React.createElement("p", { className: 'text' }, this.state.letterCompleted.map(function (letter, key) {
	                return React.createElement("span", { className: 'letter ' + (letter.correct ? 'correct' : 'incorrect'), key: key }, letter.char);
	            }), React.createElement("span", { className: 'current' }, this.state.currentLetter), React.createElement("span", null, this.state.textNext)), React.createElement(VisualKeyboard_1["default"], { currentLetter: this.state.currentLetter }));
	        };
	        App.prototype.on = function () {
	            window.addEventListener('keydown', this.keyDown);
	            window.addEventListener('keyup', this.keyUp);
	        };
	        App.prototype.off = function () {
	            window.removeEventListener('keydown', this.keyDown);
	            window.removeEventListener('keyup', this.keyUp);
	        };
	        return App;
	    }(React.Component);
	    exports.__esModule = true;
	    exports["default"] = App;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this && this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5), __webpack_require__(2), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Key_1, React, keyData_1) {
	    "use strict";
	
	    var VisualKeyboard = function (_super) {
	        __extends(VisualKeyboard, _super);
	        function VisualKeyboard() {
	            _super.apply(this, arguments);
	        }
	        VisualKeyboard.prototype.render = function () {
	            var _this = this;
	            return React.createElement("div", { className: 'keyboard' }, keyData_1.keyboard.map(function (row, i) {
	                return _this.renderRow(row, i);
	            }));
	        };
	        VisualKeyboard.prototype.renderRow = function (row, i) {
	            var _this = this;
	            return React.createElement("div", { key: i, className: 'row' }, row.map(function (name, j) {
	                return _this.renderKey(name, i + ':' + j);
	            }));
	        };
	        VisualKeyboard.prototype.renderKey = function (name, key) {
	            return React.createElement(Key_1.Key, { active: this.isActive(name), key: key, keyName: name });
	        };
	        VisualKeyboard.prototype.isActive = function (name) {
	            var currentLetter = this.props.currentLetter;
	            if (typeof currentLetter !== 'string') return false;
	            return name in keyData_1.specialKeys ? String.fromCharCode(keyData_1.specialKeys[name].charCode) === currentLetter.toUpperCase() : currentLetter.toUpperCase() === name;
	        };
	        return VisualKeyboard;
	    }(React.Component);
	    exports.__esModule = true;
	    exports["default"] = VisualKeyboard;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this && this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, keyData_1) {
	    "use strict";
	
	    var Key = function (_super) {
	        __extends(Key, _super);
	        function Key(props) {
	            _super.call(this);
	            this.props = props;
	            this.setKeyCode();
	        }
	        Key.prototype.setKeyCode = function () {
	            var keyName = this.props.keyName;
	            keyData_1.specialKeys[keyName] && 'charCode' in keyData_1.specialKeys[keyName] ? this.keyCode = keyData_1.specialKeys[keyName].charCode : this.keyCode = keyName.charCodeAt(0);
	        };
	        Key.prototype.render = function () {
	            return React.createElement("div", { className: 'key ' + (this.props.active ? 'active' : ''), style: { minWidth: this.getWidth() } }, this.props.keyName);
	        };
	        Key.prototype.getWidth = function () {
	            var keyName = this.props.keyName;
	            return keyName in keyData_1.specialKeys ? keyData_1.specialKeys[keyName].width * 30 : 30;
	        };
	        Key.prototype.hasSameKeyCode = function (keyCode) {
	            return this.keyCode === keyCode;
	        };
	        Key.prototype.shouldComponentUpdate = function (nextProps) {
	            return this.props.active !== nextProps.active;
	        };
	        return Key;
	    }(React.Component);
	    exports.Key = Key;
	    exports.__esModule = true;
	    exports["default"] = Key;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	
	    exports.keyboard = [['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'], ['CAPSLOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'], ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'], ['FN', 'CTRL', 'SYS', 'ALT', 'SPACE', 'ALT_GR', 'CTRL', 'UP', 'DOWN']];
	    exports.specialKeys = {
	        "'": { charCode: 222, width: 1 },
	        ',': { charCode: 188, width: 1 },
	        '.': { charCode: 190, width: 1 },
	        '/': { charCode: 191, width: 1 },
	        ';': { charCode: 186, width: 1 },
	        'ALT': { charCode: 18, width: 1.5 },
	        'ALT_GR': { charCode: 225, width: 2 },
	        'CAPSLOCK': { charCode: 20, width: 3.4 },
	        'CTRL': { charCode: 17, width: 1.5 },
	        'DELETE': { charCode: 46, width: 1 },
	        'ENTER': { charCode: 13, width: 3 },
	        'FN': { charCode: 0, width: 1 },
	        'SHIFT': { charCode: 16, width: 3.9 },
	        'SPACE': { charCode: 32, width: 6 },
	        'SYS': { charCode: 91, width: 1.5 },
	        'TAB': { charCode: 9, width: 3 },
	        '[': { charCode: 219, width: 1 },
	        '\\': { charCode: 220, width: 2 },
	        ']': { charCode: 221, width: 1 },
	        'UP': { charCode: 33, width: 1 },
	        'DOWN': { charCode: 34, width: 1 }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	
	    var TextGenerator = function () {
	        function TextGenerator() {}
	        TextGenerator.prototype.generate = function () {
	            var xhr = new XMLHttpRequest();
	            var url = 'http://api.wordnik.com:80/v4/words.json/randomWords?';
	            var params = {
	                hasDictionaryDef: false,
	                minCorpusCount: 0,
	                maxCorpusCount: -1,
	                minDictionaryCount: 1,
	                maxDictionaryCount: -1,
	                minLength: 5,
	                maxLength: -1,
	                limit: 10,
	                api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
	            };
	            var urn = Object.keys(params).map(function (key) {
	                return key + '=' + params[key];
	            }).join('&');
	            return new Promise(function (res, rej) {
	                xhr.addEventListener('load', function () {
	                    var response = JSON.parse(xhr.response);
	                    res(response.map(function (data) {
	                        return data.word;
	                    }));
	                });
	                xhr.addEventListener('error', function (err) {
	                    return console.error(err);
	                });
	                xhr.addEventListener('timeout', function (err) {
	                    return console.error(err);
	                });
	                xhr.addEventListener('abort', function (err) {
	                    return console.error(err);
	                });
	                xhr.open('GET', url + urn);
	                xhr.send();
	            });
	        };
	        return TextGenerator;
	    }();
	    exports.__esModule = true;
	    exports["default"] = TextGenerator;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = this && this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React) {
	    "use strict";
	
	    var Statistics = function (_super) {
	        __extends(Statistics, _super);
	        function Statistics() {
	            _super.apply(this, arguments);
	        }
	        Statistics.prototype.render = function () {
	            return React.createElement("div", { className: 'statistics' }, React.createElement("span", { className: 'time' }, "Time: ", this.getTime()), React.createElement("span", { className: 'fails' }, "Fails: ", this.getResult()));
	        };
	        Statistics.prototype.componentDidMount = function () {
	            this.timer();
	        };
	        Statistics.prototype.timer = function () {
	            var _this = this;
	            var _a = this.props.history,
	                start = _a.start,
	                end = _a.end;
	            if (end) return;
	            requestAnimationFrame(function () {
	                if (start) _this.forceUpdate();
	                _this.timer();
	            });
	        };
	        Statistics.prototype.getResult = function () {
	            return this.props.history.typings.filter(function (t) {
	                return !t.correct;
	            }).length;
	        };
	        Statistics.prototype.getTime = function () {
	            var _a = this.props.history,
	                start = _a.start,
	                end = _a.end;
	            return end || !start ? this.format(end - start) : this.format(Date.now() - start);
	        };
	        Statistics.prototype.format = function (ms) {
	            var minutes = ms / 60000 | 0;
	            var seconds = ms / 1000 % 60;
	            return minutes + ':' + seconds.toFixed(1);
	        };
	        return Statistics;
	    }(React.Component);
	    exports.__esModule = true;
	    exports["default"] = Statistics;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map