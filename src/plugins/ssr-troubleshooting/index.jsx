/** @format */

/**
 * External dependencies
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { debounce, isEmpty } from 'lodash';
import wpcomRequest from 'wpcom-xhr-request';
import classnames from 'classnames';
import GridiconChevronRight from 'gridicons/dist/chevron-right';

/**
 * Internal dependencies
 */
import Card from 'src/ui/components/card';
import FormLabel from 'src/ui/components/form-label';
import { recordEvent } from 'src/lib/tracks';

const TESTFLAGS = [
	{
		code: 'woocommerce_is_outdated',
		title: "Your WooCommerce plugin is outdated.",
		text: 'Updating WooCommerce ensures that you have the latest bug fixes and system compatibility.<a href="">Read more about backing up and updating your site.</a>'
	},
	{
		code: 'woocommerce_is_outdated',
		title: "Your WooCommerce plugin is outdated.",
		text: 'Updating WooCommerce ensures that you have the latest bug fixes and system compatibility.<a href="">Read more about backing up and updating your site.</a>'
	},
	{
		code: 'woocommerce_is_outdated',
		title: "Your WooCommerce plugin is outdated.",
		text: 'Updating WooCommerce ensures that you have the latest bug fixes and system compatibility.<a href="">Read more about backing up and updating your site.</a>'
	},
];

export default class SSRTroubleshooting extends React.Component {
	state = {
		flags: [],
		flagClicked: false,
		expandedFlags: [],
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
		// if ( this.state.suggestionClicked ) {
		// 	recordEvent( 'happychatclient_sibyl_support_after_question_click', { site } );
		// }

		// if ( isEmpty( this.state.suggestions ) ) {
		// 	recordEvent( 'happychatclient_sibyl_support_without_matching_questions', {
		// 		site,
		// 		query: this.getSearchQuery(),
		// 	} );
		// } else {
		// 	recordEvent( 'happychatclient_sibyl_support_with_questions_showing', {
		// 		site,
		// 		query: this.getSearchQuery(),
		// 		suggestions: this.state.suggestions.map( ({id, title}) => `${id} - ${title}` ).join(' / '),
		// 	} );
		// }
		
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

	handleFlagClick( flagIndex ) {
		const { expandedFlags } = this.state;
		const toggleIndex = this.state.expandedFlags.indexOf( flagIndex );
		if ( toggleIndex === -1 ) {
			this.setState( { expandedFlags: [ ...expandedFlags, flagIndex ] } );
		} else {
			this.setState( {
				expandedFlags: [
					...expandedFlags.slice(0, toggleIndex),
					...expandedFlags.slice(toggleIndex + 1)
				]
			} );
		}

		// TODO: Also track clicks data --->

		// if ( ! this.state.suggestionClicked ) {
		// 	recordEvent( 'happychatclient_sibyl_first_question_click', {
		// 		question_id: suggestion.id,
		// 		site: this.props.config.site
		// 	} );
		// }

		// recordEvent( 'happychatclient_sibyl_question_click', {
		// 	question_id: suggestion.id,
		// 	site: this.props.config.site
		// } );
	}

	render() {
		// TODO Only show if this is an "SSR" component?

		if ( false && isEmpty( this.state.flags ) ) {
			return null;
		}

		return (
			<div className="ssr-troubleshooting">
				<p className="ssr-troubleshooting__intro">
					{/* To help us support you better, please look into the following issues on your site: */}

					{/* Your System Status Report shows these issues which could be impacting your site.
					Please try to fix them to help us support you better. */}

					The following issues may be impacting your site. Please look into them first to
					help us support you better:
				</p>
				<Card className="ssr-troubleshooting__flags">
					{ this.state.flags.map( ({code, title, text}, idx) => {
						const classes = classnames( 'ssr-troubleshooting__flag', {
							'ssr-troubleshooting__flag--is-expanded': this.state.expandedFlags.indexOf(idx) !== -1,
						} );
						return (
							<div className={classes} key={code+idx}>
								<button className="ssr-troubleshooting__flag-toggle" onClick={() => this.handleFlagClick(idx)}>
									<span className="ssr-troubleshooting__flag-toggle-icon">⚠️</span>
									{title}
									<span className="ssr-troubleshooting__flag-toggle-cta">
										<GridiconChevronRight size={14} />
									</span>
								</button>
								<div className="ssr-troubleshooting__flag-body">
									<div dangerouslySetInnerHTML={{__html: text}} />
								</div>
							</div>
						);
					} ) }
				</Card>
			</div>
		);
	}
}
