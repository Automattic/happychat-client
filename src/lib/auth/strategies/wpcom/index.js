/** @format */

/**
 * Internal dependencies
 */
import { BaseStrategy } from '../index';
import config from 'src/config';
import getUser from 'src/state/selectors/get-user';
import getUserSkills from 'src/state/selectors/get-user-skills';

export class WPcomStrategy extends BaseStrategy {
	constructor( type ) {
		super( type );
	}

	startChat() {}
	signJWT() {}

	authorizeChat( state ) {
		return () => {
			const url = config( 'happychat_url' );

			const user = getUser( state );
			const skills = getUserSkills( state );
			const userId = user.ID;
			const signer_user_id = userId;
			let geoLocation;

			return this.startChat()
				.then( ( { session_id, geo_location } ) => {
					geoLocation = geo_location;
					return this.signJWT( { user, session_id } );
				} )
				.then( ( { jwt } ) => ( {
					url,
					user: { jwt, signer_user_id, userId, skills, geoLocation },
				} ) )
				.catch( e => Promise.reject( `Failed to start an authenticated session: ${ e }` ) );
		};
	}
}
