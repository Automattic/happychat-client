/** @format */

/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'src/lib/create-selector';

/**
 * Gets timeline chat events from the happychat state
 *
 * @param {Object} state - Global redux state
 * @return [{Object}] events - an array of timeline chat events
 */
export default createSelector(
	state => state.chat.timeline,
	state => map( state.chat.timeline, 'id' )
);
