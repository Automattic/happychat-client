'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _getUserGroups = require('./get-user-groups');

var _getUserGroups2 = _interopRequireDefault(_getUserGroups);

var _getUserLocale = require('./get-user-locale');

var _getUserLocale2 = _interopRequireDefault(_getUserLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /** @format */

/**
 * Internal dependencies
 */


/**
 * Returns an object of happychat skills array ( product - before known as groups and language )
 *
 * @param { Object } state Global state tree
 * @param { String } siteId Id of the selected site used to determine the product (wpcom, jetpack)
 *
 * @return { String } Current user geo location
 */
exports.default = function (state) {
  var skills = _defineProperty({}, _constants.HAPPYCHAT_SKILL_PRODUCT, (0, _getUserGroups2.default)(state));

  var language = (0, _getUserLocale2.default)(state);
  if (language) {
    skills[_constants.HAPPYCHAT_SKILL_LANGUAGE] = [language];
  }

  return skills;
};