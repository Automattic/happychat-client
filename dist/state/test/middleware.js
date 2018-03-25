'use strict';

var _middleware = require('../middleware');

var _actions = require('src/state/connection/actions');

var _actions2 = require('src/state/ui/actions');

var _constants = require('src/state/constants');

/** @format */

/**
 * Internal dependencies
 */
describe('middleware', function () {
	var actionMiddleware = void 0,
	    connection = void 0,
	    store = void 0;
	beforeEach(function () {
		connection = {
			init: jest.fn(),
			send: jest.fn(),
			request: jest.fn()
		};

		store = {
			getState: jest.fn(),
			dispatch: jest.fn()
		};

		actionMiddleware = (0, _middleware.socketMiddleware)(connection)(store)(jest.fn());
	});

	describe('connection.init actions are connected', function () {
		test('HAPPYCHAT_IO_INIT', function () {
			var action = (0, _actions.initConnection)(jest.fn());
			actionMiddleware(action);
			expect(connection.init).toHaveBeenCalledWith(store.dispatch, action.auth);
		});
	});

	describe('connection.send actions are connected', function () {
		test('HAPPYCHAT_IO_SEND_MESSAGE_EVENT', function () {
			var action = (0, _actions.sendEvent)('msg');
			actionMiddleware(action);
			expect(connection.send).toHaveBeenCalledWith(action);
		});

		test('HAPPYCHAT_IO_SEND_MESSAGE_LOG', function () {
			var action = (0, _actions.sendLog)('msg');
			actionMiddleware(action);
			expect(connection.send).toHaveBeenCalledWith(action);
		});

		test('HAPPYCHAT_IO_SEND_MESSAGE_MESSAGE', function () {
			var action = (0, _actions.sendMessage)('msg');
			actionMiddleware(action);
			expect(connection.send).toHaveBeenCalledWith(action);
		});

		test('HAPPYCHAT_IO_SEND_MESSAGE_USERINFO', function () {
			var action = (0, _actions.sendUserInfo)({ user: 'user' });
			actionMiddleware(action);
			expect(connection.send).toHaveBeenCalledWith(action);
		});

		test('HAPPYCHAT_IO_SEND_MESSAGE_PREFERENCES', function () {
			var action = (0, _actions.sendPreferences)('locale', [], {});
			actionMiddleware(action);
			expect(connection.send).toHaveBeenCalledWith(action);
		});

		test('HAPPYCHAT_IO_SEND_MESSAGE_TYPING (sendTyping)', function () {
			var action = (0, _actions.sendTyping)('msg');
			actionMiddleware(action);
			expect(connection.send).toHaveBeenCalledWith(action);
		});

		test('HAPPYCHAT_IO_SEND_MESSAGE_TYPING (sendNotTyping)', function () {
			var action = (0, _actions.sendNotTyping)('msg');
			actionMiddleware(action);
			expect(connection.send).toHaveBeenCalledWith(action);
		});
	});

	describe('connection.request actions are connected', function () {
		test('HAPPYCHAT_IO_REQUEST_TRANSCRIPT', function () {
			var action = (0, _actions.requestTranscript)(20, 30);
			actionMiddleware(action);
			expect(connection.request).toHaveBeenCalledWith(action, action.timeout);
		});
	});

	describe('eventMessage', function () {
		var state = {
			connection: {
				status: _constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTED
			},
			chat: {
				status: _constants.HAPPYCHAT_CHAT_STATUS_ASSIGNED
			}
		};

		describe('is dispatched if client is connected, chat is assigned, and there is a message for the action', function () {
			test('for HAPPYCHAT_BLUR', function () {
				store.getState.mockReturnValue(state);
				var action = (0, _actions2.blur)();
				actionMiddleware(action);

				expect(store.dispatch.mock.calls[0][0].event).toBe('message');
				expect(store.dispatch.mock.calls[0][0].payload.text).toBe('Stopped looking at Happychat');
			});

			test('for HAPPYCHAT_FOCUS', function () {
				store.getState.mockReturnValue(state);
				var action = (0, _actions2.focus)();
				actionMiddleware(action);

				expect(store.dispatch.mock.calls[0][0].event).toBe('message');
				expect(store.dispatch.mock.calls[0][0].payload.text).toBe('Started looking at Happychat');
			});
		});

		test('is not dispatched if client is not connected', function () {
			[_constants.HAPPYCHAT_CONNECTION_STATUS_CONNECTING, _constants.HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED, _constants.HAPPYCHAT_CONNECTION_STATUS_RECONNECTING, _constants.HAPPYCHAT_CONNECTION_STATUS_UNAUTHORIZED, _constants.HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED].forEach(function (connectionStatus) {
				store.getState.mockReturnValue(Object.assign(state, { connection: { status: connectionStatus } }));
				var action = (0, _actions2.blur)();
				actionMiddleware(action);

				expect(store.dispatch).not.toHaveBeenCalled();
			});
		});

		test('is not dispatched if chat is not assigned', function () {
			[_constants.HAPPYCHAT_CHAT_STATUS_ABANDONED, _constants.HAPPYCHAT_CHAT_STATUS_ASSIGNING, _constants.HAPPYCHAT_CHAT_STATUS_BLOCKED, _constants.HAPPYCHAT_CHAT_STATUS_CLOSED, _constants.HAPPYCHAT_CHAT_STATUS_DEFAULT, _constants.HAPPYCHAT_CHAT_STATUS_NEW, _constants.HAPPYCHAT_CHAT_STATUS_MISSED, _constants.HAPPYCHAT_CHAT_STATUS_PENDING].forEach(function (chatStatus) {
				store.getState.mockReturnValue(Object.assign(state, { chat: { status: chatStatus } }));
				var action = (0, _actions2.blur)();
				actionMiddleware(action);

				expect(store.dispatch).not.toHaveBeenCalled();
			});
		});

		test('is not dispatched if there is no message defined', function () {
			store.getState.mockReturnValue(state);
			var action = { type: 'HAPPYCHAT_ACTION_WITHOUT_EVENT_MESSAGE_DEFINED' };
			actionMiddleware(action);
			expect(store.dispatch).not.toHaveBeenCalled();
		});
	});
});