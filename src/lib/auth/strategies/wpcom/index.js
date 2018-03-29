/** @format */

/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { BaseStrategy } from '../index';
import config from 'src/config';
import getUser from 'src/state/selectors/get-user';
import getUserSkills from 'src/state/selectors/get-user-skills';

/**
 * Module variables
 */
const debug = debugFactory( 'happychat-client:auth:wpcom' );

/**
 * This is a WPCOM base strategy class that will be extended by all WPCOM implemeted strategies. It
 * was created to share common functionality that applies to all WPCOM strategies like authorizing
 * a chat session via signing an JWT.
 *
 * IMPORTANT: All methods used in the shared code must be declared as empty methods and overriden
 * by child classes. This way `authorizeChat` will use the implementatios of `startChat` and
 * `signJWT` of the child strategy class that is instantiated.
 *
 * @extends BaseStrategy
 */
export class WPcomStrategy extends BaseStrategy {
	/**
	 * Pass the strategy type to its parent.
	 * @param {string} type strategy type
	 */
	constructor( type ) {
		super( type );
	}

	/**
	 * Placeholder method to be overridden by child classes. Needed in the shared `authorizeChat`
	 * method.
	 */
	startChat() {}
	/**
	 * Placeholder method to be overridden by child classes. Needed in the shared `authorizeChat`
	 * method.
	 */
	signJWT() {}

	/**
	 * Authorize and start chat session by signing a JWT and returns jwt, userId, skills and
	 * geolocation.
	 *
	 * @param {Object} state Redux state object
	 * @returns {function} that will get needed data from state and start a chat
	 */
	authorizeChat( state ) {
		debug( 'chat session is started and authorized' );
		/**
		 * Authorize and start chat session.
		 * @returns {Promise} containing user jwt, userId, skills and geolocation.
		 */
		return () => {
			let geoLocation;
			const url = config( 'happychat_url' );

			const user = getUser( state );
			const skills = getUserSkills( state );
			const userId = user.ID;

			/* eslint-disable camelcase */
			const signer_user_id = userId;

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
			/* eslint-enable camelcase */
		};
	}
}
