/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debugFactory from 'debug';
const debug = debugFactory( 'happychat-embedded:ui' );

/**
 * Calypso dependencies
 */

// actions
import { initConnection } from 'state/happychat/connection/actions';

// selectors
import getHappychatConnectionStatus from 'state/happychat/selectors/get-happychat-connection-status';
import isHappychatConnectionUninitialized from 'state/happychat/selectors/is-happychat-connection-uninitialized';
import isHappychatServerReachable from 'state/happychat/selectors/is-happychat-server-reachable';

// UI components
import { HappychatConnection } from 'components/happychat/connection';
import { Composer } from 'components/happychat/composer';
import { Notices } from 'components/happychat/notices';
import { Timeline } from 'components/happychat/timeline';

// TODO: implement localize
import { mockLocalize } from 'src/ui/components/localize';

/**
 * Internal dependencies
 */
import config from 'src/config';
import { blur, focus } from 'src/state/ui/actions';
import { sendChatMessage, setChatMessage } from 'src/state/chat/actions';
import { getHappychatStatus } from 'src/state/chat/selectors';
import { canUserSendMessages, getCurrentChatMessage } from 'src/state/chat/selectors';
import { getCurrentUser } from 'src/state/user/selectors';
import { getHappychatTimeline } from 'src/state/chat/selectors';

/**
 * React component for rendering a happychat client as a full page
 */
export class HappychatPage extends Component {
	componentDidMount() {
		this.props.setFocused();
	}

	componentWillUnmount() {
		this.props.setBlurred();
	}

	render() {
		const {
			chatStatus,
			connectionStatus,
			currentUserEmail,
			disabled,
			getAuth,
			isCurrentUser,
			isExternalUrl,
			onInitConnection,
			isConnectionUninitialized,
			isHappychatEnabled,
			isServerReachable,
			message,
			onSendMessage,
			onSendNotTyping,
			onSendTyping,
			onSetCurrentMessage,
			timeline,
			translate,
			twemojiUrl,
		} = this.props;

		return (
			<div className="happychat__page" aria-live="polite" aria-relevant="additions">
				<HappychatConnection
					getAuth={ getAuth }
					initConnection={ onInitConnection }
					isConnectionUninitialized={ isConnectionUninitialized }
					isHappychatEnabled={ isHappychatEnabled }
				/>
				<Timeline
					currentUserEmail={ currentUserEmail }
					isCurrentUser={ isCurrentUser }
					isExternalUrl={ isExternalUrl }
					timeline={ timeline }
					translate={ translate }
					twemojiUrl={ twemojiUrl }
				/>
				<Notices
					chatStatus={ chatStatus }
					connectionStatus={ connectionStatus }
					isServerReachable={ isServerReachable }
					translate={ translate }
				/>
				<Composer
					disabled={ disabled }
					message={ message }
					onSendMessage={ onSendMessage }
					onSendNotTyping={ onSendNotTyping }
					onSendTyping={ onSendTyping }
					onSetCurrentMessage={ onSetCurrentMessage }
					translate={ translate }
				/>
			</div>
		);
	}
}

HappychatPage.propTypes = {
	chatStatus: PropTypes.string,
	connectionStatus: PropTypes.string,
	currentUserEmail: PropTypes.string,
	disabled: PropTypes.bool,
	getAuth: PropTypes.func,
	isConnectionUninitialized: PropTypes.bool,
	isCurrentUser: PropTypes.func,
	isExternalUrl: PropTypes.func,
	isHappychatEnabled: PropTypes.bool,
	isServerReachable: PropTypes.bool,
	message: PropTypes.string,
	onInitConnection: PropTypes.func,
	onSendMessage: PropTypes.func,
	onSendNotTyping: PropTypes.func,
	onSendTyping: PropTypes.func,
	onSetCurrentMessage: PropTypes.func,
	setBlurred: PropTypes.func,
	setFocused: PropTypes.func,
	timeline: PropTypes.array,
	translate: PropTypes.func,
	twemojiUrl: PropTypes.string,
};

const mapState = state => {
	const currentUser = getCurrentUser( state );
	return {
		chatStatus: getHappychatStatus( state ),
		connectionStatus: getHappychatConnectionStatus( state ),
		currentUserEmail: currentUser.email,
		disabled: ! canUserSendMessages( state ),
		getAuth: () => {}, // TODO
		isConnectionUninitialized: isHappychatConnectionUninitialized( state ),
		/* eslint-disable camelcase */
		isCurrentUser: ( { user_id, source } ) => {
			return user_id.toString() === currentUser.ID.toString() && source === 'customer';
		},
		/* eslint-enable camelcase */
		isExternalUrl: () => true,
		isHappychatEnabled: config.isEnabled( 'happychat' ),
		isServerReachable: isHappychatServerReachable( state ),
		message: getCurrentChatMessage( state ),
		timeline: getHappychatTimeline( state ),
		twemojiUrl: config( 'twemoji_cdn_url' ),
	};
};

const mapDispatch = {
	onInitConnection: initConnection,
	onSendMessage: sendChatMessage,
	onSendNotTyping: () => {
		// TODO
		debug( 'send not typing' );
	},
	onSendTyping: () => {
		// TODO
		debug( 'send typing' );
	},
	onSetCurrentMessage: setChatMessage,
	setBlurred: blur,
	setFocused: focus,
};

export default connect( mapState, mapDispatch )( mockLocalize( HappychatPage ) );
