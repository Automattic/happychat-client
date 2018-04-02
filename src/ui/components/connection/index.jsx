/** @format */

/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

export class HappychatConnection extends Component {
	componentDidMount() {
		if ( this.props.isHappychatEnabled && this.props.isConnectionUninitialized ) {
			this.props.onInitConnection( this.props.authentication() );
		}
	}

	render() {
		return null;
	}
}

HappychatConnection.propTypes = {
	authentication: PropTypes.func,
	isConnectionUninitialized: PropTypes.bool,
	isHappychatEnabled: PropTypes.bool,
	onInitConnection: PropTypes.func,
};
