'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setUrlScheme = exports.addSchemeIfMissing = undefined;

var _startsWith = require('lodash/startsWith');

var _startsWith2 = _interopRequireDefault(_startsWith);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schemeRegex = /^\w+:\/\//; /** @format */

/**
 * External dependencies
 */
var addSchemeIfMissing = exports.addSchemeIfMissing = function addSchemeIfMissing(url, scheme) {
	if (false === schemeRegex.test(url)) {
		return scheme + '://' + url;
	}
	return url;
};

var setUrlScheme = exports.setUrlScheme = function setUrlScheme(url, scheme) {
	var schemeWithSlashes = scheme + '://';
	if ((0, _startsWith2.default)(url, schemeWithSlashes)) {
		return url;
	}

	var newUrl = addSchemeIfMissing(url, scheme);
	if (newUrl !== url) {
		return newUrl;
	}

	return url.replace(schemeRegex, schemeWithSlashes);
};