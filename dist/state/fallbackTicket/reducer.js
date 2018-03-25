'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _startsWith = require('lodash/startsWith');

var _startsWith2 = _interopRequireDefault(_startsWith);

var _actionTypes = require('../action-types');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
var status = function status() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.HAPPYCHAT_FALLBACK_TICKET_NEW;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET:
			return _constants.HAPPYCHAT_FALLBACK_TICKET_SENDING;
		case _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_RECEIVE:
			return (0, _startsWith2.default)(action.status, '2') // HTTP succesful status are 2XX
			? _constants.HAPPYCHAT_FALLBACK_TICKET_SUCCESS : _constants.HAPPYCHAT_FALLBACK_TICKET_FAILURE;
		case _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_TIMEOUT:
			return _constants.HAPPYCHAT_FALLBACK_TICKET_TIMEOUT;
	}
	return state;
}; /** @format */

/**
 * External dependencies
 */


var response = function response() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_RECEIVE:
			return action.responseText;
		case _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET:
		case _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_TIMEOUT:
			return null;
	}
	return state;
};

var defaultHeaders = [];
var headers = function headers() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultHeaders;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return (0, _get2.default)(action, 'options.headers', defaultHeaders);
	}
	return state;
};

var defaultPathToCreate = null;
var pathToCreate = function pathToCreate() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultPathToCreate;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return (0, _get2.default)(action, 'options.pathToCreate', defaultPathToCreate);
	}
	return state;
};

var defaultPathToShow = null;
var pathToShow = function pathToShow() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultPathToShow;
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.HAPPYCHAT_FALLBACK_TICKET_OPTIONS:
			return (0, _get2.default)(action, 'options.pathToShow', defaultPathToShow);
	}
	return state;
};

exports.default = (0, _redux.combineReducers)({
	headers: headers,
	pathToCreate: pathToCreate,
	pathToShow: pathToShow,
	response: response,
	status: status
});