'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Count = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _localize = require('../localize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /** @format */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


var Count = function Count(_ref) {
	var count = _ref.count,
	    numberFormat = _ref.numberFormat,
	    primary = _ref.primary,
	    inheritProps = _objectWithoutProperties(_ref, ['count', 'numberFormat', 'primary']);

	return (
		// Omit props passed from the `localize` higher-order component that we don't need.
		_react2.default.createElement(
			'span',
			_extends({
				className: (0, _classnames2.default)('count', { 'is-primary': primary })
			}, (0, _omit2.default)(inheritProps, ['translate', 'moment'])),
			numberFormat(count)
		)
	);
};

exports.Count = Count;
Count.propTypes = {
	count: _propTypes2.default.number.isRequired,
	numberFormat: _propTypes2.default.func,
	primary: _propTypes2.default.bool
};

Count.defaultProps = {
	primary: false
};

exports.default = (0, _localize.mockLocalize)(Count);