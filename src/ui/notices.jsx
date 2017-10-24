/** @format */

/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Calypso dependencies
 */
import { Notices } from 'components/happychat/notices';

/**
 * Internal dependencies
 */
import localize from 'src/ui/components/localize';
import { getHappychatStatus } from 'src/state/chat/selectors';
import {
	getHappychatConnectionStatus,
	isHappychatServerReachable,
} from 'src/state/socket/selectors';

const mapState = state => ( {
	isServerReachable: isHappychatServerReachable( state ),
	chatStatus: getHappychatStatus( state ),
	connectionStatus: getHappychatConnectionStatus( state ),
} );

export default localize( connect( mapState )( Notices ) );
