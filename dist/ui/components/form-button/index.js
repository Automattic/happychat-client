'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */


var FormButton = function (_React$Component) {
	_inherits(FormButton, _React$Component);

	function FormButton() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, FormButton);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormButton.__proto__ || Object.getPrototypeOf(FormButton)).call.apply(_ref, [this].concat(args))), _this), _this.getDefaultButtonAction = function () {
			return _this.props.isSubmitting ? _this.props.translate('Saving…') : _this.props.translate('Save Settings');
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(FormButton, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    className = _props.className,
			    isPrimary = _props.isPrimary,
			    props = _objectWithoutProperties(_props, ['children', 'className', 'isPrimary']),
			    buttonClasses = (0, _classnames2.default)(className, 'form-button');

			return _react2.default.createElement(
				_button2.default,
				_extends({}, (0, _omit2.default)(props, ['isSubmitting', 'moment', 'numberFormat', 'translate']), {
					primary: isPrimary,
					className: buttonClasses
				}),
				_react.Children.count(children) ? children : this.getDefaultButtonAction()
			);
		}
	}]);

	return FormButton;
}(_react2.default.Component);

FormButton.defaultProps = {
	isSubmitting: false,
	isPrimary: true,
	type: 'submit'
};
exports.default = FormButton;