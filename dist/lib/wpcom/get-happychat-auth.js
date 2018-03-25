'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _wpcomXhrRequest = require('wpcom-xhr-request');

var _wpcomXhrRequest2 = _interopRequireDefault(_wpcomXhrRequest);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _getUser = require('../../state/selectors/get-user');

var _getUser2 = _interopRequireDefault(_getUser);

var _getUserLocale = require('../../state/selectors/get-user-locale');

var _getUserLocale2 = _interopRequireDefault(_getUserLocale);

var _getUserGroups = require('../../state/selectors/get-user-groups');

var _getUserGroups2 = _interopRequireDefault(_getUserGroups);

var _getUserSkills = require('../../state/selectors/get-user-skills');

var _getUserSkills2 = _interopRequireDefault(_getUserSkills);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('happychat-client:wpcom:get-happychat-auth');

/**
 * Internal dependencies
 */
/** @format */

/**
 * External dependencies
 */


var sign = function sign(payload, accessToken) {
	return new Promise(function (resolve, reject) {
		if (!accessToken) {
			return reject('There is no token');
		}

		debug('Fire request sign');
		(0, _wpcomXhrRequest2.default)({
			method: 'POST',
			apiNamespace: 'rest/v1',
			path: '/jwt/sign',
			authToken: accessToken,
			body: { payload: JSON.stringify(payload) }
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

var startSession = function startSession(accessToken) {
	return new Promise(function (resolve, reject) {
		if (!accessToken) {
			return reject('There is no token');
		}

		debug('Fire request startSession');
		(0, _wpcomXhrRequest2.default)({
			method: 'POST',
			apiNamespace: 'rest/v1',
			path: '/happychat/session',
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

/* eslint-disable camelcase */

exports.default = function (state) {
	return function (accessToken) {
		var url = (0, _config2.default)('happychat_url');

		var user = (0, _getUser2.default)(state);
		var locale = (0, _getUserLocale2.default)(state);
		var groups = (0, _getUserGroups2.default)(state);
		var skills = (0, _getUserSkills2.default)(state);
		var signer_user_id = user.ID;
		var geoLocation = void 0;

		return startSession(accessToken).then(function (_ref) {
			var session_id = _ref.session_id,
			    geo_location = _ref.geo_location;

			geoLocation = geo_location;
			return sign({ user: user, session_id: session_id }, accessToken);
		}).then(function (_ref2) {
			var jwt = _ref2.jwt;
			return {
				url: url,
				user: { jwt: jwt, signer_user_id: signer_user_id, locale: locale, groups: groups, skills: skills, geoLocation: geoLocation }
			};
		}).catch(function (e) {
			return Promise.reject('Failed to start an authenticated Happychat session: ' + e);
		});
	};
};
/* eslint-enable camelcase */