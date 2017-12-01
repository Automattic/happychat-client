/** @format */

/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { HAPPYCHAT_GROUP_WPCOM } from 'src/state/constants';

export default state => get( state, 'user.groups', [ HAPPYCHAT_GROUP_WPCOM ] );
