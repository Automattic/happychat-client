'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _constants = require('../constants');

var _getChatStatus = require('./get-chat-status');

var _getChatStatus2 = _interopRequireDefault(_getChatStatus);

var _isConnectionConnected = require('./is-connection-connected');

var _isConnectionConnected2 = _interopRequireDefault(_isConnectionConnected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns true if the user should be able to send messages to operators based on
 * chat status. For example new chats and ongoing chats should be able to send messages,
 * but blocked or pending chats should not.
 *
 * @param {Object} state - global redux state
 * @return {Boolean} Whether the user is able to send messages
 */
/** @format */

/**
 * External dependencies
 */
exports.default = function (state) {
	return (0, _isConnectionConnected2.default)(state) && !(0, _includes2.default)([_constants.HAPPYCHAT_CHAT_STATUS_BLOCKED, _constants.HAPPYCHAT_CHAT_STATUS_DEFAULT, _constants.HAPPYCHAT_CHAT_STATUS_PENDING, _constants.HAPPYCHAT_CHAT_STATUS_MISSED, _constants.HAPPYCHAT_CHAT_STATUS_ABANDONED], (0, _getChatStatus2.default)(state));
};

/**
 * Internal dependencies
 */