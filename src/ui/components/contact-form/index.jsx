/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

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
		this.prepareSubmitForm = this.prepareSubmitForm.bind( this );
	}

	handleChange( e ) {
		this.setState( { message: e.target.value } );
	}

	prepareCanSubmitForm() {
		return this.state.message !== '' && this.props.canSubmitForm();
	}

	prepareSubmitForm() {
		const { submitForm } = this.props;
		submitForm( { message: this.state.message } );
	}

	render() {
		const { options } = this.props;

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

				<FormButton
					disabled={ ! this.prepareCanSubmitForm() }
					type="button"
					onClick={ this.prepareSubmitForm }
				>
					Send
				</FormButton>
			</div>
		);
	}
}

ContactForm.propTypes = {
	canSubmitForm: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	submitForm: PropTypes.func.isRequired,
};

ContactForm.defaultProps = {
	canSubmitForm: () => true,
	options: [],
	submitForm: () => {},
};
