/** @format */

/**
 * External dependencies
 */
import { get, last } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'src/lib/create-selector';
import getHappychatTimeline from 'src/state/selectors/get-chat-timeline';
import getLostFocusTimestamp from 'src/state/selectors/get-lostfocus-timestamp';

export default createSelector(
	state => {
		const lastMessageTimestamp = get( last( getHappychatTimeline( state ) ), 'timestamp' );
		const lostFocusAt = getLostFocusTimestamp( state );

		return (
			typeof lastMessageTimestamp === 'number' &&
			typeof lostFocusAt === 'number' &&
			// Message timestamps are reported in seconds. We need to multiply by 1000 to convert
			// to milliseconds, so we can compare it to other JS-generated timestamps
			lastMessageTimestamp * 1000 >= lostFocusAt
		);
	},
	[ getHappychatTimeline, getLostFocusTimestamp ]
);
