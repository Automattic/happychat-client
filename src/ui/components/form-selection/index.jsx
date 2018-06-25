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
import SegmentedControl from 'src/ui/components/segmented-control';
import ControlItem from 'src/ui/components/segmented-control/item';
import SelectDropdown from 'src/ui/components/select-dropdown';
import DropdownItem from 'src/ui/components/select-dropdown/item';
import FormDescription from 'src/ui/components/form-description';

const areOptionsDistinct = ( nextOpts, currentOpts ) => {
	if ( nextOpts.length !== currentOpts.length ) {
		return true;
	}
	for ( let i = 0; i < nextOpts.length; i++ ) {
		if (
			nextOpts[ i ].value !== currentOpts[ i ].value ||
			nextOpts[ i ].label !== currentOpts[ i ].label
		) {
			return true;
		}
	}

	return false;
};

class FormSelection extends React.Component {
	constructor( props ) {
		super( props );
		const { optionSelected, options } = this.props;
		this.state = { selection: optionSelected || options[ 0 ].value };
		this.handleClick = this.handleClick.bind( this );
	}

	componentWillReceiveProps( nextProps ) {
		const { options, optionSelected } = this.props;
		if (
			optionSelected !== nextProps.optionSelected ||
			areOptionsDistinct( nextProps.options, options )
		) {
			this.setState( {
				selection: nextProps.optionSelected || nextProps.options[ 0 ].value,
			} );
		}
	}

	handleClick( option ) {
		return () => {
			this.setState( { selection: option.value } );
			this.props.onClick( {
				name: this.props.name,
				option,
			} );
		};
	}

	render() {
		const { options } = this.props;

		const opts = options.map( option => ( {
			label: option.label,
			subtext: option.subtext ? (
				<span className="form-selection__subtext">{ option.subtext }</span>
			) : null,
			props: {
				key: option.value,
				selected: option.value === this.state.selection,
				value: option.value,
				title: option.label,
				description: option.description,
				onClick: this.handleClick( option ),
			},
		} ) );
		const selectedItem = find( opts, 'props.selected' );

		return (
			<div className="form-selection">
				<SegmentedControl primary>
					{ opts.map( option => (
						<ControlItem { ...option.props }>
							{ option.label }
							{ option.subtext }
						</ControlItem>
					) ) }
				</SegmentedControl>
				<SelectDropdown
					isSearchable={ false }
					selectedText={ selectedItem ? selectedItem.label : 'Select an option' }
				>
					{ opts.map( option => (
						<DropdownItem { ...option.props }>{ option.label }</DropdownItem>
					) ) }
				</SelectDropdown>
				{ selectedItem.props.description ? (
					<FormDescription messages={ selectedItem.props.description } />
				) : (
					''
				) }
			</div>
		);
	}
}

FormSelection.propTypes = {
	options: PropTypes.array.isRequired,
	optionSelected: PropTypes.string,
	onClick: PropTypes.func,
};

FormSelection.defaultProps = {
	options: [],
	optionSelected: null,
	onClick: () => {},
};

export default FormSelection;
