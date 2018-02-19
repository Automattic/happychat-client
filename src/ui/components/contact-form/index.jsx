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
		this.state = { message: '', primaryOptionSelected: null, secondaryOptionSelected: null };
		this.handleMsgChange = this.handleMsgChange.bind( this );
		this.handleOptionChange = this.handleOptionChange.bind( this );
		this.prepareSubmitForm = this.prepareSubmitForm.bind( this );
	}

	handleMsgChange( e ) {
		this.setState( { message: e.target.value } );
	}

	handleOptionChange( optionName ) {
		return value => {
			this.setState( { [ optionName ]: value } );
		};
	}

	prepareCanSubmitForm() {
		return this.state.message !== '' && this.props.canSubmitForm();
	}

	prepareSubmitForm() {
		this.props.submitForm( this.state );
	}

	render() {
		const {
			formTitle,
			primaryOptions,
			primaryOptionsTitle,
			secondaryOptions,
			secondaryOptionsTitle,
			submitFormText,
		} = this.props;

		return (
			<div className="contact-form">
				<CompactCard>
					<p className="contact-form__header-title">{ formTitle }</p>
				</CompactCard>
				<Card>
					{ primaryOptions && primaryOptions.length > 0 ? (
						<div>
							<FormLabel>{ primaryOptionsTitle }</FormLabel>
							<FormSelection
								options={ primaryOptions }
								onClick={ this.handleOptionChange( 'primaryOptionSelected' ) }
							/>
						</div>
					) : (
						''
					) }
					{ secondaryOptions && secondaryOptions.length > 0 ? (
						<div>
							<FormLabel>{ secondaryOptionsTitle }</FormLabel>
							<FormSelection
								options={ secondaryOptions }
								onClick={ this.handleOptionChange( 'secondaryOptionSelected' ) }
							/>
						</div>
					) : (
						''
					) }

					<FormLabel>What are you trying to do?</FormLabel>
					<FormTextarea
						placeholder="Please be descriptive"
						name="message"
						value={ this.state.message }
						onChange={ this.handleMsgChange }
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
	formTitle: PropTypes.string,
	primaryOptions: PropTypes.array,
	primaryOptionsTitle: PropTypes.string,
	secondaryOptions: PropTypes.array,
	secondaryOptionsTitle: PropTypes.string,
	submitForm: PropTypes.func.isRequired,
	submitFormText: PropTypes.string,
};

ContactForm.defaultProps = {
	canSubmitForm: () => true,
	formTitle: 'Contact us',
	primaryOptions: [],
	primaryOptionsTitle: 'How can we help?',
	secondaryOptions: [],
	secondaryOptionsTitle: 'Any more info you want to share?',
	submitForm: () => {},
	submitFormText: 'Send',
};
