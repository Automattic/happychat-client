'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _constants = require('src/state/constants');

var _isConnectionConnected = require('../is-connection-connected');

var _isConnectionConnected2 = _interopRequireDefault(_isConnectionConnected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
describe('#isConnectionConnected', function () {
	it('should return false for UNINITIALIZED', function () {
		var stateUnitialized = (0, _deepFreeze2.default)({
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED
			}
		});
		expect((0, _isConnectionConnected2.default)(stateUnitialized)).toBeFalsy();
	});

	it('should return true for CONNECTED', function () {
		var stateConnected = (0, _deepFreeze2.default)({
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTED
			}
		});
		expect((0, _isConnectionConnected2.default)(stateConnected)).toBeTruthy();
	});

	it('should return false for DISCONNECTED', function () {
		var stateDisconnected = (0, _deepFreeze2.default)({
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED
			}
		});
		expect((0, _isConnectionConnected2.default)(stateDisconnected)).toBeFalsy();
	});

	it('should return false for CONNECTING', function () {
		var stateConnecting = (0, _deepFreeze2.default)({
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTING
			}
		});
		expect((0, _isConnectionConnected2.default)(stateConnecting)).toBeFalsy();
	});

	it('should return false for RECONNECTING', function () {
		var stateReconnecting = (0, _deepFreeze2.default)({
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_RECONNECTING
			}
		});
		expect((0, _isConnectionConnected2.default)(stateReconnecting)).toBeFalsy();
	});
}); /** @format */

/**
 * External dependencies
 */