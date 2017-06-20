/**
 * Internal dependencies
 */
import createConfig from 'src/lib/create-config';

/* eslint-disable camelcase */
export default createConfig( {
	happychat_url: 'http://localhost:3311/customer',
	oauth_client_id: '54006',
	hostname: 'wordpress.com',
	twemoji_cdn_url: 'https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/', // eslint-disable-line max-len
	features: {
		reader: true,
		'me/my-profile': true,
		happychat: true
	}
} );
/* eslint-enable camelcase */
