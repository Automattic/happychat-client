/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Calypso dependencies
 */

// actions
import {
	initConnection,
	sendMessage,
	onSendNotTyping,
	onSendTyping,
} from 'state/happychat/connection/actions';
import { blur, focus, setCurrentMessage } from 'state/happychat/ui/actions';
import getHappychatChatStatus from 'state/happychat/selectors/get-happychat-chat-status';
import getHappychatCurrentMessage from 'state/happychat/selectors/get-happychat-current-message';

// selectors
import getHappychatConnectionStatus from 'state/happychat/selectors/get-happychat-connection-status';
import getHappychatTimeline from 'state/happychat/selectors/get-happychat-timeline';
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
import { getHappychatAuth } from 'src/lib/wp';
import getCurrentUser from 'src/state/selectors/get-current-user';

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
		chatStatus: getHappychatChatStatus( state ),
		connectionStatus: getHappychatConnectionStatus( state ),
		currentUserEmail: currentUser.email,
		disabled: true, // TODO
		getAuth: getHappychatAuth( state ),
		isConnectionUninitialized: isHappychatConnectionUninitialized( state ),
		/* eslint-disable camelcase */
		isCurrentUser: ( { user_id, source } ) => {
			return user_id.toString() === currentUser.ID.toString() && source === 'customer';
		},
		/* eslint-enable camelcase */
		isExternalUrl: () => true,
		isHappychatEnabled: config.isEnabled( 'happychat' ),
		isServerReachable: isHappychatServerReachable( state ),
		message: getHappychatCurrentMessage( state ),
		timeline: getHappychatTimeline( state ),
		twemojiUrl: config( 'twemoji_cdn_url' ),
	};
};

const mapDispatch = {
	onInitConnection: initConnection,
	onSendMessage: sendMessage,
	onSendNotTyping: onSendNotTyping,
	onSendTyping: onSendTyping,
	onSetCurrentMessage: setCurrentMessage,
	setBlurred: blur,
	setFocused: focus,
};

export default connect( mapState, mapDispatch )( mockLocalize( HappychatPage ) );
