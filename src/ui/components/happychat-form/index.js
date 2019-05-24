/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Composer } from 'src/ui/components/composer';
import { Notices } from 'src/ui/components/notices';
import { Timeline } from 'src/ui/components/timeline';

function TypingIndicator() {
	return (
		<div className="happychat__typing-indicator">
			<span>
				<span />
				<span />
				<span />
			</span>
		</div>
	);
}

/**
 * React component for rendering a happychat client
 */
export class HappychatForm extends Component {
	constructor( props ) {
		super( props );
		this.onUnload = this.onUnload.bind( this );
	}

	componentDidMount() {
		this.props.setFocused();
		window.addEventListener( 'beforeunload', this.onUnload );
	}

	componentWillUnmount() {
		this.props.setBlurred();
		window.removeEventListener( 'beforeunload', this.onUnload );
	}

	onUnload( e ) {
		e.returnValue = 'The chat session will end if the page is reloaded';
		return e.returnValue;
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
			isOperatorTyping,
			isServerReachable,
			message,
			onAutoscrollChanged,
			onSendMessage,
			onSendNotTyping,
			onSendTyping,
			onSetCurrentMessage,
			timeline,
			translate,
			twemojiUrl,
			hasUnreadMessages,
		} = this.props;

		return (
			<div className="happychat__page" aria-live="polite" aria-relevant="additions">
				<div className="card is-compact">
					<p className="contact-form__header-title">
						Chatting with Support
						{ hasUnreadMessages ? <span className="happychat__unread-indicator"></span> : null}
					</p>

				</div>
				<Timeline
					currentUserEmail={ currentUserEmail }
					currentUserGroup={ currentUserGroup }
					isCurrentUser={ isCurrentUser }
					isExternalUrl={ isExternalUrl }
					timeline={ timeline }
					translate={ translate }
					twemojiUrl={ twemojiUrl }
					onAutoscrollChanged={ onAutoscrollChanged }
				/>
				<Notices
					chatStatus={ chatStatus }
					connectionStatus={ connectionStatus }
					isServerReachable={ isServerReachable }
					translate={ translate }
				/>
				{ isOperatorTyping && <TypingIndicator /> }
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

HappychatForm.propTypes = {
	chatStatus: PropTypes.string,
	connectionStatus: PropTypes.string,
	currentUserEmail: PropTypes.string,
	currentUserGroup: PropTypes.string,
	disabled: PropTypes.bool,
	isCurrentUser: PropTypes.func,
	isExternalUrl: PropTypes.func,
	isServerReachable: PropTypes.bool,
	isOperatorTyping: PropTypes.bool,
	message: PropTypes.string,
	onSendMessage: PropTypes.func,
	onSendNotTyping: PropTypes.func,
	onSendTyping: PropTypes.func,
	onSetCurrentMessage: PropTypes.func,
	setBlurred: PropTypes.func,
	setFocused: PropTypes.func,
	timeline: PropTypes.array,
	translate: PropTypes.func,
	twemojiUrl: PropTypes.string,
	onAutoscrollChanged: PropTypes.func,
	hasUnreadMessages: PropTypes.bool,
};
