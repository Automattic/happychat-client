/**
 * Internal dependencies
 */
import createConfig from 'src/lib/create-config';

/* eslint-disable camelcase */
export default createConfig( {
	happychat_url: 'https://happychat-io-staging.go-vip.co/customer',
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
