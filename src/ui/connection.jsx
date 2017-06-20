/**
 * External dependencies
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import debugFactory from 'debug';
/**
 * Internal dependencies
 */
import config from 'src/config';
import { connectChat } from 'src/state/socket/actions';
import { isHappychatConnectionUninitialized } from 'src/state/socket/selectors';

const debug = debugFactory( 'happychat-embedded:ui:connection' );

class HappychatConnection extends Component {
	componentDidMount() {
		debug( 'component did mount' );
		if ( config.isEnabled( 'happychat' ) && this.props.isUninitialized ) {
			debug( 'dispatch connect action' );
			this.props.connectChat();
		}
	}

	render() {
		return null;
	}
}

export default connect(
	state => ( {
		isUninitialized: isHappychatConnectionUninitialized( state )
	} ),
	{ connectChat }
)( HappychatConnection );
