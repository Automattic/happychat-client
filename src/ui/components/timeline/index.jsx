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
import Emojify from 'src/ui/components/emojify';
import scrollbleed from 'src/ui/components/scrollbleed';
import { first, when, forEach } from './functional';
import autoscroll from './autoscroll';
import { addSchemeIfMissing, addWooTrackers, setUrlScheme } from './url';
import { recordEvent } from 'src/lib/tracks';
import { sendEvent } from 'src/state/connection/actions';
import getUser from 'src/state/selectors/get-user';

import debugFactory from 'debug';
const debug = debugFactory( 'happychat-client:ui:timeline' );

const linksNotEmpty = ( { links } ) => ! isEmpty( links );

const messageParagraph = ( { message, messageId, isEdited, isOptimistic, twemojiUrl } ) => {
	const classes = classnames( { 'is-optimistic': isOptimistic } );
	return (
		<p key={ messageId } className={ classes }>
			<Emojify twemojiUrl={ twemojiUrl }>{ message }</Emojify>
			{isEdited && <small className="timeline__edited-flag">(edited)</small>}
		</p>
	);
};

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

/*
 * Given a message and array of links contained within that message, returns the message
 * with clickable links inside of it.
 */
const messageWithLinks = ( { message, messageId, isEdited, isOptimistic, links, isExternalUrl, onLinkClick, onLinkMouseDown } ) => {
	const children = links.reduce(
		( { parts, last }, [ url, startIndex, length ] ) => {
			const text = url;
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

			if ( last < startIndex ) {
				parts = parts.concat(
					<span key={ parts.length }>{ message.slice( last, startIndex ) }</span>
				);
			}

			parts = parts.concat(
				<MessageLink key={ parts.length } href={ href } rel={ rel } target={ target } messageId={messageId}>
					{ text }
				</MessageLink>
			);

			return { parts, last: startIndex + length };
		},
		{ parts: [], last: 0 }
	);

	if ( children.last < message.length ) {
		children.parts = children.parts.concat(
			<span key="last">{ message.slice( children.last ) }</span>
		);
	}

	const classes = classnames( { 'is-optimistic': isOptimistic } );

	return (
		<p key={ messageId } className={classes}>
			{ children.parts }
			{ isEdited && <small className="timeline__edited-flag">(edited)</small> }
		</p>
	);
};

/*
 * If a message event has a message with links in it, return a component with clickable links.
 * Otherwise just return a single paragraph with the text.
 */
const messageText = when( linksNotEmpty, messageWithLinks, messageParagraph );

/*
 * Group messages based on user so when any user sends multiple messages they will be grouped
 * within the same message bubble until it reaches a message from a different user.
 */
const renderGroupedMessages = ( { item, isCurrentUser, twemojiUrl, isExternalUrl }, index ) => {
	const [ event, ...rest ] = item;
	return (
		<div
			className={ classnames( 'happychat__timeline-message', {
				'is-user-message': isCurrentUser,
			} ) }
			key={ event.id || index }
		>
			<div className="happychat__message-text">
				{ messageText( {
					message: event.message,
					messageId: event.id,
					isEdited: event.isEdited,
					isOptimistic: event.isOptimistic,
					links: event.links,
					twemojiUrl,
					isExternalUrl,
				} ) }
				{ rest.map( ( { message, isEdited, isOptimistic, id, links } ) =>
					messageText( { message, messageId: id, isEdited, isOptimistic, links, twemojiUrl, isExternalUrl } )
				) }
			</div>
		</div>
	);
};

const itemTypeIs = type => ( { item: [ firstItem ] } ) => firstItem.type === type;

/*
 * Renders a chat bubble with multiple messages grouped by user.
 */
const renderGroupedTimelineItem = first(
	when( itemTypeIs( 'message' ), renderGroupedMessages ),
	( { item: [ firstItem ] } ) => debug( 'no handler for message type', firstItem.type, firstItem )
);

const groupMessages = messages => {
	const grouped = messages.reduce(
		( { user_id, type, group, groups, source }, message ) => {
			const message_user_id = message.user_id;
			const message_type = message.type;
			const message_source = message.source;
			debug( 'compare source', message_source, message.source );

			debug( 'user_id ', user_id );
			debug( 'type ', type );
			debug( 'group ', group );
			debug( 'groups ', groups );
			debug( 'source ', source );
			debug( 'message ', message );
			if ( user_id !== message_user_id || message_type !== type || message_source !== source ) {
				return {
					user_id: message_user_id,
					type: message_type,
					source: message_source,
					group: [ message ],
					groups: group ? groups.concat( [ group ] ) : groups,
				};
			}

			// it's the same user so group it together
			return { user_id, group: group.concat( [ message ] ), groups, type, source };
		},
		{ groups: [] }
	);

	return grouped.groups.concat( [ grouped.group ] );
};

const renderWelcomeMessage = ( { currentUserEmail, currentUserGroup, translate } ) => (
	<div className="happychat__welcome">
		<p>
			{ translate(
				`Welcome to ${ currentUserGroup } support chat! We'll send a transcript to ${ currentUserEmail } at the end of the chat.`
			) }
		</p>
	</div>
);

const timelineHasContent = ( { timeline } ) => isArray( timeline ) && ! isEmpty( timeline );

const renderTimeline = ( {
	timeline,
	hasUnreadMessages,
	isCurrentUser,
	isExternalUrl,
	onScrollContainer,
	onUnreadMessagesButtonClick,
	scrollbleedLock,
	scrollbleedUnlock,
	twemojiUrl,
} ) => (
	<Fragment>
		<div
			className="happychat__conversation"
			ref={ onScrollContainer }
			onMouseEnter={ scrollbleedLock }
			onMouseLeave={ scrollbleedUnlock }
		>
			{ groupMessages( timeline ).map( item =>
				renderGroupedTimelineItem( {
					item,
					isCurrentUser: isCurrentUser( item[ 0 ] ),
					isExternalUrl,
					twemojiUrl,
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

const chatTimeline = when( timelineHasContent, renderTimeline, renderWelcomeMessage );

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
		twemojiUrl: PropTypes.string,
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
		const { onScrollContainer } = this.props;
		return chatTimeline(
			assign( {}, this.props, {
				onScrollContainer: forEach(
					this.setupAutoscroll,
					onScrollContainer,
					this.setScrollbleedTarget
				),
				scrollbleedLock: this.scrollbleedLock,
				scrollbleedUnlock: this.scrollbleedUnlock,
				onUnreadMessagesButtonClick: this.handleUnreadMessagesButtonClick,
			} )
		);
	},
} );
