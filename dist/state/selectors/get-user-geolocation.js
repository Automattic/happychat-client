'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the geo location of the current user, based happychat session initiation (on ip)
 * @param {Object}  state  Global state tree
 * @return {?String}        Current user geo location
 */
exports.default = function (state) {
  return (0, _get2.default)(state, 'user.geoLocation', null);
}; /** @format */

/**
 * External dependencies
 */