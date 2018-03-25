'use strict';

var _index = require('../index');

describe('Connection', function () {
	var component = void 0;
	beforeEach(function () {
		component = new _index.HappychatConnection();
		component.props = {
			onInitConnection: jest.fn(),
			getAuth: jest.fn()
		};
	});

	test('initConnection if connection is uninitialized and happychat is enabled', function () {
		component.props.isConnectionUninitialized = true;
		component.props.isHappychatEnabled = true;
		component.componentDidMount();
		expect(component.props.onInitConnection).toHaveBeenCalled();
	});

	test('do not initConnection if connection is not uninitialized', function () {
		component.props.isConnectionUninitialized = false;
		component.props.isHappychatEnabled = true;
		component.componentDidMount();
		expect(component.props.onInitConnection).not.toHaveBeenCalled();
	});

	test('do not initConnection if happychat is not enabled', function () {
		component.props.isConnectionUninitialized = true;
		component.props.isHappychatEnabled = false;
		component.componentDidMount();
		expect(component.props.onInitConnection).not.toHaveBeenCalled();
	});
}); /** @format */

/**
 * Internal dependencies
 */