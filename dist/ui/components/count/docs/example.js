'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _count = require('components/count');

var _count2 = _interopRequireDefault(_count);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @format */

/**
 * External dependencies
 */

var count = function count() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_count2.default, { count: 65365 }),
    _react2.default.createElement(_count2.default, { primary: true, count: 65366 })
  );
};
/**
 * Internal dependencies
 */


count.displayName = 'Count';

exports.default = count;