/** @format */

/**
 * External dependencies
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { debounce, isEmpty } from 'lodash';
import wpcomRequest from 'wpcom-xhr-request';

/**
 * Internal dependencies
 */
import { recordEvent } from 'src/lib/tracks';

export default class SSRTroubleshooting extends React.Component {
	fetchFlags = debounce(() => {
		const { ssr } = this.props;

		if ( ! ssr ) {
			return;
		}

		wpcomRequest( {
			method: 'POST',
			apiNamespace: 'wpcom/v2',
			path: '/support-flags/ssr-troubleshooting',
			body: { ssr },
		}, ( error, body, headers ) => {
			if ( body && Array.isArray( body ) ) {
				recordEvent( 'happychatclient_ssr_troubleshooting_flags_fetched', { count: body.length } );
				body.forEach( ( { type } ) => {
					recordEvent( 'happychatclient_ssr_troubleshooting_flag_shown', { type } );
				} )
			}
		} );
	}, 400)


	componentDidMount() {
		this.fetchFlags();
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( prevProps.ssr !== this.props.ssr ) {
			this.fetchFlags();
		}
	}

	render() {
		// For this phase of development, we're not rendering anything — just trackiong how
		// many flags are retrieved to help inform how we design the UI.
		return null;
	}
}

// TODO Proptypes?
