'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getChatLastactivitytimestamp = require('./get-chat-lastactivitytimestamp');

var _getChatLastactivitytimestamp2 = _interopRequireDefault(_getChatLastactivitytimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// How much time needs to pass before we consider the session inactive:
var HAPPYCHAT_INACTIVE_TIMEOUT_MS = 1000 * 60 * 10; /** @format */

/**
 * Internal dependencies
 */

exports.default = function (state) {
	var lastActive = (0, _getChatLastactivitytimestamp2.default)(state);
	var now = Date.now();
	return now - lastActive < HAPPYCHAT_INACTIVE_TIMEOUT_MS;
};