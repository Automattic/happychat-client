/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import hasUnreadMessages from 'src/state/selectors/has-unread-messages';

export class ChatButton extends Component {
	static propTypes = {
		hasUnread: PropTypes.bool,
		onClick: PropTypes.func,
	};

	render() {
		const { hasUnread } = this.props;
		const classes = classnames( 'chat-button', {
			'has-unread': hasUnread,
		} );

		return (
			<a className={ classes } onClick={ this.props.onClick }>
				{ this.props.children }
			</a>
		);
	}
}

export default connect( state => ( {
	hasUnread: hasUnreadMessages( state ),
} ) )( ChatButton );
