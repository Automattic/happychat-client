'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */
var debug = (0, _debug2.default)('happychat-client:group-expanded');

/**
 * Internal dependencies
 */


var getGroup = function getGroup(state) {
  return (0, _get2.default)(state, 'user.groups', [_constants.HAPPYCHAT_GROUP_WPCOM])[0];
};
var logGroup = function logGroup(state) {
  var group = getGroup(state);
  debug('group is ', group);
  debug('expanded will be ', _constants.GROUPS_EXPANDED[group]);
  return group;
};

exports.default = function (state) {
  return _constants.GROUPS_EXPANDED[logGroup(state)];
};