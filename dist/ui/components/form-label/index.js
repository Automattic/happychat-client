'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @format */

/**
 * External dependencies
 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var renderRequiredBadge = function renderRequiredBadge(translate) {
	return _react2.default.createElement(
		'small',
		{ className: 'form-label__required' },
		translate('Required')
	);
};

var addKeys = function addKeys(elements) {
	return elements.map(function (elem, idx) {
		return (0, _isObject2.default)(elem) ? _extends({}, elem, { key: idx }) : elem;
	});
};

var FormLabel = function FormLabel(_ref) {
	var children = _ref.children,
	    required = _ref.required,
	    translate = _ref.translate,
	    className = _ref.className,
	    extraProps = _objectWithoutProperties(_ref, ['children', 'required', 'translate', 'className']);

	children = _react2.default.Children.toArray(children) || [];
	if (required) {
		children.push(renderRequiredBadge(translate));
	}

	return _react2.default.createElement(
		'label',
		_extends({}, (0, _omit2.default)(extraProps, 'moment', 'numberFormat'), {
			className: (0, _classnames2.default)(className, 'form-label')
		}),
		children.length ? addKeys(children) : null
	);
};

FormLabel.propTypes = {
	required: _propTypes2.default.bool
};

exports.default = FormLabel;