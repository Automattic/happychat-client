/** @format */

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_GROUP_WPCOM,
	HAPPYCHAT_GROUP_JPOP,
	HAPPYCHAT_SKILL_PRODUCT,
	HAPPYCHAT_SKILL_LANGUAGE,
} from 'src/state/constants';
import getUserSkills from '../get-user-skills';

describe( '#getUserSkills()', () => {
	test( 'should return default product if none set', () => {
		const state = {
			user: {
				locale: 'gl',
			},
		};
		expect( getUserSkills( state ) ).toEqual( {
			[ HAPPYCHAT_SKILL_PRODUCT ]: [ HAPPYCHAT_GROUP_WPCOM ],
			[ HAPPYCHAT_SKILL_LANGUAGE ]: [ 'gl' ],
		} );
	} );

	test( 'should ignore language if not set', () => {
		const state = {
			user: {
				groups: [ HAPPYCHAT_GROUP_WPCOM ],
			},
		};
		expect( getUserSkills( state ) ).toEqual( {
			[ HAPPYCHAT_SKILL_PRODUCT ]: [ HAPPYCHAT_GROUP_WPCOM ],
		} );
	} );

	test( 'should return both product and language', () => {
		const siteId = 1;
		const state = {
			user: {
				locale: 'gl',
				groups: [ HAPPYCHAT_GROUP_JPOP ],
			},
		};

		expect( getUserSkills( state ) ).toEqual( {
			[ HAPPYCHAT_SKILL_PRODUCT ]: [ HAPPYCHAT_GROUP_JPOP ],
			[ HAPPYCHAT_SKILL_LANGUAGE ]: [ 'gl' ],
		} );
	} );
} );
