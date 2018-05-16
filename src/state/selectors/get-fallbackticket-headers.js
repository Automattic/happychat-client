/** @format */

/**
 * External dependencies
 */
import get from 'lodash/get';

/**
 * Gets the fallback ticket headers.
 *
 * @param {Object} state - global redux state
 * @return {String} current state value
 */
export default state => get( state, 'fallbackTicket.headers' );
