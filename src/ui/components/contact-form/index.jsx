/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

/**
 * Internal dependencies
 */
import CompactCard from 'src/ui/components/card/compact';
import Card from 'src/ui/components/card';
import FormTextarea from 'src/ui/components/form-textarea';
import FormTextInput from 'src/ui/components/form-text-input';
import FormLabel from 'src/ui/components/form-label';
import FormButton from 'src/ui/components/form-button';
import FormSelection from 'src/ui/components/form-selection';
import SelectDropdown from 'src/ui/components/select-dropdown';

const getSelectedOption = ( options, defaultValue ) => {
	if ( Array.isArray( options ) && options.length > 0 ) {
		return find( options, { value: defaultValue } ) || options[ 0 ];
	}
	return {};
};

const filterByTargetValue = ( options, targetValue, filterKey ) => {
	const allOptions = Array.isArray( options ) ? options : [];
	return allOptions.filter(
		option =>
			! option[ filterKey ] ||
			( Array.isArray( option[ filterKey ] ) &&
				option[ filterKey ].some( value => targetValue === value ) )
	);
};

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
		const primarySelected = getSelectedOption( primaryOptions, defaultValues.primary );
		const newSecondaryOptions = filterByTargetValue(
			secondaryOptions,
			primarySelected.value,
			'primary'
		);
		const newSecondarySelected = getSelectedOption( newSecondaryOptions, defaultValues.secondary );
		const newItemList = filterByTargetValue(
			filterByTargetValue( itemList, primarySelected.value, 'primary' ),
			newSecondarySelected.value,
			'secondary'
		);
		const newItemSelected = getSelectedOption( newItemList, defaultValues.item );
		this.state = {
			subject: '',
			message: '',
			primaryOptionsTitle,
			primaryOptions,
			primarySelected,
			secondaryOptionsTitle,
			secondaryOptions: newSecondaryOptions,
			secondarySelected: newSecondarySelected,
			itemListTitle,
			itemList: newItemList,
			itemSelected: newItemSelected,
			openTextField,
			openTextFieldTitle,
			openTextFieldValue: '',
			openTextArea,
			openTextAreaTitle,
			openTextAreaValue: '',
			defaultValues,
		};
		this.handleChange = this.handleChange.bind( this );
		this.handleItemSelected = this.handleItemSelected.bind( this );
		this.handleOptionChange = this.handleOptionChange.bind( this );
		this.prepareSubmitForm = this.prepareSubmitForm.bind( this );
	}

	shouldComponentUpdate( nextProps, nextState ) {
		if (
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

	handleChange( e ) {
		const { name, value } = e.currentTarget;
		this.setState( { [ name ]: value } );
	}

	handleItemSelected( option ) {
		this.setState( { itemSelected: option } );
	}

	handleOptionChange( e ) {
		if ( e.name === 'primarySelected' ) {
			const { secondaryOptions, itemList } = this.props;
			const newPrimarySelected = e.option;
			const newSecondaryOptions = filterByTargetValue(
				secondaryOptions,
				newPrimarySelected.value,
				'primary'
			);
			const newSecondarySelected = getSelectedOption( newSecondaryOptions );
			const newItemList = filterByTargetValue(
				filterByTargetValue( itemList, newPrimarySelected.value, 'primary' ),
				newSecondarySelected.value,
				'secondary'
			);
			const newItemSelected = getSelectedOption( newItemList );
			this.setState( {
				primarySelected: newPrimarySelected,
				secondaryOptions: newSecondaryOptions,
				secondarySelected: newSecondarySelected,
				itemList: newItemList,
				itemSelected: newItemSelected,
			} );
		} else if ( e.name === 'secondarySelected' ) {
			const { itemList } = this.props;
			const { primarySelected } = this.state;
			const newSecondarySelected = e.option;
			const newItemList = filterByTargetValue(
				filterByTargetValue( itemList, primarySelected.value, 'primary' ),
				newSecondarySelected.value,
				'secondary'
			);
			const newItemSelected = getSelectedOption( newItemList );
			this.setState( {
				secondarySelected: newSecondarySelected,
				itemList: newItemList,
				itemSelected: newItemSelected,
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
		} = this.state;

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
		let canSubmit = '' !== this.state.message;
		if ( this.props.showSubject ) {
			canSubmit = canSubmit && '' !== this.state.subject;
		}
		return canSubmit && this.areRequiredFieldsFilled() && this.props.canSubmitForm();
	}

	prepareSubmitForm() {
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
		return Array.isArray( itemList ) && itemList.length > 0 ? (
			<div className="contact-form__item-list">
				<FormLabel>{ itemListTitle }</FormLabel>
				<SelectDropdown
					initialSelected={ itemSelected.value }
					options={ itemList }
					onSelect={ this.handleItemSelected }
				/>
			</div>
		) : (
			''
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
			</div>
		) : (
			''
		);
	}

	maybeSubject() {
		const { showSubject } = this.props;
		return showSubject ? (
			<div>
				<FormLabel>{ 'Subject' }</FormLabel>
				<FormTextInput name="subject" value={ this.state.subject } onChange={ this.handleChange } />
			</div>
		) : (
			''
		);
	}

	render() {
		const { formTitle, submitFormText } = this.props;

		return (
			<div className="contact-form">
				<CompactCard>
					<p className="contact-form__header-title">{ formTitle }</p>
				</CompactCard>
				<Card>
					{ this.maybePrimaryOptions() }

					{ this.maybeSecondaryOptions() }

					{ this.maybeItemList() }

					{ this.maybeSubject() }

					<FormLabel>What are you trying to do?</FormLabel>
					<FormTextarea
						placeholder="Please be descriptive"
						name="message"
						value={ this.state.message }
						onChange={ this.handleChange }
					/>

					{ this.maybeOpenTextField() }

					{ this.maybeOpenTextArea() }

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
	itemListTitle: PropTypes.string,
	itemList: PropTypes.array,
	openTextField: PropTypes.object,
	openTextFieldTitle: PropTypes.string,
	openTextArea: PropTypes.object,
	openTextAreaTitle: PropTypes.string,
	defaultValues: PropTypes.object,
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
	showSubject: false,
	submitForm: () => {},
	submitFormText: 'Send',
	onEvent: () => {},
};
