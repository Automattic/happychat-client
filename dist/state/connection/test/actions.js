'use strict';

var _actionTypes = require('src/state/action-types');

var _actions = require('../actions');

/** @format */

/**
 * Internal dependencies
 */
describe('actions', function () {
	describe('#receiveInit()', function () {
		test('should return an action object', function () {
			var action = (0, _actions.receiveInit)({ geoLocation: { country_long: 'Romania' } });

			expect(action).toMatchObject({
				type: _actionTypes.HAPPYCHAT_IO_RECEIVE_INIT,
				user: { geoLocation: { country_long: 'Romania' } }
			});
		});
	});
});