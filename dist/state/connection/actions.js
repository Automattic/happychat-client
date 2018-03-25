'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPreferences = exports.sendNotTyping = exports.sendTyping = exports.sendUserInfo = exports.sendLog = exports.sendEvent = exports.sendMessage = exports.requestFallbackTicket = exports.requestTranscript = exports.receiveFallbackTicketTimeout = exports.receiveFallbackTicket = exports.receiveTranscriptTimeout = exports.receiveTranscript = exports.receiveError = exports.receiveStatus = exports.receiveMessage = exports.receiveAccept = exports.receiveReconnecting = exports.receiveUnauthorized = exports.receiveInit = exports.receiveToken = exports.receiveDisconnect = exports.receiveConnect = exports.initConnection = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @format **/

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


var _uuid = require('uuid');

var _actionTypes = require('../action-types');

var _constants = require('../constants');

/**
 * Returns an action object indicating that the connection is being stablished.
 *
 * @param { Promise } auth Authentication promise, will return the user info upon fulfillment
 * @return { Object } Action object
 */
var initConnection = exports.initConnection = function initConnection(auth) {
  return { type: _actionTypes.HAPPYCHAT_IO_INIT, auth: auth };
};

/**
 * Returns an action object for the connect event,
 * as it was received from Happychat.
 *
 * @return { Object } Action object
 */
var receiveConnect = exports.receiveConnect = function receiveConnect() {
  return { type: _actionTypes.HAPPYCHAT_IO_RECEIVE_CONNECT };
};

/**
 * Returns an action object for the disconnect event,
 * as it was received from Happychat.
 *
 * @param { String } error The error
 * @return { Object } Action object
 */
var receiveDisconnect = exports.receiveDisconnect = function receiveDisconnect(error) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_RECEIVE_DISCONNECT,
    error: error
  };
};

/**
 * Returns an action object for the token event,
 * as it was received from Happychat.
 *
 * @return { Object } Action object
 */
var receiveToken = exports.receiveToken = function receiveToken() {
  return { type: _actionTypes.HAPPYCHAT_IO_RECEIVE_TOKEN };
};

/**
 * Returns an action object for the init event, as received from Happychat.
 * Indicates that the connection is ready to be used.
 *
 * @param { Object } user User object received
 * @return { Object } Action object
 */
var receiveInit = exports.receiveInit = function receiveInit(user) {
  return { type: _actionTypes.HAPPYCHAT_IO_RECEIVE_INIT, user: user };
};

/**
 * Returns an action object for the unauthorized event,
 * as it was received from Happychat
 *
 * @param { String } error Error reported
 * @return { Object } Action object
 */
var receiveUnauthorized = exports.receiveUnauthorized = function receiveUnauthorized(error) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_RECEIVE_UNAUTHORIZED,
    error: error
  };
};

/**
 * Returns an action object for the reconnecting event,
 * as it was received from Happychat.
 *
 * @return { Object } Action object
 */
var receiveReconnecting = exports.receiveReconnecting = function receiveReconnecting() {
  return { type: _actionTypes.HAPPYCHAT_IO_RECEIVE_RECONNECTING };
};

/**
 * Returns an action object for the accept event indicating the system availability,
 * as it was received from Happychat.
 *
 * @param  { Object } isAvailable Whether Happychat is available
 * @return { Object } Action object
 */
var receiveAccept = exports.receiveAccept = function receiveAccept(isAvailable) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_RECEIVE_ACCEPT,
    isAvailable: isAvailable
  };
};

/**
 * Returns an action object for the message event,
 * as it was received from Happychat.
 *
 * @param  { Object } message Message received
 * @return { Object } Action object
 */
var receiveMessage = exports.receiveMessage = function receiveMessage(message) {
  return { type: _actionTypes.HAPPYCHAT_IO_RECEIVE_MESSAGE, message: message };
};

/**
 * Returns an action object for the status event,
 * as it was received from Happychat.
 *
 * @param  { String } status New chat status
 * @return { Object } Action object
 */
var receiveStatus = exports.receiveStatus = function receiveStatus(status) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_RECEIVE_STATUS,
    status: status
  };
};

/**
 * Returns an action object with the error received from Happychat
 * upon trying to send an event.
 *
 * @param  { Object } error Error received
 * @return { Object } Action object
 */
var receiveError = exports.receiveError = function receiveError(error) {
  return { type: _actionTypes.HAPPYCHAT_IO_RECEIVE_ERROR, error: error };
};

/**
 * Returns an action object for the transcript reception.
 *
 * @param { Object } result An object with {messages, timestamp} props
 * @return { Object } Action object
 */
var receiveTranscript = exports.receiveTranscript = function receiveTranscript(_ref) {
  var messages = _ref.messages,
      timestamp = _ref.timestamp;
  return {
    type: _actionTypes.HAPPYCHAT_IO_REQUEST_TRANSCRIPT_RECEIVE,
    messages: messages,
    timestamp: timestamp
  };
};

/**
 * Returns an action object for the timeout of the transcript request.
 *
 * @return { Object } Action object
 */
var receiveTranscriptTimeout = exports.receiveTranscriptTimeout = function receiveTranscriptTimeout() {
  return {
    type: _actionTypes.HAPPYCHAT_IO_REQUEST_TRANSCRIPT_TIMEOUT
  };
};

/**
 * Returns an action object with the success status
 * of the fallback ticket request.
 *
 * @param  { Object } response Contains the status (a valid HTTP status code) and the responseText received.
 * @return { Object } Action object
 */
var receiveFallbackTicket = exports.receiveFallbackTicket = function receiveFallbackTicket(_ref2) {
  var status = _ref2.status,
      responseText = _ref2.responseText;
  return {
    type: _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_RECEIVE,
    status: status,
    responseText: responseText
  };
};

/**
 * Returns an action object for the timeout of the fallback ticket request.
 *
 * @return { Object } Action object
 */
var receiveFallbackTicketTimeout = exports.receiveFallbackTicketTimeout = function receiveFallbackTicketTimeout() {
  return {
    type: _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET_TIMEOUT
  };
};

/**
 * Returns an action object that prepares the transcript request
 * to be send to happychat as a SocketIO event.
 *
 * @param { String } timestamp Latest transcript timestamp
 * @param { Number } timeout The number of milliseconds to wait for server response.
 *                 	 If it hasn't responded after the timeout, the connection library
 *                 	 will dispatch the receiveTranscriptTimeout action.
 * @return { Object } Action object
 */
var requestTranscript = exports.requestTranscript = function requestTranscript(timestamp) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
  return {
    type: _actionTypes.HAPPYCHAT_IO_REQUEST_TRANSCRIPT,
    event: 'transcript',
    payload: timestamp,
    timeout: timeout,
    callback: receiveTranscript,
    callbackTimeout: receiveTranscriptTimeout
  };
};

/**
 * Returns an action object that prepares the fallback ticket message
 * to be sent as a XHR POST request to the fallback ticket API endpoint.
 *
 * Note that this action is never sent through SocketIO, that's why
 * it doesn't include the payload.event property, but the payload.path.
 *
 * @param  { String } path URL path that will be used to send the request.
 * @param  { Object } message Message to be sent
 * @param { Number } timeout The number of milliseconds to wait for server response.
 *                 	 If it hasn't responded after the timeout, the connection library
 *                 	 will dispatch the receiveTranscriptTimeout action.
 * @return { Object } Action object
 */
var requestFallbackTicket = exports.requestFallbackTicket = function requestFallbackTicket(_ref3) {
  var path = _ref3.path,
      headers = _ref3.headers,
      payload = _ref3.payload,
      _ref3$timeout = _ref3.timeout,
      timeout = _ref3$timeout === undefined ? 10000 : _ref3$timeout;
  return {
    type: _actionTypes.HAPPYCHAT_IO_REQUEST_FALLBACK_TICKET,
    path: path,
    headers: headers,
    payload: payload,
    timeout: timeout,
    callback: receiveFallbackTicket,
    callbackTimeout: receiveFallbackTicketTimeout
  };
};

/**
 * Returns an action object that prepares the chat message
 * to be send to Happychat as a SocketIO event.
 *
 * @param  { Object } message Message to be sent
 * @param  { Object } meta meta info to be sent along the message
 * @return { Object } Action object
 */
var sendMessage = exports.sendMessage = function sendMessage(message) {
  var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE,
    event: 'message',
    payload: { id: (0, _uuid.v4)(), text: message, meta: meta }
  };
};

/**
 * Returns an action object that prepares the event message
 * to be send to Happychat as a SocketIO event.
 *
 * @param  { Object } message Message to be sent
 * @return { Object } Action object
 */
var sendEvent = exports.sendEvent = function sendEvent(message) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_EVENT,
    event: 'message',
    payload: {
      id: (0, _uuid.v4)(),
      text: message,
      type: _constants.HAPPYCHAT_MESSAGE_TYPES.CUSTOMER_EVENT,
      meta: { forOperator: true, event_type: _constants.HAPPYCHAT_MESSAGE_TYPES.CUSTOMER_EVENT }
    }
  };
};

/**
 * Returns an action object that prepares the log message
 * to be send to Happychat as a SocketIO event.
 *
 * @param  { Object } message Message to be sent
 * @return { Object } Action object
 */
var sendLog = exports.sendLog = function sendLog(message) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_LOG,
    event: 'message',
    payload: {
      id: (0, _uuid.v4)(),
      text: message,
      type: _constants.HAPPYCHAT_MESSAGE_TYPES.LOG,
      meta: { forOperator: true, event_type: _constants.HAPPYCHAT_MESSAGE_TYPES.LOG }
    }
  };
};

/**
 * Returns an action object that prepares the user information
 * to be send to Happychat as a SocketIO event.
 *
 * @param  { Object } info Selected user info
 * @return { Object } Action object
 */
var sendUserInfo = exports.sendUserInfo = function sendUserInfo(info) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_SEND_MESSAGE_USERINFO,
    event: 'message',
    payload: {
      id: (0, _uuid.v4)(),
      type: _constants.HAPPYCHAT_MESSAGE_TYPES.CUSTOMER_INFO,
      meta: _extends({
        forOperator: true
      }, info)
    }
  };
};

/**
 * Returns an action object that prepares the typing info
 * to be sent to Happychat as a SocketIO event.
 *
 * @param  { Object } message What the user is typing
 * @return { Object } Action object
 */
var sendTyping = exports.sendTyping = function sendTyping(message) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_SEND_TYPING,
    event: 'typing',
    payload: {
      message: message
    }
  };
};

/**
 * Returns an action object that prepares typing info (the user stopped typing)
 * to be sent to Happychat as a SocketIO event.
 *
 * @return { Object } Action object
 */
var sendNotTyping = exports.sendNotTyping = function sendNotTyping() {
  return sendTyping(false);
};

/**
 * Returns an action object that prepares the user routing preferences (locale and groups)
 * to be send to happychat as a SocketIO event.
 *
 * @param { String } locale representing the user selected locale
 * @param { Array } groups of string happychat groups (wp.com, jpop) based on the site selected
 * @param { Object } skills object based on product and language ( formerly group and locale )
 *
 * @return { Object } Action object
 */
var sendPreferences = exports.sendPreferences = function sendPreferences(locale, groups, skills) {
  return {
    type: _actionTypes.HAPPYCHAT_IO_SEND_PREFERENCES,
    event: 'preferences',
    payload: {
      locale: locale,
      groups: groups,
      skills: skills
    }
  };
};