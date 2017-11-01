/** @format */

/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Calypso dependencies
 */
import { Composer } from 'components/happychat/composer';
// TODO: implement localize
import { mockLocalize } from 'src/ui/components/localize';

/**
 * Internal dependencies
 */
import { sendChatMessage, setChatMessage } from 'src/state/chat/actions';
import { canUserSendMessages, getCurrentChatMessage } from 'src/state/chat/selectors';

const mapState = state => ( {
	disabled: ! canUserSendMessages( state ),
	message: getCurrentChatMessage( state ),
} );

const mapDispatch = {
	onFocus: () => {},
	onSendMessage: sendChatMessage,
	onSendNotTyping: () => {},
	onSendTyping: () => {},
	onSetCurrentMessage: setChatMessage,
};

export default connect( mapState, mapDispatch )( mockLocalize( Composer ) );
