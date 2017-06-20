/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import GridIcon from 'gridicons';
import { localize } from 'i18n-calypso';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import {
	blur,
	focus,
	openChat,
	closeChat,
	minimizeChat,
	minimizedChat
} from 'src/state/ui/actions';
import { isHappychatMinimizing, isHappychatOpen } from 'src/state/ui/selectors';
import { getHappychatConnectionStatus } from 'src/state/socket/selectors';
import HappychatConnection from './connection';
import Composer from './composer';
import Notices from './notices';
import Timeline from './timeline';

const debug = debugFactory( 'happychat-embedded:ui' );

/**
 * React component for rendering title bar
 */
const Title = localize( ( { onCloseChat, translate } ) =>
	<div className="happychat__active-toolbar">
		<h4>{translate( 'Support Chat' )}</h4>
		<div onClick={ onCloseChat }>
			<GridIcon icon="cross" />
		</div>
	</div>
);
/*
 * Main chat UI component
 */
class Happychat extends React.Component {
	componentDidMount() {
		debug( 'did mount' );
		this.props.setFocused();
	}

	componentWillUnmount() {
		debug( 'will unmount' );
		this.props.setBlurred();
	}

	render() {
		const { isChatOpen, isMinimizing, onCloseChat } = this.props;

		return (
			<div className="happychat">
				<HappychatConnection />
				<div
					className={ classnames( 'happychat__container', {
						'is-open': isChatOpen,
						'is-minimizing': isMinimizing
					} ) }
				>
					<div className="happychat__title">
						<Title onCloseChat={ onCloseChat } />
					</div>
					<Timeline />
					<Notices />
					<Composer />
				</div>
			</div>
		);
	}
}

const mapState = state => {
	return {
		connectionStatus: getHappychatConnectionStatus( state ),
		isChatOpen: isHappychatOpen( state ),
		isMinimizing: isHappychatMinimizing( state )
	};
};

const mapDispatch = dispatch => {
	return {
		onOpenChat() {
			debug( 'open chat' );
			dispatch( openChat() );
		},
		onCloseChat() {
			debug( 'minimize chat' );
			dispatch( minimizeChat() );
			setTimeout( function() {
				debug( 'close chat' );
				dispatch( minimizedChat() );
				dispatch( closeChat() );
			}, 500 );
		},
		setBlurred() {
			debug( 'set blurred' );
			dispatch( blur() );
		},
		setFocused() {
			debug( 'set focused' );
			dispatch( focus() );
		}
	};
};

export default connect( mapState, mapDispatch )( Happychat );
