/** @format */

/**
 * Internal dependencies
 */
import getGeoLocation from './get-user-geolocation';

export default state => ( {
	site,
	howCanWeHelp = 'gettingStarted',
	howYouFeel = 'unspecified',
} ) => {
	const info = {
		howCanWeHelp,
		howYouFeel,
		siteId: site.ID,
		siteUrl: site.URL,
		localDateTime: new Intl.DateTimeFormat( 'en-us', {
			hour12: true,
			hour: '2-digit',
			minute: '2-digit',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		} ).format( new Date() ),
	};

	// add screen size
	if ( 'object' === typeof screen ) {
		info.screenSize = {
			width: screen.width,
			height: screen.height,
		};
	}

	// add browser size
	if ( 'object' === typeof window ) {
		info.browserSize = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}

	// add user agent
	if ( 'object' === typeof navigator ) {
		info.userAgent = navigator.userAgent;
	}

	const geoLocation = getGeoLocation( state );
	if ( geoLocation ) {
		info.geoLocation = geoLocation;
	}

	return info;
};
