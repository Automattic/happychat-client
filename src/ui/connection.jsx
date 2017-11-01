/** @format */

/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Calypso dependencies
 */
import { HappychatConnection } from 'components/happychat/connection';

/**
 * Internal dependencies
 */
import { connectChat } from 'src/state/socket/actions';
import { isHappychatConnectionUninitialized } from 'src/state/socket/selectors';

export default connect(
	state => ( {
		getAuth: () => {},
		isConnectionUninitialized: isHappychatConnectionUninitialized( state ),
		isHappychatEnabled: true,
	} ),
	{ onInitConnection: connectChat }
)( HappychatConnection );
