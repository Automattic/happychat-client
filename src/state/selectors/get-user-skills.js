/** @format */

/**
 * Internal dependencies
 */
import { HAPPYCHAT_SKILL_PRODUCT, HAPPYCHAT_SKILL_LANGUAGE } from 'src/state/constants';
import getGroups from 'src/state/selectors/get-user-groups';
import getLocale from 'src/state/selectors/get-user-locale';

/**
 * Returns an object of happychat skills array ( product - before known as groups and language )
 *
 * @param { Object } state Global state tree
 * @param { String } siteId Id of the selected site used to determine the product (wpcom, jetpack)
 *
 * @return { String } Current user geo location
 */
export default state => {
	const skills = {
		[ HAPPYCHAT_SKILL_PRODUCT ]: getGroups( state ),
	};

	const language = getLocale( state );
	if ( language ) {
		skills[ HAPPYCHAT_SKILL_LANGUAGE ] = [ language ];
	}

	return skills;
};
