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
import CompactCard from 'src/ui/components/card/compact';
import Card from 'src/ui/components/card';

export class MessageForm extends React.Component {
	render() {
		const { message } = this.props;
		const createMarkup = contents => ( { __html: contents } );
		return (
			<div className="message-form">
				<CompactCard>
					<p className="message-form__header-title">Contact Us</p>
				</CompactCard>
				<Card>
					<FormLabel dangerouslySetInnerHTML={ createMarkup( message ) } />
				</Card>
			</div>
		);
	}
}

MessageForm.propTypes = {
	message: PropTypes.string,
	html: PropTypes.string,
};
