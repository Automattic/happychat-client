/**
 * External dependencies
 */
import find from 'lodash/find';

export const getSelectedOption = ( options, defaultValue ) => {
	if ( Array.isArray( options ) && options.length > 0 ) {
		return find( options, { value: defaultValue } ) || {};
	}
	return {};
};

export const filterByTargetValue = ( options, targetValue, filterKey ) => {
	const allOptions = Array.isArray( options ) ? options : [];
	return allOptions.filter(
		option =>
			! option[ filterKey ] ||
			( Array.isArray( option[ filterKey ] ) &&
				option[ filterKey ].some( value => targetValue === value ) )
	);
};

export const getOptions = ( values, defaults ) => {
	const primarySelected = getSelectedOption( values.primaryOptions, defaults.primary );
	const newSecondaryOptions = filterByTargetValue(
		values.secondaryOptions,
		primarySelected.value,
		'primary'
	);
	const secondarySelected = getSelectedOption(
		newSecondaryOptions,
		defaults.secondary
	);
	const newItemList = filterByTargetValue(
		filterByTargetValue( values.itemList, primarySelected.value, 'primary' ),
		secondarySelected.value,
		'secondary'
	);
	const itemSelected = getSelectedOption( newItemList, defaults.item );
	return {
		primarySelected,
		newSecondaryOptions,
		secondarySelected,
		newItemList,
		itemSelected,
	};
};
