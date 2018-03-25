'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.socketMiddleware = undefined;

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _actionTypes = require('./action-types');

var _actions = require('./connection/actions');

var _socketio = require('./socketio');

var _socketio2 = _interopRequireDefault(_socketio);

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _isConnectionConnected = require('./selectors/is-connection-connected');

var _isConnectionConnected2 = _interopRequireDefault(_isConnectionConnected);

var _isChatAssigned = require('./selectors/is-chat-assigned');

var _isChatAssigned2 = _interopRequireDefault(_isChatAssigned);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
var eventMessage = {
	HAPPYCHAT_BLUR: 'Stopped looking at Happychat',
	HAPPYCHAT_FOCUS: 'Started looking at Happychat'
}; /** @format */

/**
 * External dependencies
 */
var socketMiddleware = exports.socketMiddleware = function socketMiddleware() {
	var connection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	// Allow a connection object to be specified for
	// testing. If blank, use a real connection.
	if (connection == null) {
		connection = (0, _socketio2.default)();
	}

	return function (store) {
		return function (next) {
			return function (action) {
				switch (action.type) {
					case _actionTypes.HAPPYCHAT_IO_INIT:
						connection.init(store.dispatch, action.auth);
						break;

					case _actionTypes.HAPPYCHAT_IO_REQUEST_TRANSCRIPT:
						connection.request(action, action.timeout);
						break;

					case _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET:
						(0, _xhr2.default)(store.dispatch, action, action.timeout);
						break;

					case _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_EVENT:
					case _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_LOG:
					case _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE:
					case _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_USERINFO:
					case _actionTypes.HAPPYCHAT_IO_SEND_PREFERENCES:
					case _actionTypes.HAPPYCHAT_IO_SEND_TYPING:
						connection.send(action);
						break;

					case _actionTypes.HAPPYCHAT_BLUR:
					case _actionTypes.HAPPYCHAT_FOCUS:
						var state = store.getState();
						(0, _isConnectionConnected2.default)(state) && (0, _isChatAssigned2.default)(state) && eventMessage[action.type] // eslint-disable-line max-len
						? store.dispatch((0, _actions.sendEvent)(eventMessage[action.type])) : _noop2.default;
						break;
				}

				return next(action);
			};
		};
	};
};

exports.default = socketMiddleware();