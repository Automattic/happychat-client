'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _createSelector = require('../../lib/create-selector');

var _createSelector2 = _interopRequireDefault(_createSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets timeline chat events from the happychat state
 *
 * @param {Object} state - Global redux state
 * @return [{Object}] events - an array of timeline chat events
 */
/** @format */

/**
 * External dependencies
 */
exports.default = (0, _createSelector2.default)(function (state) {
  return state.chat.timeline;
}, function (state) {
  return (0, _map2.default)(state.chat.timeline, 'id');
});

/**
 * Internal dependencies
 */