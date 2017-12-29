/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import FormLabel from 'src/ui/components/form-label';

export class MessageForm extends React.Component {
	render() {
		const { message } = this.props;
		return (
			<div className="message-form">
				<FormLabel>{ message }</FormLabel>
			</div>
		);
	}
}

MessageForm.propTypes = {
	message: PropTypes.string,
};

MessageForm.defaultProps = {
	message: 'We are having problems to offer support at the moment. Please, bear with us.',
};
