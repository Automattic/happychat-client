/** @format */

/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Calypso dependencies
 */
// TODO: implement localize
import { mockLocalize } from 'src/ui/components/localize';
import { Timeline } from 'components/happychat/timeline';

/**
 * Internal dependencies
 */
import { getCurrentUser } from 'src/state/user/selectors';
import { getHappychatTimeline } from 'src/state/chat/selectors';

const mapProps = state => {
	/* eslint-disable camelcase */
	const current_user = getCurrentUser( state );
	return {
		currentUserEmail: current_user.email,
		isCurrentUser: ( { user_id, source } ) => {
			return user_id.toString() === current_user.ID.toString() && source === 'customer';
		},
		timeline: getHappychatTimeline( state ),
	};
	/* eslint-enable camelcase */
};

export default connect( mapProps )( mockLocalize( Timeline ) );
