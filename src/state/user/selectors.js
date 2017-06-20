/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Returns the geo location of the current user, based happychat session initiation (on ip)
 *
 * @param  {Object}  state  Global state tree
 * @return {?String}        Current user geo location
 */
export const getGeoLocation = state => get( state, 'user.geoLocation', null );

export const getCurrentUser = state => get( state, 'user.currentUser', null );

export const getCurrentUserLocale = state => get( state, 'user.locale', null );
