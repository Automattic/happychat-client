/** @format */

/**
 * External dependencies
 */
import get from 'lodash/get';
import debugFactory from 'debug';
const debug = debugFactory( 'happychat-client:group-expanded' );

/**
 * Internal dependencies
 */
import { HAPPYCHAT_GROUP_WPCOM, GROUPS_EXPANDED } from '../constants';

const getGroup = state => get( state, 'user.groups', [ HAPPYCHAT_GROUP_WPCOM ] )[ 0 ];
const logGroup = state => {
	const group = getGroup( state );
	debug( 'group is ', group );
	debug( 'expanded will be ', GROUPS_EXPANDED[ group ] );
	return group;
};
export default state => GROUPS_EXPANDED[ logGroup( state ) ];
