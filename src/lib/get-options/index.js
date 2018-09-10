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
