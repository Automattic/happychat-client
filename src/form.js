/** @format */

/**
 * External dependencies
 */
import React from 'react';
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
import { blur, focus, openChat, setCurrentMessage } from 'src/state/ui/actions';

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
import isChatFormOpen from 'src/state/selectors/is-chatform-open';
import isAvailable from 'src/state/selectors/is-available';

// UI components
import { mockLocalize } from 'src/ui/components/localize'; // TODO implement localize
import { HappychatConnection } from 'src/ui/components/connection';
import { HappychatForm } from 'src/ui/components/happychat-form';
import { ContactForm } from 'src/ui/components/contact-form';
import { MessageForm } from 'src/ui/components/message-form';

export class Form extends React.Component {
	constructor( props ) {
		super( props );
		this.submitForm = this.submitForm.bind( this );
		this.canSubmitForm = this.canSubmitForm.bind( this );
	}

	submitForm( formState ) {
		const { onOpenChat, onSendMessage } = this.props;
		if ( this.canSubmitForm() ) {
			onOpenChat();
			onSendMessage( formState.message );
		}
	}

	canSubmitForm() {
		return this.props.isChatAvailable;
	}

	renderForm() {
		const {
			chatStatus,
			connectionStatus,
			currentUserEmail,
			disabled,
			howCanWeHelpOptions,
			howDoYouFeelOptions,
			isChatOpen,
			isCurrentUser,
			isExternalUrl,
			isServerReachable,
			message,
			onSendMessage,
			onSendNotTyping,
			onSendTyping,
			onSetCurrentMessage,
			setBlurred,
			setFocused,
			timeline,
			translate,
			twemojiUrl,
		} = this.props;

		const contactForm = (
			<ContactForm
				canSubmitForm={ this.canSubmitForm }
				howCanWeHelpOptions={ howCanWeHelpOptions }
				howDoYouFeelOptions={ howDoYouFeelOptions }
				submitForm={ this.submitForm }
			/>
		);
		const chatForm = (
			<HappychatForm
				chatStatus={ chatStatus }
				connectionStatus={ connectionStatus }
				currentUserEmail={ currentUserEmail }
				disabled={ disabled }
				isCurrentUser={ isCurrentUser }
				isExternalUrl={ isExternalUrl }
				isServerReachable={ isServerReachable }
				message={ message }
				onSendMessage={ onSendMessage }
				onSendNotTyping={ onSendNotTyping }
				onSendTyping={ onSendTyping }
				onSetCurrentMessage={ onSetCurrentMessage }
				setBlurred={ setBlurred }
				setFocused={ setFocused }
				timeline={ timeline }
				translate={ translate }
				twemojiUrl={ twemojiUrl }
			/>
		);

		let form = chatForm;
		if ( ! isChatOpen && howCanWeHelpOptions && howCanWeHelpOptions.length > 0 ) {
			form = contactForm;
		}
		return form;
	}

	render() {
		const {
			accessToken,
			getAuth,
			isConnectionUninitialized,
			isHappychatEnabled,
			onInitConnection,
		} = this.props;

		return (
			<div className="happychat-wrapper">
				<HappychatConnection
					accessToken={ accessToken }
					getAuth={ getAuth }
					isConnectionUninitialized={ isConnectionUninitialized }
					isHappychatEnabled={ isHappychatEnabled }
					onInitConnection={ onInitConnection }
				/>

				{ this.renderForm() }
			</div>
		);
	}
}

Form.propTypes = {
	accessToken: PropTypes.string.isRequired,
	howCanWeHelpOptions: PropTypes.array,
	howDoYouFeelOptions: PropTypes.array,
};

const mapState = state => {
	const currentUser = getUser( state );
	return {
		chatStatus: getChatStatus( state ),
		connectionStatus: getConnectionStatus( state ),
		currentUserEmail: currentUser.email,
		disabled: ! canUserSendMessages( state ),
		getAuth: getHappychatAuth( state ),
		isChatOpen: isChatFormOpen( state ),
		isChatAvailable: isAvailable( state ),
		isConnectionUninitialized: isHCConnectionUninitialized( state ),
		isCurrentUser: ( { source } ) => {
			return source === 'customer';
		},
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
	onOpenChat: openChat,
	onSendMessage: sendMessage,
	onSendNotTyping: sendNotTyping,
	onSendTyping: sendTyping,
	onSetCurrentMessage: setCurrentMessage,
	setBlurred: blur,
	setFocused: focus,
};

export default connect( mapState, mapDispatch )( mockLocalize( Form ) );
