"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectDropdownLabel;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module variables
 */

/**
 * Prevents the event from bubbling up the DOM tree
 * @param {SyntheticEvent} event - Browser's native event wrapper
 * @return {void}
 */
var stopPropagation = function stopPropagation(event) {
  return event.stopPropagation();
}; /** @format */

/**
 * External dependencies
 */

function SelectDropdownLabel(props) {
  return _react2.default.createElement(
    "li",
    { onClick: stopPropagation, className: "select-dropdown__label" },
    _react2.default.createElement(
      "label",
      null,
      props.children
    )
  );
}