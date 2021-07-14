/** @format */

/**
 * External dependencies
 */
import startsWith from 'lodash/startsWith';

const schemeRegex = /^\w+:\/\//;

export const addSchemeIfMissing = ( url, scheme ) => {
	if ( false === schemeRegex.test( url ) ) {
		return scheme + '://' + url;
	}
	return url;
};

export const setUrlScheme = ( url, scheme ) => {
	const schemeWithSlashes = scheme + '://';
	if ( startsWith( url, schemeWithSlashes ) ) {
		return url;
	}

	const newUrl = addSchemeIfMissing( url, scheme );
	if ( newUrl !== url ) {
		return newUrl;
	}

	return url.replace( schemeRegex, schemeWithSlashes );
};

export const addWooTrackers = ( url ) => {
	// All *.woocommerce.com links should include affiliate links to track referrals
	try {
		const newURL = new URL( url );
		const wooDomain = 'woocommerce.com';
		if ( newURL.host === wooDomain || newURL.host.endsWith( `.${ wooDomain }` ) ) {
			newURL.searchParams.set( 'aff', '10486' );
			newURL.searchParams.set( 'cid', '1131038' );
		}
		return newURL.toString();
	} catch ( e ) {
		return url;
	}
};
