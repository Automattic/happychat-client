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
	requestFallbackTicket,
	sendMessage,
	sendNotTyping,
	sendTyping,
} from 'src/state/connection/actions';
import { blur, focus, openChat, setCurrentMessage } from 'src/state/ui/actions';
import { HAPPYCHAT_FALLBACK_TICKET_NEW } from 'src/state/constants';

// selectors
import getHappychatAuth from 'src/lib/wpcom/get-happychat-auth';
import canUserSendMessages from 'src/state/selectors/can-user-send-messages';
import getChatStatus from 'src/state/selectors/get-chat-status';
import getChatTimeline from 'src/state/selectors/get-chat-timeline';
import getConnectionStatus from 'src/state/selectors/get-connection-status';
import getFallbackTicketStatus from 'src/state/selectors/get-fallbackticket-status';
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

class HappychatSupportProvider {
	constructor( props ) {
		this.props = props;
		this.submitForm = this.submitForm.bind( this );
		this.canSubmitForm = this.canSubmitForm.bind( this );
	}

	canSubmitForm() {
		return this.props.isChatAvailable;
	}

	submitForm( formState ) {
		if ( this.canSubmitForm() ) {
			this.props.onOpenChat();
			this.props.onSendMessage( formState.message );
		}
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
				submitFormText={ 'Chat with us' }
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
}

class TicketSupportProvider {
	constructor( props ) {
		this.props = props;
		this.submitForm = this.submitForm.bind( this );
		this.canSubmitForm = this.canSubmitForm.bind( this );
	}

	canSubmitForm() {
		return true;
	}

	submitForm( formState ) {
		this.props.onRequestFallbackTicket( this.props.fallbackTicketPath, formState.message );
	}

	renderForm() {
		const { fallbackTicketStatus, howCanWeHelpOptions, howDoYouFeelOptions } = this.props;
		let form = (
			<ContactForm
				canSubmitForm={ this.canSubmitForm }
				howCanWeHelpOptions={ howCanWeHelpOptions }
				howDoYouFeelOptions={ howDoYouFeelOptions }
				submitForm={ this.submitForm }
				submitFormText={ 'Send a ticket' }
			/>
		);
		if ( fallbackTicketStatus !== HAPPYCHAT_FALLBACK_TICKET_NEW ) {
			form = <MessageForm message="Sending" />;
		}
		return form;
	}
}

const getSupportProvider = props =>
	props.isChatOpen || ( props.isUserEligibleForChat && props.isChatAvailable )
		? new HappychatSupportProvider( props )
		: new TicketSupportProvider( props );

export class Form extends React.Component {
	render() {
		const {
			accessToken,
			getAuth,
			isConnectionUninitialized,
			isHappychatEnabled,
			onInitConnection,
		} = this.props;

		this.supportProvider = getSupportProvider( this.props );

		return (
			<div>
				<HappychatConnection
					accessToken={ accessToken }
					getAuth={ getAuth }
					isConnectionUninitialized={ isConnectionUninitialized }
					isHappychatEnabled={ isHappychatEnabled }
					onInitConnection={ onInitConnection }
				/>

				{ this.supportProvider.renderForm() }
			</div>
		);
	}
}

Form.propTypes = {
	accessToken: PropTypes.string.isRequired,
	howCanWeHelpOptions: PropTypes.array,
	howDoYouFeelOptions: PropTypes.array,
};

// Whether URL should open a new tab or not.
// Legacy code from Calypso, where it wouldn't open a new window
// if the URL was from WordPress.com.
const isExternalUrl = () => true;

const isCurrentUser = ( { source } ) => {
	return source === 'customer';
};

const mapState = state => {
	const currentUser = getUser( state );
	return {
		isUserEligibleForChat: true, // TODO implement logic
		chatStatus: getChatStatus( state ),
		connectionStatus: getConnectionStatus( state ),
		currentUserEmail: currentUser.email,
		disabled: ! canUserSendMessages( state ),
		fallbackTicketPath: config( 'fallback_ticket_path' ),
		fallbackTicketStatus: getFallbackTicketStatus( state ),
		getAuth: getHappychatAuth( state ),
		isChatOpen: isChatFormOpen( state ),
		isChatAvailable: isAvailable( state ),
		isConnectionUninitialized: isHCConnectionUninitialized( state ),
		isCurrentUser,
		isExternalUrl,
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
	onRequestFallbackTicket: requestFallbackTicket,
	onSendMessage: sendMessage,
	onSendNotTyping: sendNotTyping,
	onSendTyping: sendTyping,
	onSetCurrentMessage: setCurrentMessage,
	setBlurred: blur,
	setFocused: focus,
};

export default connect( mapState, mapDispatch )( mockLocalize( Form ) );
