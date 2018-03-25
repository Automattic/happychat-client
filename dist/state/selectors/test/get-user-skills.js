'use strict';

var _constants = require('src/state/constants');

var _getUserSkills = require('../get-user-skills');

var _getUserSkills2 = _interopRequireDefault(_getUserSkills);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /** @format */

/**
 * Internal dependencies
 */


describe('#getUserSkills()', function () {
	test('should return default product if none set', function () {
		var _expect$toEqual;

		var state = {
			user: {
				locale: 'gl'
			}
		};
		expect((0, _getUserSkills2.default)(state)).toEqual((_expect$toEqual = {}, _defineProperty(_expect$toEqual, _constants.HAPPYCHAT_SKILL_PRODUCT, [_constants.HAPPYCHAT_GROUP_WPCOM]), _defineProperty(_expect$toEqual, _constants.HAPPYCHAT_SKILL_LANGUAGE, ['gl']), _expect$toEqual));
	});

	test('should ignore language if not set', function () {
		var state = {
			user: {
				groups: [_constants.HAPPYCHAT_GROUP_WPCOM]
			}
		};
		expect((0, _getUserSkills2.default)(state)).toEqual(_defineProperty({}, _constants.HAPPYCHAT_SKILL_PRODUCT, [_constants.HAPPYCHAT_GROUP_WPCOM]));
	});

	test('should return both product and language', function () {
		var _expect$toEqual3;

		var siteId = 1;
		var state = {
			user: {
				locale: 'gl',
				groups: [_constants.HAPPYCHAT_GROUP_JPOP]
			}
		};

		expect((0, _getUserSkills2.default)(state)).toEqual((_expect$toEqual3 = {}, _defineProperty(_expect$toEqual3, _constants.HAPPYCHAT_SKILL_PRODUCT, [_constants.HAPPYCHAT_GROUP_JPOP]), _defineProperty(_expect$toEqual3, _constants.HAPPYCHAT_SKILL_LANGUAGE, ['gl']), _expect$toEqual3));
	});
});