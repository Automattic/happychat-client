'use strict';

var _events = require('events');

var _actions = require('src/state/connection/actions');

var _socketio = require('../socketio');

var _socketio2 = _interopRequireDefault(_socketio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
describe('connection', function () {
	describe('init', function () {
		describe('should bind SockeIO events upon config promise resolution', function () {
			var signer_user_id = 12;
			var jwt = 'jwt';
			var locale = 'locale';
			var groups = 'groups';
			var geoLocation = 'location';

			var socket = void 0,
			    dispatch = void 0,
			    openSocket = void 0;
			beforeEach(function () {
				socket = new _events.EventEmitter();
				dispatch = jest.fn();
				var connection = (0, _socketio2.default)();
				var config = Promise.resolve({
					url: socket,
					user: {
						signer_user_id: signer_user_id,
						jwt: jwt,
						locale: locale,
						groups: groups,
						geoLocation: geoLocation
					}
				});
				openSocket = connection.init(dispatch, config);
			});

			test('connect event', function () {
				socket.emit('connect');
				expect(dispatch).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveConnect)());
			});

			test('token event', function () {
				var callback = jest.fn();
				socket.emit('token', callback);
				expect(dispatch).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveToken)());
				expect(callback).toHaveBeenCalledTimes(1);
				expect(callback).toHaveBeenCalledWith({ signer_user_id: signer_user_id, jwt: jwt, locale: locale, groups: groups });
			});

			test('init event', function () {
				socket.emit('init');
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(dispatch.mock.calls[0][0]).toEqual((0, _actions.receiveInit)({ signer_user_id: signer_user_id, locale: locale, groups: groups, geoLocation: geoLocation }));
				expect(dispatch.mock.calls[1][0]).toEqual((0, _actions.requestTranscript)());
				return expect(openSocket).resolves.toBe(socket);
			});

			test('unauthorized event', function () {
				socket.close = jest.fn();
				openSocket.catch(function () {
					expect(dispatch).toHaveBeenCalledTimes(1);
					expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveUnauthorized)('User is not authorized'));
					expect(socket.close).toHaveBeenCalled();
				});
				socket.emit('unauthorized');
			});

			test('disconnect event', function () {
				var error = 'testing reasons';
				socket.emit('disconnect', error);
				expect(dispatch).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveDisconnect)(error));
			});

			test('reconnecting event', function () {
				socket.emit('reconnecting');
				expect(dispatch).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveReconnecting)());
			});

			test('status event', function () {
				var status = 'testing status';
				socket.emit('status', status);
				expect(dispatch).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveStatus)(status));
			});

			test('accept event', function () {
				var isAvailable = true;
				socket.emit('accept', isAvailable);
				expect(dispatch).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveAccept)(isAvailable));
			});

			test('message event', function () {
				var message = 'testing msg';
				socket.emit('message', message);
				expect(dispatch).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveMessage)(message));
			});
		});

		describe('should not bind SocketIO events upon config promise rejection', function () {
			var connection = void 0,
			    socket = void 0,
			    dispatch = void 0,
			    openSocket = void 0;
			var rejectMsg = 'no auth';
			beforeEach(function () {
				socket = new _events.EventEmitter();
				dispatch = jest.fn();
				connection = (0, _socketio2.default)();
				openSocket = connection.init(dispatch, Promise.reject(rejectMsg));
			});

			test('openSocket Promise has been rejected', function () {
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('connect event', function () {
				socket.emit('connect');
				expect(dispatch).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('token event', function () {
				var callback = jest.fn();
				socket.emit('token', callback);
				expect(dispatch).toHaveBeenCalledTimes(0);
				expect(callback).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('init event', function () {
				socket.emit('init');
				expect(dispatch).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('unauthorized event', function () {
				socket.close = jest.fn();
				socket.emit('unauthorized');
				expect(dispatch).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('disconnect event', function () {
				var error = 'testing reasons';
				socket.emit('disconnect', error);
				expect(dispatch).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('reconnecting event', function () {
				socket.emit('reconnecting');
				expect(dispatch).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('status event', function () {
				var status = 'testing status';
				socket.emit('status', status);
				expect(dispatch).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('accept event', function () {
				var isAvailable = true;
				socket.emit('accept', isAvailable);
				expect(dispatch).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});

			test('message event', function () {
				var message = 'testing msg';
				socket.emit('message', message);
				expect(dispatch).toHaveBeenCalledTimes(0);
				// catch the promise to avoid the UnhandledPromiseRejectionWarning
				return expect(openSocket).rejects.toBe(rejectMsg);
			});
		});
	});

	describe('when auth promise chain is fulfilled', function () {
		var signer_user_id = 12;
		var jwt = 'jwt';
		var locale = 'locale';
		var groups = 'groups';
		var geoLocation = 'location';

		var socket = void 0,
		    dispatch = void 0,
		    connection = void 0,
		    config = void 0;
		beforeEach(function () {
			socket = new _events.EventEmitter();
			dispatch = jest.fn();
			connection = (0, _socketio2.default)();
			config = Promise.resolve({
				url: socket,
				user: {
					signer_user_id: signer_user_id,
					jwt: jwt,
					locale: locale,
					groups: groups,
					geoLocation: geoLocation
				}
			});
			connection.init(dispatch, config);
		});

		test('connection.send should emit a SocketIO event', function () {
			socket.emit('init'); // resolve internal openSocket promise

			socket.emit = jest.fn();
			var action = (0, _actions.sendTyping)('my msg');
			return connection.send(action).then(function () {
				expect(socket.emit).toHaveBeenCalledWith(action.event, action.payload);
			});
		});

		describe('connection.request should emit a SocketIO event', function () {
			test('and dispatch callbackTimeout if request ran out of time', function () {
				socket.emit('init'); // resolve internal openSocket promise

				var action = (0, _actions.requestTranscript)(null);
				socket.emit = jest.fn();
				return connection.request(action, 100).catch(function (error) {
					expect(socket.emit).toHaveBeenCalled();
					expect(socket.emit.mock.calls[0][0]).toBe(action.event);
					expect(socket.emit.mock.calls[0][1]).toBe(action.payload);
					expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveTranscriptTimeout)());
					expect(error.message).toBe('timeout');
				});
			});

			test('and dispatch callback if request responded successfully', function () {
				socket.emit('init'); // resolve internal openSocket promise

				var action = (0, _actions.requestTranscript)(null);
				socket.on(action.event, function (payload, callback) {
					var result = {
						messages: ['msg1', 'msg2'],
						timestamp: Date.now()
					};
					callback(null, result); // fake server responded ok
				});
				return connection.request(action, 100).then(function (result) {
					expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveTranscript)(result));
				});
			});

			test('and dispatch error if request was not successful', function () {
				socket.emit('init'); // resolve internal openSocket promise

				var action = (0, _actions.requestTranscript)(null);
				socket.on(action.event, function (payload, callback) {
					callback('no data', null); // fake server responded with error
				});
				return connection.request(action, 100).catch(function (error) {
					expect(error.message).toBe('no data');
					expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveError)(action.event + ' request failed: ' + error.message));
				});
			});
		});
	});

	describe('when auth promise chain is rejected', function () {
		var socket = void 0,
		    dispatch = void 0,
		    connection = void 0,
		    config = void 0;
		beforeEach(function () {
			socket = new _events.EventEmitter();
			dispatch = jest.fn();
			connection = (0, _socketio2.default)();
			config = Promise.reject('no auth');
			connection.init(dispatch, config);
		});

		test('connection.send should dispatch receiveError action', function () {
			socket.emit = jest.fn();
			var action = (0, _actions.sendTyping)('content');
			return connection.send(action).catch(function (e) {
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveError)('failed to send ' + action.event + ': ' + e));
			});
		});

		test('connection.request should dispatch receiveError action', function () {
			socket.emit = jest.fn();
			var action = (0, _actions.requestTranscript)(null);
			return connection.request(action, 100).catch(function (e) {
				expect(dispatch).toHaveBeenCalledWith((0, _actions.receiveError)('failed to send ' + action.event + ': ' + e));
			});
		});
	});
}); /** @format */

/**
 * External dependencies
 */