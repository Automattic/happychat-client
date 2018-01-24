/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import CompactCard from 'src/ui/components/card/compact';
import Card from 'src/ui/components/card';
import FormTextarea from 'src/ui/components/form-textarea';
import FormLabel from 'src/ui/components/form-label';
import FormButton from 'src/ui/components/form-button';
import FormSelection from 'src/ui/components/form-selection';

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
		const { howCanWeHelpOptions, howDoYouFeelOptions, submitFormText } = this.props;

		return (
			<div className="contact-form">
				<CompactCard>
					<p className="contact-form__header-title">Contact Us</p>
				</CompactCard>
				<Card>
					<div>
						<FormLabel>How can we help?</FormLabel>
						<FormSelection options={ howCanWeHelpOptions } />
					</div>
					{ howDoYouFeelOptions && howDoYouFeelOptions.length > 0 ? (
						<div>
							<FormLabel>Mind sharing how do you feel?</FormLabel>
							<FormSelection options={ howDoYouFeelOptions } />
						</div>
					) : (
						''
					) }

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
						{ submitFormText }
					</FormButton>
				</Card>
			</div>
		);
	}
}

ContactForm.propTypes = {
	canSubmitForm: PropTypes.func.isRequired,
	howCanWeHelpOptions: PropTypes.array.isRequired,
	howDoYouFeelOptions: PropTypes.array,
	submitForm: PropTypes.func.isRequired,
	submitFormText: PropTypes.string,
};

ContactForm.defaultProps = {
	canSubmitForm: () => true,
	howCanWeHelpOptions: [],
	howDoYouFeelOptions: [],
	submitForm: () => {},
	submitFormText: 'Send',
};
