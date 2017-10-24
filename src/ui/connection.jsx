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
		isUninitialized: isHappychatConnectionUninitialized( state ),
	} ),
	{ connectChat }
)( HappychatConnection );
