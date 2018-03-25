'use strict';

var _getUserGeolocation = require('../get-user-geolocation');

var _getUserGeolocation2 = _interopRequireDefault(_getUserGeolocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getGeoLocation', function () {
	test('should return null if geoLocation is not set', function () {
		var selected = (0, _getUserGeolocation2.default)({
			user: { geoLocation: null }
		});
		expect(selected).toBeNull();
	});

	test('should return value if geoLocation is set', function () {
		var selected = (0, _getUserGeolocation2.default)({
			user: {
				geoLocation: {
					city: 'Timisoara'
				}
			}
		});
		expect(selected).toMatchObject({ city: 'Timisoara' });
	});
}); /** @format */

/**
 * Internal dependencies
 */