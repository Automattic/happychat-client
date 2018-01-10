/** @format */

/**
 * External dependencies
 */
import get from 'lodash/get';

export default state => get( state, 'ui.isOpen', false );
