'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _constants = require('src/state/constants');

var _isAvailable = require('../is-available');

var _isAvailable2 = _interopRequireDefault(_isAvailable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
describe('#isAvailable', function () {
	it("should be false if there's no active connection", function () {
		var state = (0, _deepFreeze2.default)({
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED,
				isAvailable: true
			}
		});
		expect((0, _isAvailable2.default)(state)).toBeFalsy();
	});

	it("should be false if Happychat isn't accepting new connections", function () {
		var state = (0, _deepFreeze2.default)({
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
				isAvailable: false
			}
		});
		expect((0, _isAvailable2.default)(state)).toBeFalsy();
	});

	it("should be true when there's a connection and connections are being accepted", function () {
		var state = (0, _deepFreeze2.default)({
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
				isAvailable: true
			}
		});
		expect((0, _isAvailable2.default)(state)).toBeTruthy();
	});
}); /** @format */

/**
 * External dependencies
 */