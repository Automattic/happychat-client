'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */

var FormTextInput = function (_PureComponent) {
	_inherits(FormTextInput, _PureComponent);

	function FormTextInput() {
		_classCallCheck(this, FormTextInput);

		var _this = _possibleConstructorReturn(this, (FormTextInput.__proto__ || Object.getPrototypeOf(FormTextInput)).apply(this, arguments));

		_this.selectOnFocus = _this.selectOnFocus.bind(_this);
		return _this;
	}

	_createClass(FormTextInput, [{
		key: 'focus',
		value: function focus() {
			this.refs.textField.focus();
		}
	}, {
		key: 'selectOnFocus',
		value: function selectOnFocus(event) {
			if (this.props.selectOnFocus) {
				event.target.select();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var inputRef = this.props.inputRef;

			var props = (0, _omit2.default)(this.props, 'isError', 'isValid', 'selectOnFocus', 'inputRef');

			var classes = (0, _classnames2.default)('form-text-input', this.props.className, {
				'is-error': this.props.isError,
				'is-valid': this.props.isValid
			});

			return _react2.default.createElement('input', _extends({
				type: 'text'
			}, props, {
				ref: inputRef || 'textField',
				className: classes,
				onClick: this.selectOnFocus
			}));
		}
	}]);

	return FormTextInput;
}(_react.PureComponent);

FormTextInput.propTypes = {
	isError: _propTypes2.default.bool,
	isValid: _propTypes2.default.bool,
	selectOnFocus: _propTypes2.default.bool,
	className: _propTypes2.default.string
};
exports.default = FormTextInput;