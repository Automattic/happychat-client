/** @format */

/**
 * External dependencies
 */
import request from 'wpcom-xhr-request';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import config from 'src/config';
import getUser from 'src/state/selectors/get-user';
import getUserLocale from 'src/state/selectors/get-user-locale';
import getUserGroups from 'src/state/selectors/get-user-groups';

const debug = debugFactory( 'happychat-client:wpcom:get-happychat-auth' );

const sign = ( payload, token ) =>
	new Promise( ( resolve, reject ) => {
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request sign' );
		request(
			{
				method: 'POST',
				apiNamespace: 'rest/v1',
				path: '/jwt/sign',
				authToken: token.access_token,
				body: { payload: JSON.stringify( payload ) },
			},
			( error, body, headers ) => {
				if ( error ) {
					debug( 'Request failed: ', error );
					return reject( error );
				}

				debug( 'Response: ', body, ' headers ', headers );
				return resolve( body );
			}
		);
	} );

const startSession = token =>
	new Promise( ( resolve, reject ) => {
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request startSession' );
		request(
			{
				method: 'POST',
				apiNamespace: 'rest/v1',
				path: '/happychat/session',
				authToken: token.access_token,
			},
			( error, body, headers ) => {
				if ( error ) {
					debug( 'Request failed: ', error );
					return reject( error );
				}

				debug( 'Response: ', body, ' headers ', headers );
				return resolve( body );
			}
		);
	} );

/* eslint-disable camelcase */
export default state => token => {
	const url = config( 'happychat_url' );

	const user = getUser( state );
	const locale = getUserLocale( state );
	const groups = getUserGroups( state );
	const signer_user_id = user.ID;
	let geoLocation;

	return startSession( token )
		.then( ( { session_id, geo_location } ) => {
			geoLocation = geo_location;
			return sign( { user, session_id }, token );
		} )
		.then( ( { jwt } ) => ( { url, user: { jwt, signer_user_id, locale, groups, geoLocation } } ) ) // eslint-disable-line max-len
		.catch( e => Promise.reject( 'Failed to start an authenticated Happychat session: ' + e ) );
};
/* eslint-enable camelcase */
