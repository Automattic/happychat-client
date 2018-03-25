'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wpcomXhrRequest = require('wpcom-xhr-request');

var _wpcomXhrRequest2 = _interopRequireDefault(_wpcomXhrRequest);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
var debug = (0, _debug2.default)('happychat-client:standalone:get-wpcom-user');

exports.default = function (accessToken) {
	return new Promise(function (resolve, reject) {
		if (!accessToken) {
			return reject('There is no token');
		}

		debug('Fire request getUser');
		(0, _wpcomXhrRequest2.default)({
			method: 'GET',
			apiNamespace: 'rest/v1',
			path: '/me',
			authToken: accessToken
		}, function (error, body, headers) {
			if (error) {
				debug('Request failed: ', error);
				return reject(error);
			}

			debug('Response: ', body, ' headers ', headers);
			return resolve(body);
		});
	});
};