/** @format */

/**
 * External dependencies
 */
import { get } from 'lodash';

export const getCurrentUser = state => get( state, 'user.currentUser', null );

export const getCurrentUserLocale = state => get( state, 'user.locale', null );
