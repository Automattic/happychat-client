'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mockLocalize = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _interpolateComponents = require('interpolate-components');

var _interpolateComponents2 = _interopRequireDefault(_interpolateComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */


var mockLocalize = exports.mockLocalize = function mockLocalize(ComposedComponent) {
	return function (_Component) {
		_inherits(_class, _Component);

		function _class() {
			_classCallCheck(this, _class);

			return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
		}

		_createClass(_class, [{
			key: 'translate',
			value: function translate(msg, options) {
				var translatedMsg = msg;
				if ((0, _get2.default)(options, 'args', false)) {
					translatedMsg = msg.replace('%s', options.args);
				}
				if ((0, _get2.default)(options, 'components', false)) {
					translatedMsg = (0, _interpolateComponents2.default)({
						mixedString: translatedMsg,
						components: options.components
					});
				}
				return translatedMsg;
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(ComposedComponent, _extends({}, this.props, { translate: this.translate }));
			}
		}]);

		return _class;
	}(_react.Component);
};