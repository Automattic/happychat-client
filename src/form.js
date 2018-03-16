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
import { setEligibility } from 'src/state/user/actions';
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
import getFallbackTicketHeaders from 'src/state/selectors/get-fallbackticket-headers';
import getFallbackTicketPathToCreate from 'src/state/selectors/get-fallbackticket-path-create';
import getFallbackTicketPathToShow from 'src/state/selectors/get-fallbackticket-path-show';
import getFallbackTicketResponse from 'src/state/selectors/get-fallbackticket-response';
import getFallbackTicketStatus from 'src/state/selectors/get-fallbackticket-status';
import getUser from 'src/state/selectors/get-user';
import getUserGroupExpanded from 'src/state/selectors/get-user-group-expanded';
import getUserEligibility from 'src/state/selectors/get-user-eligibility';
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
			currentUserGroup,
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
				currentUserGroup={ currentUserGroup }
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
		this.onEvent = this.onEvent.bind( this );
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

	onEvent( formState ) {
		if (
			false === this.props.canChat ||
			false === formState.primarySelected.canChat ||
			false === formState.secondarySelected.canChat ||
			false === formState.itemSelected.canChat
		) {
			this.props.onSetEligibility( false );
		} else {
			this.props.onSetEligibility( true );
		}
	}

	render() {
		const {
			entryOptions: {
				formTitle,
				primaryOptions,
				primaryOptionsTitle,
				secondaryOptions,
				secondaryOptionsTitle,
				itemList,
				itemListTitle,
			},
		} = this.props;
		return (
			<ContactForm
				canSubmitForm={ this.canSubmitForm }
				formTitle={ formTitle }
				primaryOptions={ primaryOptions }
				primaryOptionsTitle={ primaryOptionsTitle }
				secondaryOptions={ secondaryOptions }
				secondaryOptionsTitle={ secondaryOptionsTitle }
				itemList={ itemList }
				itemListTitle={ itemListTitle }
				showSubject={ false }
				submitForm={ this.submitForm }
				submitFormText={ 'Chat with us' }
				onEvent={ this.onEvent }
			/>
		);
	}
}

class TicketFormComponent {
	constructor( props ) {
		this.props = props;
		this.canSubmitForm = this.canSubmitForm.bind( this );
		this.submitForm = this.submitForm.bind( this );
		this.onEvent = this.onEvent.bind( this );
		this.render = this.render.bind( this );
	}

	canSubmitForm() {
		return this.props.fallbackTicketPathToCreate;
	}

	submitForm( formState ) {
		const { fallbackTicketPathToCreate, fallbackTicketHeaders } = this.props;
		this.props.onRequestFallbackTicket( {
			path: fallbackTicketPathToCreate,
			headers: fallbackTicketHeaders,
			payload: formState,
		} );
	}

	onEvent( formState ) {
		if (
			false === this.props.canChat ||
			false === formState.primarySelected.canChat ||
			false === formState.secondarySelected.canChat ||
			false === formState.itemSelected.canChat
		) {
			this.props.onSetEligibility( false );
		} else {
			this.props.onSetEligibility( true );
		}
	}

	render() {
		const {
			fallbackTicketResponse,
			fallbackTicketStatus,
			fallbackTicketPathToShow,
			entryOptions: {
				formTitle,
				primaryOptions,
				primaryOptionsTitle,
				secondaryOptions,
				secondaryOptionsTitle,
				itemList,
				itemListTitle,
			},
		} = this.props;

		let form;
		switch ( fallbackTicketStatus ) {
			case HAPPYCHAT_FALLBACK_TICKET_SENDING:
				form = <MessageForm message="Sending ticket..." />;
				break;
			case HAPPYCHAT_FALLBACK_TICKET_FAILURE:
				form = (
					<MessageForm message="Sorry, ticket could not be created - something went wrong." />
				);
				break;
			case HAPPYCHAT_FALLBACK_TICKET_SUCCESS:
				let hideLink = false;
				if ( ! fallbackTicketPathToShow || ! fallbackTicketResponse ) {
					hideLink = true;
				}
				form = (
					<div className="message-form">
						<CompactCard>
							<p className="message-form__header-title">
								Contact Us
							</p>
						</CompactCard>
						<Card>
							{hideLink ? (
								<FormLabel>
									Thanks! Ticket has been
									successfully created.
								</FormLabel>
							) : (
								<FormLabel>
									Thanks! Ticket{' '}
									<a
										href={ fallbackTicketPathToShow.replace(
											'<ticket-id>',
											fallbackTicketResponse
										) }
										target="_blank"
									>
										{
											fallbackTicketResponse
										}
									</a>{' '}
									has been successfully
									created.
								</FormLabel>
							)}
						</Card>
					</div>
				);
				break;
			case HAPPYCHAT_FALLBACK_TICKET_TIMEOUT:
				form = (
					<MessageForm message="Sorry, ticket could not be created - API timed out." />
				);
				break;
			case HAPPYCHAT_FALLBACK_TICKET_NEW:
			default:
				form = (
					<ContactForm
						canSubmitForm={ this.canSubmitForm }
						formTitle={ formTitle }
						primaryOptions={ primaryOptions }
						primaryOptionsTitle={ primaryOptionsTitle }
						secondaryOptions={ secondaryOptions }
						secondaryOptionsTitle={ secondaryOptionsTitle }
						itemList={ itemList }
						itemListTitle={ itemListTitle }
						showSubject={ true }
						submitForm={ this.submitForm }
						submitFormText={ 'Send a ticket' }
						onEvent={ this.onEvent }
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
		const {
			fallbackTicketPathToCreate,
			isUserEligibleForChat,
			isChatAvailable,
		} = this.props;
		if ( ! fallbackTicketPathToCreate || ( isUserEligibleForChat && isChatAvailable ) ) {
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

				{this.getSupportComponent().render()}
			</div>
		);
	}
}

Form.propTypes = {
	accessToken: PropTypes.string.isRequired,
	canChat: PropTypes.bool,
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
		isUserEligibleForChat: getUserEligibility( state ),
		chatStatus: getChatStatus( state ),
		connectionStatus: getConnectionStatus( state ),
		currentUserEmail: currentUser.email,
		currentUserGroup: getUserGroupExpanded( state ),
		disabled: ! canUserSendMessages( state ),
		fallbackTicketHeaders: getFallbackTicketHeaders( state ),
		fallbackTicketPathToCreate: getFallbackTicketPathToCreate( state ),
		fallbackTicketPathToShow: getFallbackTicketPathToShow( state ),
		fallbackTicketResponse: getFallbackTicketResponse( state ),
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
	onSetEligibility: setEligibility,
	setBlurred: blur,
	setFocused: focus,
};

export default connect( mapState, mapDispatch )( mockLocalize( Form ) );
export { ENTRY_FORM, ENTRY_CHAT };
