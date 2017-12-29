/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

import debugFactory from 'debug';
const debug = debugFactory( 'happychat-client:ui:contact-form' );

/**
 * Internal dependencies
 */
import FormTextarea from 'src/ui/components/form-textarea';
import FormLabel from 'src/ui/components/form-label';
import FormButton from 'src/ui/components/form-button';
import SegmentedControl from 'src/ui/components/segmented-control';

export class ContactForm extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { message: '' };
		this.handleChange = this.handleChange.bind( this );
	}

	handleChange( e ) {
		debug( 'setState to ', e.target.value );
		this.setState( { message: e.target.value } );
	}

	canSubmitForm() {
		debug( 'canSubmitForm ', this.state.message !== '' );
		return this.state.message !== '';
	}

	render() {
		const { options, submitForm } = this.props;

		return (
			<div className="contact-form">
				<FormLabel>How can we help?</FormLabel>
				<SegmentedControl options={ options } primary />

				<FormLabel>What are you trying to do?</FormLabel>
				<FormTextarea
					placeholder="Please be descriptive"
					name="message"
					value={ this.state.message }
					onChange={ this.handleChange }
				/>

				<FormButton disabled={ ! this.canSubmitForm() } type="button" onClick={ submitForm }>
					Send
				</FormButton>
			</div>
		);
	}
}

ContactForm.propTypes = {
	options: PropTypes.array.isRequired,
	submitForm: PropTypes.func.isRequired,
};

ContactForm.defaultProps = {
	options: [],
	submitForm: () => {},
};
