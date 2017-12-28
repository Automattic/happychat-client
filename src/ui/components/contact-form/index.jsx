/** @format */

/**
 * External dependencies
 */
import React from 'react';
import debugFactory from 'debug';
const debug = debugFactory( 'happychat-client:ui:contact-form' );

export class ContactForm extends React.Component {
	submitForm() {
		debug( 'submit form' );
	}

	render() {
		return (
			<div className="help-contact-form">
				<textarea placeholder="Please, be descriptive" />
				<button onClick={ this.submitForm } />
			</div>
		);
	}
}
