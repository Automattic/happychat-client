'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _constants = require('src/state/constants');

var _isServerReachable = require('../is-server-reachable');

var _isServerReachable2 = _interopRequireDefault(_isServerReachable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
describe('#isServerReachable', function () {
	it('should return true if there is no error', function () {
		var state = (0, _deepFreeze2.default)({
			connection: {
				error: null
			}
		});
		expect((0, _isServerReachable2.default)(state)).toBeTruthy();
	});

	it('should return true if error is: Forced Close', function () {
		var state = (0, _deepFreeze2.default)({
			connection: {
				error: _constants.HAPPYCHAT_CONNECTION_ERROR_FORCED_CLOSE
			}
		});
		expect((0, _isServerReachable2.default)(state)).toBeTruthy();
	});

	it('should return true if error is: Transport Close', function () {
		var state = (0, _deepFreeze2.default)({
			connection: {
				error: _constants.HAPPYCHAT_CONNECTION_ERROR_TRANSPORT_CLOSE
			}
		});
		expect((0, _isServerReachable2.default)(state)).toBeTruthy();
	});

	it('should return true if error is: Transport Error', function () {
		var state = (0, _deepFreeze2.default)({
			connection: {
				error: _constants.HAPPYCHAT_CONNECTION_ERROR_TRANSPORT_ERROR
			}
		});
		expect((0, _isServerReachable2.default)(state)).toBeTruthy();
	});

	it('should return false if error is: Ping Timeout', function () {
		var state = (0, _deepFreeze2.default)({
			connection: {
				error: _constants.HAPPYCHAT_CONNECTION_ERROR_PING_TIMEOUT
			}
		});
		expect((0, _isServerReachable2.default)(state)).toBeFalsy();
	});
}); /** @format */

/**
 * External dependencies
 */