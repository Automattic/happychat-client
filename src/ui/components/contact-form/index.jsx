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
import FormTextInput from 'src/ui/components/form-text-input';
import FormLabel from 'src/ui/components/form-label';
import FormButton from 'src/ui/components/form-button';
import FormSelection from 'src/ui/components/form-selection';
import SelectDropdown from 'src/ui/components/select-dropdown';

const getSelectedOption = options =>
	Array.isArray( options ) && options.length > 0 ? options[ 0 ] : {};

const getSecondary = ( primarySelected, secondaryOptions ) =>
	Array.isArray( primarySelected.secondaryOptions )
		? getSelectedOption( primarySelected.secondaryOptions )
		: getSelectedOption( secondaryOptions );

const filterByPrimaryKey = ( options, targetValue ) => {
	const allOptions = Array.isArray( options ) ? options : [];
	return allOptions.filter( option => ! option.primary ||
		( Array.isArray( option.primary ) && option.primary.some( value => targetValue === value ) )
	);
};

export class ContactForm extends React.Component {
	constructor( props ) {
		super( props );
		const primaryOption = getSelectedOption( this.props.primaryOptions );
		const secondaryOption = getSecondary( primaryOption, this.props.secondaryOptions );
		const item = getSelectedOption( this.props.itemList );
		this.state = {
			subject: '',
			message: '',
			primaryOption,
			secondaryOption,
			item,
		};
		this.handleChange = this.handleChange.bind( this );
		this.handleItemSelected = this.handleItemSelected.bind( this );
		this.handleOptionChange = this.handleOptionChange.bind( this );
		this.prepareSubmitForm = this.prepareSubmitForm.bind( this );
	}

	componentDidUpdate( prevProps, prevState ) {
		if (
			prevState.primaryOption.canChat !== this.state.primaryOption.canChat ||
			prevState.secondaryOption.canChat !== this.state.secondaryOption.canChat ||
			prevState.item.canChat !== this.state.item.canChat
		) {
			this.props.onEvent( this.state );
		}
	}

	handleChange( e ) {
		const { name, value } = e.currentTarget;
		this.setState( { [ name ]: value } );
	}

	handleItemSelected( option ) {
		this.setState( { item: option } );
	}

	handleOptionChange( e ) {
		if ( 'primaryOption' === e.name ) {
			this.setState( {
				primaryOption: e.option,
				secondaryOption: getSecondary( e.option, this.props.secondaryOptions ),
			} );
		} else {
			this.setState( { [ e.name ]: e.option } );
		}
	}

	prepareCanSubmitForm() {
		let canSubmit = '' !== this.state.message;
		if ( this.props.showSubject ) {
			canSubmit = canSubmit && '' !== this.state.subject;
		}
		return canSubmit && this.props.canSubmitForm();
	}

	prepareSubmitForm() {
		this.props.submitForm( this.state );
	}

	maybePrimaryOptions() {
		const { primaryOptions, primaryOptionsTitle } = this.props;
		return primaryOptions && primaryOptions.length > 0 ? (
			<div>
				<FormLabel>{ primaryOptionsTitle }</FormLabel>
				<FormSelection
					name="primaryOption"
					options={ primaryOptions }
					onClick={ this.handleOptionChange }
				/>
			</div>
		) : (
			''
		);
	}

	maybeSecondaryOptions() {
		const { secondaryOptions, secondaryOptionsTitle } = this.props;
		const options = filterByPrimaryKey( secondaryOptions, this.state.primaryOption.value );
		return options.length > 0 ? (
			<div>
				<FormLabel>{ secondaryOptionsTitle }</FormLabel>
				<FormSelection
					name="secondaryOption"
					options={ options }
					onClick={ this.handleOptionChange }
				/>
			</div>
		) : (
			''
		);
	}

	maybeItemList() {
		const { itemListTitle, itemList } = this.props;
		return Array.isArray( itemList ) && itemList.length > 0 ? (
			<div className="contact-form__item-list">
				<FormLabel>{ itemListTitle }</FormLabel>
				<SelectDropdown options={ itemList } onSelect={ this.handleItemSelected } />
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
	showSubject: false,
	submitForm: () => {},
	submitFormText: 'Send',
	onEvent: () => {},
};
