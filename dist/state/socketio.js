'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** @format */

/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _actions = require('./connection/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('happychat-client:socketio');

var buildConnection = function buildConnection(socket) {
	return (0, _isString2.default)(socket) ? new _socket2.default(socket) // If socket is an URL, connect to server.
	: socket;
}; // If socket is not an url, use it directly. Useful for testing.

var Connection = function () {
	function Connection() {
		_classCallCheck(this, Connection);
	}

	_createClass(Connection, [{
		key: 'init',

		/**
   * Init the SockeIO connection: check user authorization and bind socket events
   *
   * @param  { Function } dispatch Redux dispatch function
   * @param  { Promise } auth Authentication promise, will return the user info upon fulfillment
   * @return { Promise } Fulfilled (returns the opened socket)
   *                   	 or rejected (returns an error message)
   */
		value: function init(dispatch, auth) {
			if (this.openSocket) {
				debug('socket is already connected');
				return this.openSocket;
			}
			this.dispatch = dispatch;

			this.openSocket = new Promise(function (resolve, reject) {
				auth.then(function (_ref) {
					var url = _ref.url,
					    _ref$user = _ref.user,
					    signer_user_id = _ref$user.signer_user_id,
					    jwt = _ref$user.jwt,
					    locale = _ref$user.locale,
					    groups = _ref$user.groups,
					    skills = _ref$user.skills,
					    geoLocation = _ref$user.geoLocation;

					var socket = buildConnection(url);

					socket.once('connect', function () {
						return dispatch((0, _actions.receiveConnect)());
					}).on('token', function (handler) {
						dispatch((0, _actions.receiveToken)());
						handler({ signer_user_id: signer_user_id, jwt: jwt, locale: locale, groups: groups, skills: skills });
					}).on('init', function () {
						dispatch((0, _actions.receiveInit)({ signer_user_id: signer_user_id, locale: locale, groups: groups, skills: skills, geoLocation: geoLocation }));
						dispatch((0, _actions.requestTranscript)());
						resolve(socket);
					}).on('unauthorized', function () {
						socket.close();
						dispatch((0, _actions.receiveUnauthorized)('User is not authorized'));
						reject('user is not authorized');
					}).on('disconnect', function (reason) {
						return dispatch((0, _actions.receiveDisconnect)(reason));
					}).on('reconnecting', function () {
						return dispatch((0, _actions.receiveReconnecting)());
					}).on('status', function (status) {
						return dispatch((0, _actions.receiveStatus)(status));
					}).on('accept', function (accept) {
						return dispatch((0, _actions.receiveAccept)(accept));
					}).on('message', function (message) {
						return dispatch((0, _actions.receiveMessage)(message));
					});
				}).catch(function (e) {
					return reject(e);
				});
			});

			return this.openSocket;
		}

		/**
   * Given a Redux action, emits a SocketIO event.
   *
   * @param  { Object } action A Redux action with props
   *                    {
   *                  		event: SocketIO event name,
   *                  	  payload: contents to be sent,
   *                  	  error: message to be shown should the event fails to be sent,
   *                  	}
   * @return { Promise } Fulfilled (returns nothing)
   *                     or rejected (returns an error message)
   */

	}, {
		key: 'send',
		value: function send(action) {
			var _this = this;

			if (!this.openSocket) {
				return;
			}
			return this.openSocket.then(function (socket) {
				return socket.emit(action.event, action.payload);
			}, function (e) {
				_this.dispatch((0, _actions.receiveError)('failed to send ' + action.event + ': ' + e));
				// so we can relay the error message, for testing purposes
				return Promise.reject(e);
			});
		}

		/**
   *
   * Given a Redux action and a timeout, emits a SocketIO event that request
   * some info to the Happychat server.
   *
   * The request can have three states, and will dispatch an action accordingly:
   *
   * - request was succesful: would dispatch action.callback
   * - request was unsucessful: would dispatch receiveError
   * - request timeout: would dispatch action.callbackTimeout
   *
   * @param  { Object } action A Redux action with props
   *                  	{
   *                  		event: SocketIO event name,
   *                  		payload: contents to be sent,
   *                  		callback: a Redux action creator,
   *                  		callbackTimeout: a Redux action creator,
   *                  	}
   * @param  { Number } timeout How long (in milliseconds) has the server to respond
   * @return { Promise } Fulfilled (returns the transcript response)
   *                     or rejected (returns an error message)
   */

	}, {
		key: 'request',
		value: function request(action, timeout) {
			var _this2 = this;

			if (!this.openSocket) {
				return;
			}

			return this.openSocket.then(function (socket) {
				var promiseRace = Promise.race([new Promise(function (resolve, reject) {
					socket.emit(action.event, action.payload, function (e, result) {
						if (e) {
							return reject(new Error(e)); // request failed
						}
						return resolve(result); // request succesful
					});
				}), new Promise(function (resolve, reject) {
					return setTimeout(function () {
						return reject(new Error('timeout')); // request timeout
					}, timeout);
				})]);

				// dispatch the request state upon promise race resolution
				promiseRace.then(function (result) {
					return _this2.dispatch(action.callback(result));
				}, function (e) {
					return e.message === 'timeout' ? _this2.dispatch(action.callbackTimeout()) : _this2.dispatch((0, _actions.receiveError)(action.event + ' request failed: ' + e.message));
				});

				return promiseRace;
			}, function (e) {
				_this2.dispatch((0, _actions.receiveError)('failed to send ' + action.event + ': ' + e));
				// so we can relay the error message, for testing purposes
				return Promise.reject(e);
			});
		}
	}]);

	return Connection;
}();

exports.default = function () {
	return new Connection();
};