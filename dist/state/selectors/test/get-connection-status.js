'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _constants = require('src/state/constants');

var _getConnectionStatus = require('../get-connection-status');

var _getConnectionStatus2 = _interopRequireDefault(_getConnectionStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
describe('#getConnectionStatus', function () {
	describe('should return proper connection status for', function () {
		it('UNINITIALIZED', function () {
			var stateUninitialized = (0, _deepFreeze2.default)({
				connection: {
					status: _constants.HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED
				}
			});
			expect((0, _getConnectionStatus2.default)(stateUninitialized)).toBe(_constants.HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED);
		});

		it('CONNECTED', function () {
			var stateConnected = (0, _deepFreeze2.default)({
				connection: {
					status: _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTED
				}
			});
			expect((0, _getConnectionStatus2.default)(stateConnected)).toBe(_constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTED);
		});

		it('DISCONNECTED', function () {
			var stateDisconnected = (0, _deepFreeze2.default)({
				connection: {
					status: _constants.HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED
				}
			});
			expect((0, _getConnectionStatus2.default)(stateDisconnected)).toBe(_constants.HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED);
		});

		it('CONNECTING', function () {
			var stateConnecting = (0, _deepFreeze2.default)({
				connection: {
					status: _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTING
				}
			});
			expect((0, _getConnectionStatus2.default)(stateConnecting)).toBe(_constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTING);
		});

		it('RECONNECTING', function () {
			var stateReconnecting = (0, _deepFreeze2.default)({
				connection: {
					status: _constants.HAPPYCHAT_CONNECTION_STATUS_RECONNECTING
				}
			});
			expect((0, _getConnectionStatus2.default)(stateReconnecting)).toBe(_constants.HAPPYCHAT_CONNECTION_STATUS_RECONNECTING);
		});
	});
}); /** @format */

/**
 * External dependencies
 */