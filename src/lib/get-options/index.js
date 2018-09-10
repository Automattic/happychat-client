/**
 * External dependencies
 */
import find from 'lodash/find';

export const getSelectedOption = ( options, defaultValue ) => {
	if ( Array.isArray( options ) && options.length > 0 ) {
		return find( options, { value: defaultValue } ) || options[ 0 ];
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

export const getOptions = ( entryOptions ) => {
	const { defaultValues } = entryOptions;
	const primarySelected = getSelectedOption( entryOptions.primaryOptions, defaultValues.primary );
	const secondaryOptions = filterByTargetValue(
		entryOptions.secondaryOptions,
		primarySelected.value,
		'primary'
	);
	const secondarySelected = getSelectedOption(
		secondaryOptions,
		defaultValues.secondary
	);
	const itemList = filterByTargetValue(
		filterByTargetValue( entryOptions.itemList, primarySelected.value, 'primary' ),
		secondarySelected.value,
		'secondary'
	);
	const itemSelected = getSelectedOption( itemList, defaultValues.item );
	return {
		primarySelected,
		secondarySelected,
		itemSelected,
	};
};
