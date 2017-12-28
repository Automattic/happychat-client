/** @format */

/**
 * External dependencies
 */
import React from 'react';
import debugFactory from 'debug';
const debug = debugFactory( 'happychat-client:ui:contact-form' );

/**
 * Internal dependencies
 */
import FormTextarea from 'src/ui/components/form-textarea';
import FormLabel from 'src/ui/components/form-label';
import FormButton from 'src/ui/components/form-button';

export class ContactForm extends React.Component {
	submitForm() {
		debug( 'submit form' );
	}

	handleChange() {
		debug( 'handle change' );
	}

	canSubmitForm() {
		debug( 'canSubmitForm' );
		return true;
	}

	render() {
		return (
			<div className="help-contact-form">
				<FormLabel>What are you trying to do?</FormLabel>
				<FormTextarea
					placeholder="Please be descriptive"
					name="message"
					onChange={ this.handleChange }
				/>
				<FormButton disabled={ ! this.canSubmitForm() } type="button" onClick={ this.submitForm }>
					Send
				</FormButton>
			</div>
		);
	}
}
