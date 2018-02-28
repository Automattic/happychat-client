/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import { mockLocalize } from '../localize';

export const Count = ( { count, numberFormat, primary, ...inheritProps } ) => (
	// Omit props passed from the `localize` higher-order component that we don't need.
	<span
		className={ classnames( 'count', { 'is-primary': primary } ) }
		{ ...omit( inheritProps, [ 'translate', 'moment' ] ) }
	>
		{ numberFormat( count ) }
	</span>
);

Count.propTypes = {
	count: PropTypes.number.isRequired,
	numberFormat: PropTypes.func,
	primary: PropTypes.bool,
};

Count.defaultProps = {
	primary: false,
};

export default mockLocalize( Count );
