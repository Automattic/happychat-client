/** @format */

/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assign from 'lodash/assign';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import GridiconArrowDown from 'gridicons/dist/arrow-down';

/**
 * Internal dependencies
 */
import Button from 'src/ui/components/button';
import scrollbleed from 'src/ui/components/scrollbleed';
import { first, when, forEach } from './functional';
import autoscroll from './autoscroll';
import { addSchemeIfMissing, addWooTrackers, setUrlScheme } from './url';
import { recordEvent } from 'src/lib/tracks';
import { sendEvent } from 'src/state/connection/actions';
import getUser from 'src/state/selectors/get-user';

import debugFactory from 'debug';
const debug = debugFactory( 'happychat-client:ui:timeline' );

class MessageLink extends React.Component {
	handleClick = evt => {
		const { href, messageId, sendEventMessage, user } = this.props;

		sendEventMessage( `Opened ${href}` );
		recordEvent( 'happychatclient_message_link_opened', {
			message_id: messageId,
			user_id: user.ID,
			href
		} );
	};

	handleMouseDown = evt => {
		const { href, messageId, sendEventMessage, user } = this.props;

		// Ignore left-clicks, the onClick handler will catch these
		if (evt.button === 0) {
			return;
		}

		this.props.sendEventMessage( `Alt-clicked ${href}` );
		recordEvent( 'happychatclient_message_link_alt_click', {
			message_id: messageId,
			user_id: user.ID,
			href
		} );
	};

	render() {
		const { children, href, key, rel, target } = this.props;
		return (
			<a
				href={ href }
				rel={ rel }
				target={ target }
				onClick={ this.handleClick }
				onMouseDown={ this.handleMouseDown }
			>
				{ children }
			</a>
		);
	}
}

MessageLink = connect(
	state => ({ user: getUser(state) }),
	{ sendEventMessage: sendEvent },
)(MessageLink);

/**
 * Takes a message with formatting data and returns an array of components with formatting applied.
 */
const formattedMessageContent = ( { message, messageId, links = [], isExternalUrl } ) => {
	const children = [];
	let lastIndex = 0;

	links.forEach( ( [ url, linkStartIndex, length ] ) => {
		// If there's text before this link, add it.
		if ( lastIndex < linkStartIndex ) {
			children.push( message.slice( lastIndex, linkStartIndex ) );
		}

		let href = url;
		let rel = null;
		let target = null;

		href = addSchemeIfMissing( href, 'http' );
		href = addWooTrackers( href );
		if ( isExternalUrl( href ) ) {
			rel = 'noopener noreferrer';
			target = '_blank';
		} else if ( typeof window !== 'undefined' ) {
			// Force internal URLs to the current scheme to avoid a page reload
			const scheme = window.location.protocol.replace( /:+$/, '' );
			href = setUrlScheme( href, scheme );
		}

		children.push(
			<MessageLink href={ href } rel={ rel } target={ target } messageId={messageId}>{ url }</MessageLink>
		);

		lastIndex = linkStartIndex + length;
	} );

	if ( lastIndex < message.length ) {
		children.push( message.slice( lastIndex ) );
	}

	return children.map( ( child, index ) => <Fragment key={index}>{child}</Fragment> );
};

/*
 * Returns the formatted message component
 */
const renderMessage = ( { message, messageId, isEdited, isOptimistic, links, isExternalUrl, } ) => {
	return (
		<p key={ messageId } className={classnames( { 'is-optimistic': isOptimistic } )}>
			{ formattedMessageContent( { message, messageId, links, isExternalUrl } ) }
			{ isEdited && <small className="timeline__edited-flag">(edited)</small> }
		</p>
	);
};

/*
 * Group messages based on user so when any user sends multiple messages they will be grouped
 * within the same message bubble until it reaches a message from a different user.
 */
const renderGroupedMessages = ( { messages, isCurrentUser, isExternalUrl }, index ) => {
	return (
		<div
			className={ classnames( 'happychat__timeline-message', {
				'is-user-message': isCurrentUser,
			} ) }
			key={ messages[0].id || index }
		>
			<div className="happychat__message-text">
				{ messages.map( ( { message, isEdited, isOptimistic, id, links } ) =>
					renderMessage( { message, messageId: id, isEdited, isOptimistic, links, isExternalUrl } )
				) }
			</div>
		</div>
	);
};

const groupMessages = messages => {
	const groups = [];
	let user_id, type, source;

	messages.forEach( message => {
		if ( user_id !== message.user_id || type !== message.type || source !== message.source ) {
			// This message is not like the others in this group, start a new group...
			groups.push([]);
			// ... and update the comparison variables to what we expect to find in this new group.
			( { user_id, type, source } = message );
		}

		// Add this message to the last group.
		groups[ groups.length - 1 ].push( message );
	} );

	return groups;
};

const renderTimeline = ( {
	timeline,
	hasUnreadMessages,
	isCurrentUser,
	isExternalUrl,
	onScrollContainer,
	onUnreadMessagesButtonClick,
	scrollbleedLock,
	scrollbleedUnlock,
} ) => (
	<Fragment>
		<div
			className="happychat__conversation"
			ref={ onScrollContainer }
			onMouseEnter={ scrollbleedLock }
			onMouseLeave={ scrollbleedUnlock }
		>
			{ groupMessages( timeline ).map( messages =>
				renderGroupedMessages( {
					messages,
					isCurrentUser: isCurrentUser( messages[ 0 ] ),
					isExternalUrl,
				} )
			) }
		</div>
		{ hasUnreadMessages &&
			<div className="happychat__unread-messages-button-container">
				<Button
					primary
					className="happychat__unread-messages-button"
					onClick={ onUnreadMessagesButtonClick }
				>
					New messages <GridiconArrowDown />
				</Button>
			</div>
		}
	</Fragment>
);

export const Timeline = createReactClass( {
	displayName: 'Timeline',
	mixins: [ autoscroll, scrollbleed ],

	propTypes: {
		currentUserEmail: PropTypes.string,
		currentUserGroup: PropTypes.string,
		isCurrentUser: PropTypes.func,
		isExternalUrl: PropTypes.func,
		onScrollContainer: PropTypes.func,
		timeline: PropTypes.array,
		translate: PropTypes.func,
		onAutoscrollChanged: PropTypes.func,
		hasUnreadMessages: PropTypes.bool,
	},

	getDefaultProps() {
		return {
			onScrollContainer: () => {},
			isExternalUrl: () => true,
		};
	},

	handleUnreadMessagesButtonClick() {
		this.setAutoscroll( true );
		recordEvent( 'happychatclient_unread_messages_button_click' );
	},

	componentDidUpdate( prevProps ) {
		if (prevProps.hasUnreadMessages !== this.props.hasUnreadMessages ) {
			if ( this.props.hasUnreadMessages ) {
				recordEvent( 'happychatclient_unread_messages_button_show' );
			} else {
				recordEvent( 'happychatclient_unread_messages_button_hide' );
			}
		}
	},

	render() {
		const { currentUserEmail, currentUserGroup, onScrollContainer, timeline, translate } = this.props;

		if ( isEmpty( timeline ) ) {
			return (
				<div className="happychat__welcome">
					<p>
						{ translate(
							`Welcome to ${ currentUserGroup } support chat! We'll send a transcript to ${ currentUserEmail } at the end of the chat.`
						) }
					</p>
				</div>
			);
		}

		return renderTimeline( {
			...this.props,
			onScrollContainer: forEach(
				this.setupAutoscroll,
				onScrollContainer,
				this.setScrollbleedTarget
			),
			scrollbleedLock: this.scrollbleedLock,
			scrollbleedUnlock: this.scrollbleedUnlock,
			onUnreadMessagesButtonClick: this.handleUnreadMessagesButtonClick,
		} );
	},
} );
