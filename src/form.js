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
import {
	HAPPYCHAT_FALLBACK_TICKET_NEW,
	HAPPYCHAT_FALLBACK_TICKET_SENDING,
	HAPPYCHAT_FALLBACK_TICKET_SUCCESS,
	HAPPYCHAT_FALLBACK_TICKET_FAILURE,
	HAPPYCHAT_FALLBACK_TICKET_TIMEOUT,
} from 'src/state/constants';

// selectors
import getHappychatAuth from 'src/lib/wpcom/get-happychat-auth';
import canUserSendMessages from 'src/state/selectors/can-user-send-messages';
import getChatStatus from 'src/state/selectors/get-chat-status';
import getChatTimeline from 'src/state/selectors/get-chat-timeline';
import getConnectionStatus from 'src/state/selectors/get-connection-status';
import getFallbackTicketResponse from 'src/state/selectors/get-fallbackticket-response';
import getFallbackTicketStatus from 'src/state/selectors/get-fallbackticket-status';
import getUser from 'src/state/selectors/get-user';
import getUICurrentMessage from 'src/state/selectors/get-ui-currentmessage';
import isHCConnectionUninitialized from 'src/state/selectors/is-connection-uninitialized';
import isHCServerReachable from 'src/state/selectors/is-server-reachable';
import isChatFormOpen from 'src/state/selectors/is-chatform-open';
import isAvailable from 'src/state/selectors/is-available';
import isUIReady from 'src/state/selectors/is-ui-ready';

// UI components
import { mockLocalize } from 'src/ui/components/localize'; // TODO implement localize
import { HappychatConnection } from 'src/ui/components/connection';
import { HappychatForm } from 'src/ui/components/happychat-form';
import { ContactForm } from 'src/ui/components/contact-form';
import { MessageForm } from 'src/ui/components/message-form';
import Card from 'src/ui/components/card';
import CompactCard from 'src/ui/components/card/compact';
import FormLabel from 'src/ui/components/form-label';
import SpinnerLine from 'src/ui/components/spinner-line';

const ENTRY_FORM = 'form';
const ENTRY_CHAT = 'chat';

class ChatComponent {
	constructor( props ) {
		this.props = props;
	}

	render() {
		const {
			chatStatus,
			connectionStatus,
			currentUserEmail,
			disabled,
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

		return (
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
	}
}

class ChatFormComponent {
	constructor( props ) {
		this.props = props;
		this.canSubmitForm = this.canSubmitForm.bind( this );
		this.submitForm = this.submitForm.bind( this );
		this.render = this.render.bind( this );
	}

	canSubmitForm() {
		const { isUserEligibleForChat, isChatAvailable } = this.props;
		return isUserEligibleForChat && isChatAvailable;
	}

	submitForm( formState ) {
		this.props.onOpenChat();
		this.props.onSendMessage( formState.message );
	}

	render() {
		const { entryOptions: { primaryOptions, secondaryOptions } } = this.props;
		return (
			<ContactForm
				canSubmitForm={ this.canSubmitForm }
				primaryOptions={ primaryOptions }
				secondaryOptions={ secondaryOptions }
				submitForm={ this.submitForm }
				submitFormText={ 'Chat with us' }
			/>
		);
	}
}

class TicketFormComponent {
	constructor( props ) {
		this.props = props;
		this.canSubmitForm = this.canSubmitForm.bind( this );
		this.submitForm = this.submitForm.bind( this );
		this.render = this.render.bind( this );
	}

	canSubmitForm() {
		return this.props.entryOptions && this.props.entryOptions.fallbackTicketPath;
	}

	submitForm( formState ) {
		this.props.onRequestFallbackTicket( this.props.entryOptions.fallbackTicketPath, formState );
	}

	render() {
		const {
			fallbackTicketResponse,
			fallbackTicketUrl,
			fallbackTicketStatus,
			entryOptions,
		} = this.props;

		let form;
		switch ( fallbackTicketStatus ) {
			case HAPPYCHAT_FALLBACK_TICKET_SENDING:
				form = <MessageForm message="Sending ticket..." />;
				break;
			case HAPPYCHAT_FALLBACK_TICKET_FAILURE:
				form = <MessageForm message="Sorry, ticket could not be created - something went wrong." />;
				break;
			case HAPPYCHAT_FALLBACK_TICKET_SUCCESS:
				const link = fallbackTicketUrl + fallbackTicketResponse;
				form = (
					<div className="message-form">
						<CompactCard>
							<p className="message-form__header-title">Contact Us</p>
						</CompactCard>
						<Card>
							<FormLabel>
								Thanks! Ticket{' '}
								<a href={ link } target="_blank">
									{ fallbackTicketResponse }
								</a>{' '}
								has been successfully created.
							</FormLabel>
						</Card>
					</div>
				);
				break;
			case HAPPYCHAT_FALLBACK_TICKET_TIMEOUT:
				form = <MessageForm message="Sorry, ticket could not be created - API timed out." />;
				break;
			case HAPPYCHAT_FALLBACK_TICKET_NEW:
			default:
				form = (
					<ContactForm
						canSubmitForm={ this.canSubmitForm }
						primaryOptions={ entryOptions.primaryOptions }
						secondaryOptions={ entryOptions.secondaryOptions }
						submitForm={ this.submitForm }
						submitFormText={ 'Send a ticket' }
					/>
				);
		}
		return form;
	}
}

class FormComponent {
	constructor( props ) {
		this.props = props;
	}

	getSupportVariation() {
		if (
			! this.props.entryOptions.fallbackTicketPath ||
			( this.props.isUserEligibleForChat && this.props.isChatAvailable )
		) {
			return new ChatFormComponent( this.props );
		}
		return new TicketFormComponent( this.props );
	}

	render() {
		return this.getSupportVariation().render();
	}
}

class LoadingComponent {
	render() {
		return <SpinnerLine />;
	}
}

class Form extends React.Component {
	constructor( props ) {
		super( props );
		this.getSupportComponent = this.getSupportComponent.bind( this );
	}

	getSupportComponent() {
		const { entry, isChatOpen, isFormUIReady } = this.props;
		if ( ENTRY_FORM === entry ) {
			if ( isChatOpen ) {
				return new ChatComponent( this.props );
			} else if ( ! isFormUIReady ) {
				return new LoadingComponent();
			}
			return new FormComponent( this.props );
		}
		// ENTRY_CHAT: show chat as the entry point for Happychat.
		return new ChatComponent( this.props );
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
			<div>
				<HappychatConnection
					accessToken={ accessToken }
					getAuth={ getAuth }
					isConnectionUninitialized={ isConnectionUninitialized }
					isHappychatEnabled={ isHappychatEnabled }
					onInitConnection={ onInitConnection }
				/>

				{ this.getSupportComponent().render() }
			</div>
		);
	}
}

Form.propTypes = {
	accessToken: PropTypes.string.isRequired,
	entry: PropTypes.string,
	entryOptions: PropTypes.object,
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
		fallbackTicketResponse: getFallbackTicketResponse( state ),
		fallbackTicketUrl: config( 'fallback_ticket_url' ),
		fallbackTicketStatus: getFallbackTicketStatus( state ),
		getAuth: getHappychatAuth( state ),
		isChatOpen: isChatFormOpen( state ),
		isChatAvailable: isAvailable( state ),
		isConnectionUninitialized: isHCConnectionUninitialized( state ),
		isCurrentUser,
		isExternalUrl,
		isHappychatEnabled: config.isEnabled( 'happychat' ),
		isServerReachable: isHCServerReachable( state ),
		isFormUIReady: isUIReady( state ),
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
export { ENTRY_FORM, ENTRY_CHAT };
