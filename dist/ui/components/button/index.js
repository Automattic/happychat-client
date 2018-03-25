'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _compact = require('lodash/compact');

var _compact2 = _interopRequireDefault(_compact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */

var Button = function (_PureComponent) {
	_inherits(Button, _PureComponent);

	function Button() {
		_classCallCheck(this, Button);

		return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	}

	_createClass(Button, [{
		key: 'render',
		value: function render() {
			var omitProps = ['compact', 'primary', 'scary', 'busy', 'borderless'];

			var tag = void 0;
			if (this.props.href) {
				tag = 'a';
				omitProps.push('type');
			} else {
				tag = 'button';
				omitProps.push('target', 'rel');
			}

			var props = (0, _omit2.default)(this.props, omitProps);

			// Block referrers when external link
			if (props.target) {
				props.rel = (0, _uniq2.default)((0, _compact2.default)([].concat(_toConsumableArray((props.rel || '').split(' ')), ['noopener', 'noreferrer']))).join(' ');
			}

			return (0, _react.createElement)(tag, _extends({}, props, {
				className: (0, _classnames2.default)('button', this.props.className, {
					'is-compact': this.props.compact,
					'is-primary': this.props.primary,
					'is-scary': this.props.scary,
					'is-busy': this.props.busy,
					'is-borderless': this.props.borderless
				})
			}));
		}
	}]);

	return Button;
}(_react.PureComponent);

Button.propTypes = {
	compact: _propTypes2.default.bool,
	primary: _propTypes2.default.bool,
	scary: _propTypes2.default.bool,
	busy: _propTypes2.default.bool,
	type: _propTypes2.default.string,
	href: _propTypes2.default.string,
	borderless: _propTypes2.default.bool,
	target: _propTypes2.default.string,
	rel: _propTypes2.default.string
};
Button.defaultProps = {
	type: 'button'
};
exports.default = Button;