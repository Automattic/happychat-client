'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAssetsLoaded = exports.setCurrentMessage = exports.focus = exports.blur = exports.closeChat = exports.minimizedChat = exports.minimizeChat = exports.openChat = undefined;

var _actionTypes = require('../action-types');

var setChatOpen = function setChatOpen(isOpen) {
  return { type: _actionTypes.HAPPYCHAT_OPEN, isOpen: isOpen };
}; /** @format */

/**
 * Internal dependencies
 */

var setChatMinimizing = function setChatMinimizing(isMinimizing) {
  return { type: _actionTypes.HAPPYCHAT_MINIMIZING, isMinimizing: isMinimizing };
};

/**
 * Set the Happychat sidebar dock to display
 * @returns {Object} Action
 */
var openChat = exports.openChat = function openChat() {
  return setChatOpen(true);
};

/**
 * Set the Happychat sidebar dock to start minimizing
 * @returns {Object} Action
 */
var minimizeChat = exports.minimizeChat = function minimizeChat() {
  return setChatMinimizing(true);
};

/**
 * Set the Happychat sidebar dock to finish minimizing
 * @returns {Object} Action
 */
var minimizedChat = exports.minimizedChat = function minimizedChat() {
  return setChatMinimizing(false);
};

/**
 * Set the Happychat sidebar dock to hide
 * @returns {Object} Action
 */
var closeChat = exports.closeChat = function closeChat() {
  return setChatOpen(false);
};

/**
 * Indicates Happychat component lost focus
 * @returns {Object} Action
 */
var blur = exports.blur = function blur() {
  return { type: _actionTypes.HAPPYCHAT_BLUR };
};

/**
 * Indicates Happychat component gained focus
 * @returns {Object} Action
 */
var focus = exports.focus = function focus() {
  return { type: _actionTypes.HAPPYCHAT_FOCUS };
};

/**
 * Returns an action object that sets the current chat message
 *
 * @param  { String } message Current message to be set
 * @return { Object } Action object
 */
var setCurrentMessage = exports.setCurrentMessage = function setCurrentMessage(message) {
  return { type: _actionTypes.HAPPYCHAT_SET_CURRENT_MESSAGE, message: message };
};

/**
 * Returns an action object that indicates whether the assets are ready.
 *
 * @return { Object } Action object
 */
var setAssetsLoaded = exports.setAssetsLoaded = function setAssetsLoaded() {
  return { type: _actionTypes.HAPPYCHAT_ASSETS_LOADED };
};