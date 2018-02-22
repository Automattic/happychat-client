/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import SegmentedControl from 'src/ui/components/segmented-control';
import ControlItem from 'src/ui/components/segmented-control/item';
import SelectDropdown from 'src/ui/components/select-dropdown';
import DropdownItem from 'src/ui/components/select-dropdown/item';

class FormSelection extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { selection: this.props.options[ 0 ].value };
		this.handleClick = this.handleClick.bind( this );
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
				<SelectDropdown selectedText={ selectedItem ? selectedItem.label : 'Select an option' }>
					{ opts.map( option => (
						<DropdownItem { ...option.props }>{ option.label }</DropdownItem>
					) ) }
				</SelectDropdown>
			</div>
		);
	}
}

FormSelection.propTypes = {
	options: PropTypes.array.isRequired,
	onClick: PropTypes.func,
};

FormSelection.defaultProps = {
	options: [],
	onClick: () => {},
};

export default FormSelection;
