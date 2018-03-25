'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
exports.default = function (state) {
  return (0, _get2.default)(state, 'user.groups', [_constants.HAPPYCHAT_GROUP_WPCOM]);
};

/**
 * Internal dependencies
 */