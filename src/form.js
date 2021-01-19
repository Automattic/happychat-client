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
import authenticator from 'src/lib/auth';
import { recordEvent } from 'src/lib/tracks';

// actions
import {
	initConnection,
	requestFallbackTicket,
	sendMessage,
	sendNotTyping,
	sendTyping,
	setChatFields,
} from 'src/state/connection/actions';
import { blur, focus, openChat, setCurrentMessage, resetForm, setIsDisplayingNewMessages } from 'src/state/ui/actions';
import { setEligibility } from 'src/state/user/actions';
import {
	HAPPYCHAT_FALLBACK_TICKET_NEW,
	HAPPYCHAT_FALLBACK_TICKET_INFLIGHT,
	HAPPYCHAT_FALLBACK_TICKET_SUCCESS,
	HAPPYCHAT_FALLBACK_TICKET_FAILURE,
	HAPPYCHAT_FALLBACK_TICKET_TIMEOUT,
} from 'src/state/constants';

// selectors
import canUserSendMessages from 'src/state/selectors/can-user-send-messages';
import getChatStatus from 'src/state/selectors/get-chat-status';
import getChatTimeline from 'src/state/selectors/get-chat-timeline';
import getConnectionStatus from 'src/state/selectors/get-connection-status';
import getFallbackTicketHeaders from 'src/state/selectors/get-fallbackticket-headers';
import getFallbackTicketUrl from 'src/state/selectors/get-fallbackticket-url';
import getFallbackTicketParseResponse from 'src/state/selectors/get-fallbackticket-parseresponse';
import getFallbackTicketMethod from 'src/state/selectors/get-fallbackticket-method';
import getFallbackTicketTimeout from 'src/state/selectors/get-fallbackticket-timeout';
import getFallbackTicketMsgTimeout from 'src/state/selectors/get-fallbackticket-msgtimeout';
import getFallbackTicketMsgInFlight from 'src/state/selectors/get-fallbackticket-msginflight';
import getFallbackTicketPayload from 'src/state/selectors/get-fallbackticket-payload';
import getFallbackTicketResponse from 'src/state/selectors/get-fallbackticket-response';
import getFallbackTicketStatus from 'src/state/selectors/get-fallbackticket-status';
import getFormDefaultValues from 'src/state/selectors/get-form-defaultvalues';
import getUser from 'src/state/selectors/get-user';
import getUserGroupExpanded from 'src/state/selectors/get-user-group-expanded';
import getUserEligibility from 'src/state/selectors/get-user-eligibility';
import getUICurrentMessage from 'src/state/selectors/get-ui-currentmessage';
import isHCConnectionUninitialized from 'src/state/selectors/is-connection-uninitialized';
import isHCServerReachable from 'src/state/selectors/is-server-reachable';
import isChatFormOpen from 'src/state/selectors/is-chatform-open';
import isAvailable from 'src/state/selectors/is-available';
import isUIReady from 'src/state/selectors/is-ui-ready';
import isOperatorTyping from 'src/state/selectors/is-operator-typing';
import hasUnreadMessages from 'src/state/selectors/has-unread-messages';

// UI components
import { mockLocalize } from 'src/ui/components/localize'; // TODO implement localize
import { HappychatConnection } from 'src/ui/components/connection';
import { HappychatForm } from 'src/ui/components/happychat-form';
import { ContactForm } from 'src/ui/components/contact-form';
import { MessageForm } from 'src/ui/components/message-form';
import SpinnerLine from 'src/ui/components/spinner-line';

const ENTRY_FORM = 'form';
const ENTRY_CHAT = 'chat';

const recordFormSubmit = supportType => recordEvent( 'happychatclient_form_submit', { support_type: supportType } );

class ChatComponent {
	constructor( props ) {
		this.props = props;
	}

	render() {
		return (
			<HappychatForm { ...this.props } />
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

	submitForm( {
		primaryOptionsTitle,
		primarySelected,
		secondaryOptionsTitle,
		secondarySelected,
		itemListTitle,
		itemSelected,
		message,
		openTextFieldTitle,
		openTextFieldValue,
		openTextAreaTitle,
		openTextAreaValue,
	} ) {
		this.props.onOpenChat();
		openTextAreaValue && this.props.onSendMessage( openTextAreaTitle + '\n ' + openTextAreaValue );
		let warmUpMessage = primarySelected.label ? ( primaryOptionsTitle + ' ' + primarySelected.label + '\n' ) : '';
		warmUpMessage = warmUpMessage + ( secondarySelected.label ? ( secondaryOptionsTitle + ' ' + secondarySelected.label + '\n' ) : '' );
		warmUpMessage = warmUpMessage + ( itemSelected.label ? ( itemListTitle + ' ' + itemSelected.label + '\n' ) : '' );
		( warmUpMessage !== '' ) && this.props.onSendMessage( warmUpMessage );
		openTextFieldValue && this.props.onSendMessage( openTextFieldTitle + ' ' + openTextFieldValue );
		this.props.onSendMessage( message );
		// Send form values in here! (Could also consider sending them _as_ they are switched in the form, but that may get... noisy?)
		this.props.onSetChatFields( {
			openTextArea: openTextAreaTitle + '\n ' + openTextAreaValue,
			warmUpMessage: warmUpMessage,
			openTextField: openTextFieldTitle + ' ' + openTextFieldValue,
		} );
		recordFormSubmit( 'chat' );
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
				defaultValues,
				buttonText: { chat: buttonTextChat },
			},
			plugins,
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
				defaultValues={ defaultValues }
				showSubject={ false }
				submitForm={ this.submitForm }
				submitFormText={ buttonTextChat }
				onEvent={ this.onEvent }
				plugins={ plugins }
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
		this.onResetForm = this.onResetForm.bind( this );
		this.render = this.render.bind( this );
	}

	canSubmitForm() {
		return this.props.fallbackTicketUrl;
	}

	submitForm( formState ) {
		const {
			fallbackTicketUrl,
			fallbackTicketMethod,
			fallbackTicketHeaders,
			fallbackTicketTimeout,
			fallbackTicketParseResponse,
			isChatAvailable,
			isUserEligibleForChat,
		} = this.props;
		this.props.onRequestFallbackTicket( {
			url: fallbackTicketUrl,
			method: fallbackTicketMethod,
			headers: fallbackTicketHeaders,
			payload: {
				...formState,
				isChatOverflow: ( isUserEligibleForChat && ! isChatAvailable ),
			},
			timeout: fallbackTicketTimeout,
			parseResponse: fallbackTicketParseResponse,
		} );
		recordFormSubmit( 'ticket' );
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

	onResetForm( values ) {
		const { onResetForm } = this.props;
		return () => {
			onResetForm( values );
		};
	}

	render() {
		const {
			fallbackTicketStatus,
			fallbackTicketResponse,
			fallbackTicketMsgTimeout,
			fallbackTicketMsgInFlight,
			fallbackTicketPayload,
			defaultValues, // the last values stored in state
			entryOptions: {
				formTitle,
				primaryOptions,
				primaryOptionsTitle,
				secondaryOptions,
				secondaryOptionsTitle,
				itemList,
				itemListTitle,
				openTextArea,
				openTextAreaTitle,
				openTextField,
				openTextFieldTitle,
				buttonText: { ticket: buttonTextTicket },
				defaultValues: initValues, // initial default values: to be used on fallback success
			},
			plugins,
		} = this.props;

		let form;
		switch ( fallbackTicketStatus ) {
			case HAPPYCHAT_FALLBACK_TICKET_INFLIGHT:
				form = <MessageForm message={ fallbackTicketMsgInFlight } />;
				break;
			case HAPPYCHAT_FALLBACK_TICKET_FAILURE:
				form = (
					<MessageForm
						onBack={ this.onResetForm( {
							primary: fallbackTicketPayload.primarySelected.value,
							secondary: fallbackTicketPayload.secondarySelected.value,
							item: fallbackTicketPayload.itemSelected.value,
							subject: fallbackTicketPayload.subject,
							message: fallbackTicketPayload.message,
							openTextField: fallbackTicketPayload.openTextFieldValue,
							openTextArea: fallbackTicketPayload.openTextAreaValue,
						} ) }
						message={ fallbackTicketResponse }
					/>
				);
				break;
			case HAPPYCHAT_FALLBACK_TICKET_SUCCESS:
				form = (
					<MessageForm
						onBack={ this.onResetForm( initValues ) }
						message={ fallbackTicketResponse }
					/>
				);
				break;
			case HAPPYCHAT_FALLBACK_TICKET_TIMEOUT:
				form = (
					<MessageForm
						onBack={ this.onResetForm( {
							primary: fallbackTicketPayload.primarySelected.value,
							secondary: fallbackTicketPayload.secondarySelected.value,
							item: fallbackTicketPayload.itemSelected.value,
							subject: fallbackTicketPayload.subject,
							message: fallbackTicketPayload.message,
							openTextField: fallbackTicketPayload.openTextFieldValue,
							openTextArea: fallbackTicketPayload.openTextAreaValue,
						} ) }
						message={ fallbackTicketMsgTimeout }
					/>
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
						defaultValues={ defaultValues }
						showSubject={ true }
						openTextArea={ openTextArea }
						openTextAreaTitle={ openTextAreaTitle }
						openTextField={ openTextField }
						openTextFieldTitle={ openTextFieldTitle }
						submitForm={ this.submitForm }
						submitFormText={ buttonTextTicket }
						onEvent={ this.onEvent }
						plugins={ plugins }
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
		const { fallbackTicketUrl, isUserEligibleForChat, isChatAvailable } = this.props;
		if ( ! fallbackTicketUrl || ( isUserEligibleForChat && isChatAvailable ) ) {
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
			authentication,
			isConnectionUninitialized,
			isHappychatEnabled,
			onInitConnection,
		} = this.props;

		return (
			<div>
				<HappychatConnection
					authentication={ authentication }
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
	canChat: PropTypes.bool,
	entry: PropTypes.string,
	entryOptions: PropTypes.object,
	plugins: PropTypes.object,
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
		defaultValues: getFormDefaultValues( state ),
		disabled: ! canUserSendMessages( state ),
		fallbackTicketHeaders: getFallbackTicketHeaders( state ),
		fallbackTicketMethod: getFallbackTicketMethod( state ),
		fallbackTicketMsgTimeout: getFallbackTicketMsgTimeout( state ),
		fallbackTicketMsgInFlight: getFallbackTicketMsgInFlight( state ),
		fallbackTicketPayload: getFallbackTicketPayload( state ),
		fallbackTicketResponse: getFallbackTicketResponse( state ),
		fallbackTicketStatus: getFallbackTicketStatus( state ),
		fallbackTicketTimeout: getFallbackTicketTimeout( state ),
		fallbackTicketUrl: getFallbackTicketUrl( state ),
		fallbackTicketParseResponse: getFallbackTicketParseResponse( state ),
		authentication: authenticator.authorizeChat( state ),
		isChatOpen: isChatFormOpen( state ),
		isChatAvailable: isAvailable( state ),
		isConnectionUninitialized: isHCConnectionUninitialized( state ),
		isCurrentUser,
		isExternalUrl,
		isHappychatEnabled: config.isEnabled( 'happychat' ),
		isServerReachable: isHCServerReachable( state ),
		isFormUIReady: isUIReady( state ),
		isOperatorTyping: isOperatorTyping( state ),
		hasUnreadMessages: hasUnreadMessages( state ),
		message: getUICurrentMessage( state ),
		timeline: getChatTimeline( state ),
		twemojiUrl: config( 'twemoji_cdn_url' ),
	};
};

const mapDispatch = {
	onAutoscrollChanged: setIsDisplayingNewMessages,
	onInitConnection: initConnection,
	onOpenChat: openChat,
	onResetForm: resetForm,
	onRequestFallbackTicket: requestFallbackTicket,
	onSendMessage: sendMessage,
	onSendNotTyping: sendNotTyping,
	onSendTyping: sendTyping,
	onSetChatFields: setChatFields,
	onSetCurrentMessage: setCurrentMessage,
	onSetEligibility: setEligibility,
	setBlurred: blur,
	setFocused: focus,
};

export default connect( mapState, mapDispatch )( mockLocalize( Form ) );
export { ENTRY_FORM, ENTRY_CHAT };
