'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _getUiLostfocusat = require('../get-ui-lostfocusat');

var _getUiLostfocusat2 = _interopRequireDefault(_getUiLostfocusat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Simulate the time Feb 27, 2017 05:25 UTC
/** @format */

/**
 * External dependencies
 */
var NOW = 1488173100125;

/**
 * Internal dependencies
 */


describe('#getLostFocusTimestamp', function () {
  test('returns the current timestamp', function () {
    var state = (0, _deepFreeze2.default)({ ui: { lostFocusAt: NOW } });
    expect((0, _getUiLostfocusat2.default)(state)).toBe(NOW);
  });
});