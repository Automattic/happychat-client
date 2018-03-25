'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _createConfig = require('../lib/create-config');

var _createConfig2 = _interopRequireDefault(_createConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */
/**
 * External dependencies
 */
var configFile = void 0;

/**
 * Internal dependencies
 */

if ('development' === process.env.NODE_ENV) {
	configFile = require('./development.json');
	try {
		// check if we have local git ignored config and use it to override the development.json
		var localConfig = require('./development.local.json');
		(0, _merge2.default)(configFile, localConfig);
	} catch (e) {}
} else {
	configFile = require('./production.json');
}

exports.default = (0, _createConfig2.default)(configFile);