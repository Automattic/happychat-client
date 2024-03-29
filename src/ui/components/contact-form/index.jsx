/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { getOptions, filterByTargetValue } from 'src/lib/get-options';
import CompactCard from 'src/ui/components/card/compact';
import Card from 'src/ui/components/card';
import FormTextarea from 'src/ui/components/form-textarea';
import FormTextInput from 'src/ui/components/form-text-input';
import FormLabel from 'src/ui/components/form-label';
import FormButton from 'src/ui/components/form-button';
import FormDescription from 'src/ui/components/form-description';
import FormSelection from 'src/ui/components/form-selection';
import SelectDropdown from 'src/ui/components/select-dropdown';
import Sibyl from 'src/plugins/sibyl';
import SSRTroubleshooting from 'src/plugins/ssr-troubleshooting';

export class ContactForm extends React.Component {
	constructor( props ) {
		super( props );
		const {
			primaryOptions,
			primaryOptionsTitle,
			secondaryOptions,
			secondaryOptionsTitle,
			itemList,
			itemListTitle,
			openTextField,
			openTextFieldTitle,
			openTextArea,
			openTextAreaTitle,
			defaultValues,
		} = this.props;
		const {
			primarySelected,
			newSecondaryOptions,
			secondarySelected,
			newItemList,
			itemSelected,
		} = getOptions(
			{
				primaryOptions,
				secondaryOptions,
				itemList,
			},
			defaultValues
		);
		this.state = {
			subject: defaultValues.subject || '',
			message: defaultValues.message || '',
			primaryOptionsTitle,
			primaryOptions,
			primarySelected,
			secondaryOptionsTitle,
			secondaryOptions: newSecondaryOptions,
			secondarySelected,
			itemListTitle,
			itemList: newItemList,
			itemSelected,
			openTextField,
			openTextFieldTitle,
			openTextFieldValue: defaultValues.openTextField || '',
			openTextArea,
			openTextAreaTitle,
			openTextAreaValue: defaultValues.openTextArea || '',
			defaultValues,
			formSubmitListeners: [],
		};

		// bind class methods
		this.areRequiredFieldsFilled = this.areRequiredFieldsFilled.bind( this );
		this.handleChange = this.handleChange.bind( this );
		this.handleItemSelected = this.handleItemSelected.bind( this );
		this.handleOptionChange = this.handleOptionChange.bind( this );
		this.maybeItemList = this.maybeItemList.bind( this );
		this.maybeOpenTextArea = this.maybeOpenTextArea.bind( this );
		this.maybeOpenTextField = this.maybeOpenTextField.bind( this );
		this.maybePrimaryOptions = this.maybePrimaryOptions.bind( this );
		this.maybeSecondaryOptions = this.maybeSecondaryOptions.bind( this );
		this.maybeSubject = this.maybeSubject.bind( this );
		this.prepareCanSubmitForm = this.prepareCanSubmitForm.bind( this );
		this.prepareSubmitForm = this.prepareSubmitForm.bind( this );
	}

	shouldComponentUpdate( nextProps, nextState ) {
		if (
			nextProps.showMessage !== this.props.showMessage ||
			nextProps.showSubject !== this.props.showSubject ||
			nextProps.submitFormText !== this.props.submitFormText ||
			nextState.subject !== this.state.subject ||
			nextState.message !== this.state.message ||
			nextState.primarySelected !== this.state.primarySelected ||
			nextState.secondarySelected !== this.state.secondarySelected ||
			nextState.itemSelected !== this.state.itemSelected ||
			nextState.openTextFieldValue !== this.state.openTextFieldValue ||
			nextState.openTextAreaValue !== this.state.openTextAreaValue
		) {
			return true;
		}
		return false;
	}

	componentDidUpdate( prevProps, prevState ) {
		if (
			prevState.primarySelected.canChat !== this.state.primarySelected.canChat ||
			prevState.secondarySelected.canChat !== this.state.secondarySelected.canChat ||
			prevState.itemSelected.canChat !== this.state.itemSelected.canChat
		) {
			const { primarySelected, secondarySelected, itemSelected, subject, message } = this.state;
			this.props.onEvent( {
				primarySelected,
				secondarySelected,
				itemSelected,
				subject,
				message,
			} );
		}
	}

	addFormSubmitListener = func => {
		this.setState( state => ( { formSubmitListeners: state.formSubmitListeners.concat( func ) } ) );
	};

	removeFormSubmitListener = func => {
		this.setState( state => {
			const idx = state.formSubmitListeners.indexOf( func );
			if ( idx > -1 ) {
				return {
					formSubmitListeners: [
						...state.formSubmitListeners.slice( 0, idx ),
						...state.formSubmitListeners.slice( idx + 1 ),
					],
				};
			}
		} );
	};

	handleChange( e ) {
		const { name, value } = e.currentTarget;
		this.setState( { [ name ]: value } );
	}

	handleItemSelected( option ) {
		this.setState( { itemSelected: option } );
	}

	handleOptionChange( e ) {
		// Note that:
		// - state contains the valid values taking into account the selected options
		// - props contains the whole set of values
		if ( e.name === 'primarySelected' ) {
			const {
				primarySelected,
				newSecondaryOptions,
				secondarySelected,
				newItemList,
				itemSelected,
			} = getOptions(
				{
					primaryOptions: this.state.primaryOptions,
					secondaryOptions: this.props.secondaryOptions,
					itemList: this.props.itemList,
				},
				{
					primary: e.option.value,
				}
			);
			this.setState( {
				primarySelected,
				secondaryOptions: newSecondaryOptions,
				secondarySelected,
				itemList: newItemList,
				itemSelected,
			} );
		} else if ( e.name === 'secondarySelected' ) {
			const { secondarySelected, newItemList, itemSelected } = getOptions(
				{
					primaryOptions: this.state.primaryOptions,
					secondaryOptions: this.state.secondaryOptions,
					itemList: this.props.itemList,
				},
				{
					primary: this.state.primarySelected.value,
					secondary: e.option.value,
				}
			);
			this.setState( {
				secondarySelected,
				itemList: newItemList,
				itemSelected,
			} );
		}
	}

	areRequiredFieldsFilled() {
		const {
			openTextField,
			openTextFieldValue,
			openTextArea,
			openTextAreaValue,
			primarySelected,
			secondarySelected,
			itemList,
			itemSelected,
		} = this.state;
		const { itemListOptions } = this.props;

		if (
			Array.isArray( itemList ) &&
			itemList.length > 0 &&
			itemListOptions &&
			itemListOptions.isRequired &&
			! itemSelected.value
		) {
			return false;
		}

		const isOpenTextShown = options => {
			const newOptions = filterByTargetValue(
				filterByTargetValue( options, primarySelected.value, 'primary' ),
				secondarySelected.value,
				'secondary'
			);
			return Array.isArray( newOptions ) && newOptions.length === 1;
		};

		if (
			( openTextField &&
				openTextField.isRequired &&
				'' === openTextFieldValue &&
				isOpenTextShown( openTextField ? [ openTextField ] : [] ) ) ||
			( openTextArea &&
				openTextArea.isRequired &&
				'' === openTextAreaValue &&
				isOpenTextShown( openTextArea ? [ openTextArea ] : [] ) )
		) {
			return false;
		}
		return true;
	}

	prepareCanSubmitForm() {
		let canSubmit = true;
		if ( this.props.showMessage ) {
			canSubmit = canSubmit && '' !== this.state.message;
		}
		if ( this.props.showSubject ) {
			canSubmit = canSubmit && '' !== this.state.subject;
		}
		return canSubmit && this.areRequiredFieldsFilled() && this.props.canSubmitForm();
	}

	prepareSubmitForm() {
		this.state.formSubmitListeners.forEach( f => f() );
		this.props.submitForm( this.state );
	}

	maybePrimaryOptions() {
		const {
			primaryOptions,
			primaryOptionsTitle,
			defaultValues: { primary: primarySelected },
		} = this.state;
		return Array.isArray( primaryOptions ) && primaryOptions.length > 0 ? (
			<div>
				<FormLabel>{ primaryOptionsTitle }</FormLabel>
				<FormSelection
					name="primarySelected"
					options={ primaryOptions }
					optionSelected={ primarySelected }
					onClick={ this.handleOptionChange }
				/>
			</div>
		) : (
			''
		);
	}

	maybeSecondaryOptions() {
		const { secondaryOptions, secondaryOptionsTitle, secondarySelected } = this.state;
		return Array.isArray( secondaryOptions ) && secondaryOptions.length > 0 ? (
			<div>
				<FormLabel>{ secondaryOptionsTitle }</FormLabel>
				<FormSelection
					name="secondarySelected"
					optionSelected={ secondarySelected.value }
					options={ secondaryOptions }
					onClick={ this.handleOptionChange }
				/>
			</div>
		) : (
			''
		);
	}

	maybeItemList() {
		const { itemList, itemListTitle, itemSelected } = this.state;
		if ( ! Array.isArray( itemList ) || itemList.length === 0 ) {
			return '';
		}

		const classes = classNames( 'contact-form__item-list', {
			'no-support': itemSelected.canSupport === false,
		} );
		return (
			<div className={ classes }>
				<FormLabel>{ itemListTitle }</FormLabel>
				<SelectDropdown
					initialSelected={ itemSelected.value }
					options={ itemList }
					onSelect={ this.handleItemSelected }
				/>
				{ itemSelected.description ? (
					<FormDescription messages={ itemSelected.description } />
				) : (
					''
				) }
			</div>
		);
	}

	maybeOpenTextField() {
		const {
			primarySelected,
			secondarySelected,
			openTextField,
			openTextFieldTitle,
			openTextFieldValue,
		} = this.state;
		const shouldShowOpenText = options => {
			const newOptions = filterByTargetValue(
				filterByTargetValue( options, primarySelected.value, 'primary' ),
				secondarySelected.value,
				'secondary'
			);
			return Array.isArray( newOptions ) && newOptions.length === 1;
		};
		return shouldShowOpenText( openTextField ? [ openTextField ] : [] ) ? (
			<div>
				<FormLabel>{ openTextFieldTitle }</FormLabel>
				<FormTextInput
					name="openTextFieldValue"
					value={ openTextFieldValue }
					onChange={ this.handleChange }
				/>
			</div>
		) : (
			''
		);
	}

	maybeOpenTextArea() {
		const {
			primarySelected,
			secondarySelected,
			openTextArea,
			openTextAreaTitle,
			openTextAreaValue,
		} = this.state;
		const shouldShowOpenText = options => {
			const newOptions = filterByTargetValue(
				filterByTargetValue( options, primarySelected.value, 'primary' ),
				secondarySelected.value,
				'secondary'
			);
			return Array.isArray( newOptions ) && newOptions.length === 1;
		};
		return shouldShowOpenText( openTextArea ? [ openTextArea ] : [] ) ? (
			<div>
				<FormLabel>{ openTextAreaTitle }</FormLabel>
				<FormTextarea
					name="openTextAreaValue"
					value={ openTextAreaValue }
					onChange={ this.handleChange }
				/>
				{ this.props.plugins.hasOwnProperty( 'ssr-troubleshooting' ) && (
					<SSRTroubleshooting
						addFormSubmitListener={ this.addFormSubmitListener }
						removeFormSubmitListener={ this.removeFormSubmitListener }
						ssr={ openTextAreaValue }
					/>
				) }
			</div>
		) : (
			''
		);
	}

	maybeMessage() {
		if ( ! this.props.showMessage ) {
			return null;
		}

		return (
			<div>
				<FormLabel>What are you trying to do?</FormLabel>
				<FormTextarea
					placeholder="Please be descriptive"
					name="message"
					value={ this.state.message }
					onChange={ this.handleChange }
				/>
			</div>
		);
	}

	maybeSubject() {
		if ( ! this.props.showSubject ) {
			return null;
		}

		return (
			<div>
				<FormLabel>{ 'Subject' }</FormLabel>
				<FormTextInput name="subject" value={ this.state.subject } onChange={ this.handleChange } />
			</div>
		);
	}

	renderSupportFields() {
		const { submitFormText, plugins } = this.props;
		return (
			<>
				{ this.maybeSubject() }

				{ this.maybeMessage() }

				{ plugins.hasOwnProperty( 'sibyl' ) &&
					this.props.showMessage && (
						<Sibyl
							subject={ this.props.showSubject ? this.state.subject : '' }
							message={ this.state.message }
							addFormSubmitListener={ this.addFormSubmitListener }
							config={ plugins[ 'sibyl' ] }
						/>
					) }

				{ this.maybeOpenTextField() }

				{ this.maybeOpenTextArea() }

				<FormButton
					disabled={ ! this.prepareCanSubmitForm() }
					type="button"
					onClick={ this.prepareSubmitForm }
				>
					{ submitFormText }
				</FormButton>
			</>
		);
	}

	render() {
		const { formTitle } = this.props;

		return (
			<div className="contact-form">
				<CompactCard>
					<p className="contact-form__header-title">{ formTitle }</p>
				</CompactCard>
				<Card>
					{ this.maybePrimaryOptions() }

					{ this.maybeSecondaryOptions() }

					{ this.maybeItemList() }

					{ this.state.itemSelected.canSupport !== false && this.renderSupportFields() }
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
	itemListTitle: PropTypes.string,
	itemList: PropTypes.array,
	itemListOptions: PropTypes.object,
	openTextField: PropTypes.object,
	openTextFieldTitle: PropTypes.string,
	openTextArea: PropTypes.object,
	openTextAreaTitle: PropTypes.string,
	defaultValues: PropTypes.object,
	showMessage: PropTypes.bool,
	showSubject: PropTypes.bool,
	submitForm: PropTypes.func.isRequired,
	submitFormText: PropTypes.string,
	onEvent: PropTypes.func,
};

ContactForm.defaultProps = {
	canSubmitForm: () => true,
	formTitle: 'Contact us',
	primaryOptions: [],
	primaryOptionsTitle: 'How can we help?',
	secondaryOptions: [],
	secondaryOptionsTitle: 'Any more info you want to share?',
	itemListTitle: 'Which product do you need help with?',
	itemList: [],
	openTextField: null,
	openTextFieldTitle: 'What is the URL of your site?',
	openTextArea: null,
	openTextAreaTitle: 'Any more info you want to share?',
	defaultValues: {},
	showMessage: true,
	showSubject: false,
	submitForm: () => {},
	submitFormText: 'Send',
	onEvent: () => {},
	plugins: {},
};
