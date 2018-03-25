'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /** @format */
/**
 * External dependencies
 */


var FormTextarea = function FormTextarea(_ref) {
	var className = _ref.className,
	    isError = _ref.isError,
	    isValid = _ref.isValid,
	    children = _ref.children,
	    otherProps = _objectWithoutProperties(_ref, ['className', 'isError', 'isValid', 'children']);

	return _react2.default.createElement(
		'textarea',
		_extends({}, otherProps, {
			className: (0, _classnames2.default)(className, 'form-textarea', {
				'is-error': isError,
				'is-valid': isValid
			})
		}),
		children
	);
};

exports.default = FormTextarea;