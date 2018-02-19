/** @format */

/**
 * External dependencies
 */
import get from 'lodash/get';

/**
 * Gets the fallback ticket URL.
 *
 * @param {Object} state - global redux state
 * @return {String} current state value
 */
export default state => get( state, 'fallbackTicket.url' );
