/** @format */

/**
 * External dependencies
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isObject from 'lodash/isObject';
import omit from 'lodash/omit';

const renderRequiredBadge = translate => (
	<small className="form-label__required">{ translate( 'Required' ) }</small>
);

const addKeys = elements =>
	elements.map( ( elem, idx ) => ( isObject( elem ) ? { ...elem, key: idx } : elem ) );

const FormLabel = ( { children, required, translate, className, ...extraProps } ) => {
	children = React.Children.toArray( children ) || [];
	if ( required ) {
		children.push( renderRequiredBadge( translate ) );
	}

	return (
		<label
			{ ...omit( extraProps, 'moment', 'numberFormat' ) }
			className={ classnames( className, 'form-label' ) }
		>
			{ children.length ? addKeys( children ) : null }
		</label>
	);
};

FormLabel.propTypes = {
	required: PropTypes.bool,
};

export default FormLabel;
