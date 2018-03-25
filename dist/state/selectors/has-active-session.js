'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _constants = require('../constants');

var _createSelector = require('../../lib/create-selector');

var _createSelector2 = _interopRequireDefault(_createSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns true if there's an active chat session in-progress. Chat sessions with
 * the status `new`, `default`, or `closed` are considered inactive, as the session
 * is not connected to an operator.
 * @param {Object} state - global redux state
 * @return {Boolean} Whether there's an active Happychat session happening
 */


/**
 * Internal dependencies
 */
exports.default = (0, _createSelector2.default)(function (state) {
	return !(0, _includes2.default)([_constants.HAPPYCHAT_CHAT_STATUS_BLOCKED, _constants.HAPPYCHAT_CHAT_STATUS_CLOSED, _constants.HAPPYCHAT_CHAT_STATUS_DEFAULT, _constants.HAPPYCHAT_CHAT_STATUS_NEW], state.chat.status);
}, function (state) {
	return state.chat.status;
}); /** @format */

/**
 * External dependencies
 */