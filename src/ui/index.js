/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import config from 'src/config';

// actions
import {
	initConnection,
	sendMessage,
	sendNotTyping,
	sendTyping,
} from 'src/state/connection/actions';
import { blur, focus, setCurrentMessage } from 'src/state/ui/actions';

// selectors
import getHappychatAuth from 'src/lib/wpcom/get-happychat-auth';
import canUserSendMessages from 'src/state/selectors/can-user-send-messages';
import getChatStatus from 'src/state/selectors/get-chat-status';
import getChatTimeline from 'src/state/selectors/get-chat-timeline';
import getConnectionStatus from 'src/state/selectors/get-connection-status';
import getUser from 'src/state/selectors/get-user';
import getUICurrentMessage from 'src/state/selectors/get-ui-currentmessage';
import isHCConnectionUninitialized from 'src/state/selectors/is-connection-uninitialized';
import isHCServerReachable from 'src/state/selectors/is-server-reachable';

// UI components
import { mockLocalize } from 'src/ui/components/localize'; // TODO implement localize
import { HappychatConnection } from 'src/ui/components/connection';
import { Composer } from 'src/ui/components/composer';
import { Notices } from 'src/ui/components/notices';
import { Timeline } from 'src/ui/components/timeline';

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
			accessToken,
			chatStatus,
			connectionStatus,
			currentUserEmail,
			disabled,
			getAuth,
			isConnectionUninitialized,
			isCurrentUser,
			isExternalUrl,
			isHappychatEnabled,
			isServerReachable,
			message,
			onInitConnection,
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
					accessToken={ accessToken }
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
	accessToken: PropTypes.string,
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
	const currentUser = getUser( state );
	return {
		chatStatus: getChatStatus( state ),
		connectionStatus: getConnectionStatus( state ),
		currentUserEmail: currentUser.email,
		disabled: ! canUserSendMessages( state ),
		getAuth: getHappychatAuth( state ),
		isConnectionUninitialized: isHCConnectionUninitialized( state ),
		/* eslint-disable camelcase */
		isCurrentUser: ( { user_id, source } ) => {
			return user_id.toString() === currentUser.ID.toString() && source === 'customer';
		},
		/* eslint-enable camelcase */
		isExternalUrl: () => true,
		isHappychatEnabled: config.isEnabled( 'happychat' ),
		isServerReachable: isHCServerReachable( state ),
		message: getUICurrentMessage( state ),
		timeline: getChatTimeline( state ),
		twemojiUrl: config( 'twemoji_cdn_url' ),
	};
};

const mapDispatch = {
	onInitConnection: initConnection,
	onSendMessage: sendMessage,
	onSendNotTyping: sendNotTyping,
	onSendTyping: sendTyping,
	onSetCurrentMessage: setCurrentMessage,
	setBlurred: blur,
	setFocused: focus,
};

export default connect( mapState, mapDispatch )( mockLocalize( HappychatPage ) );
