/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { debounce } from 'lodash';
import wpcomRequest from 'wpcom-xhr-request';

/**
 * Internal dependencies
 */
import { recordEvent } from 'src/lib/tracks';

export default class SSRTroubleshooting extends React.Component {
	state = {
		flags: []
	};

	fetchFlags = debounce(() => {
		const { ssr } = this.props;

		if ( ! ssr ) {
			this.setState( { flags: [] } );
			return;
		}

		wpcomRequest( {
			apiNamespace: 'wpcom/v2',
			path: '/support-flags/ssr-troubleshooting',
			method: 'POST',
			body: { ssr },
		}, ( error, body ) => {
			if ( error ) {
				return;
			}

			if ( ! Array.isArray( body ) ) {
				return;
			}

			this.setState( { flags: body } );
		} );
	}, 400)

	handleFormSubmit = () => {
		const { ssr } = this.props;
		const { flags } = this.state;

		if ( ssr ) {
			recordEvent( 'happychatclient_ssr_troubleshooting_support_with_flags_showing', {
				flag_count: flags.length,
			} );
			flags.forEach( ( flag ) => {
				// Track how often each individual flag type is shown during submit, so we can
				// both identify the biggest issues now, and see trends change over time
				recordEvent( 'happychatclient_ssr_troubleshooting_support_with_flag_showing', {
					flag_type: flag.type,
				} );
			} );
		}
	}

	componentDidMount() {
		this.props.addFormSubmitListener( this.handleFormSubmit );
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
