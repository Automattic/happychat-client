/** @format */

/**
 * External dependencies
 */
import get from 'lodash/get';

/**
 * Gets the fallback ticket message to be shown while the request is in flight.
 *
 * @param {Object} state - global redux state
 * @return {String} current state value
 */
export default state => get( state, 'fallbackTicket.msgSending' );
