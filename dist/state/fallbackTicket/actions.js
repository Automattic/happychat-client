'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFallbackTicketOptions = undefined;

var _actionTypes = require('../action-types');

/**
 * Returns an action object for configuring the fallbackTicket feature.
 *
 * @param { Object } options Object containing the data to be configured.
 * @return { Object } Action object
 */
var setFallbackTicketOptions = exports.setFallbackTicketOptions = function setFallbackTicketOptions(options) {
  return {
    type: _actionTypes.HAPPYCHAT_FALLBACK_TICKET_OPTIONS,
    options: options
  };
}; /** @format */

/**
 * Internal dependencies
 */