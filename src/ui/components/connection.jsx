/** @format */

/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

export class HappychatConnection extends Component {
	componentDidMount() {
		if ( this.props.isHappychatEnabled && this.props.isConnectionUninitialized ) {
			this.props.initConnection( this.props.getAuth( this.props.accessToken ) );
		}
	}

	render() {
		return null;
	}
}

HappychatConnection.propTypes = {
	accessToken: PropTypes.string,
	getAuth: PropTypes.func,
	isConnectionUninitialized: PropTypes.bool,
	isHappychatEnabled: PropTypes.bool,
	initConnection: PropTypes.func,
};
