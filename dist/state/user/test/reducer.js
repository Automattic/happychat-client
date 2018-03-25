'use strict';

var _actionTypes = require('src/state/action-types');

var _reducer = require('../reducer');

/** @format */

/**
 * Internal dependencies
 */
describe('#geoLocation()', function () {
	test('should default to null', function () {
		var state = (0, _reducer.geoLocation)(undefined, {});

		expect(state).toBeNull();
	});

	test('should set the current user geolocation', function () {
		var state = (0, _reducer.geoLocation)(null, {
			type: _actionTypes.HAPPYCHAT_IO_RECEIVE_INIT,
			user: {
				geoLocation: {
					country_long: 'Romania',
					city: 'Timisoara'
				}
			}
		});

		expect(state).toMatchObject({ country_long: 'Romania', city: 'Timisoara' });
	});
});