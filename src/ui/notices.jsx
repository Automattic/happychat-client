/** @format */

/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Calypso dependencies
 */
import { Notices } from 'components/happychat/notices';
// TODO: implement localize
import { mockLocalize } from 'src/ui/components/localize';

/**
 * Internal dependencies
 */
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

export default mockLocalize( connect( mapState )( Notices ) );
