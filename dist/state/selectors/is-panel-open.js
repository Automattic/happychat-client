'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createSelector = require('../../lib/create-selector');

var _createSelector2 = _interopRequireDefault(_createSelector);

var _selectors = require('../ui/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns wether the docked happychat client UI should be displayed
 * The docked UI should not be displayed when viewing the happychat section
 * @param {Object} state - global redux state
 * @returns {Boolean}
 */
/** @format */

/**
 * Internal dependencies
 */
exports.default = (0, _createSelector2.default)(function (state) {
  return state.ui.isOpen && (0, _selectors.getSectionName)(state) !== 'happychat';
}, function (state) {
  return [state.ui.isOpen, (0, _selectors.getSectionName)(state)];
});