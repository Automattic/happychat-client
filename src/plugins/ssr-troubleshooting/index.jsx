/** @format */

/**
 * External dependencies
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { debounce, isEmpty } from 'lodash';
import wpcomRequest from 'wpcom-xhr-request';
import classnames from 'classnames';
import GridiconCheckmarkCircle from 'gridicons/dist/checkmark-circle';
import GridiconChevronRight from 'gridicons/dist/chevron-right';
import GridiconThumbsUp from 'gridicons/dist/thumbs-up';

/**
 * Internal dependencies
 */
import Card from 'src/ui/components/card';
import FormLabel from 'src/ui/components/form-label';
import { recordEvent } from 'src/lib/tracks';

const TESTFLAGS = [{"title":"Your WooCommerce plugin is outdated.","text":"It's important to keep WordPress, WooCommerce, and any plugins up to date to ensure that your website functions as expected. Often times, current issues can be resolved simply by updating your website's software.","action_text":"Learn how to back up and update your site","action_url":"https:\/\/docs.woocommerce.com\/document\/how-to-update-woocommerce\/","type":"SSR_WOOCOMMERCE_OUTDATED"},{"title":"Your WooCommerce database is outdated.","text":"It's important to keep WordPress, WooCommerce, and any plugins up to date to ensure that your website functions as expected. Often times, current issues can be resolved simply by updating your website's software.","action_text":"Learn how to update your site's database","action_url":"https:\/\/docs.woocommerce.com\/document\/how-to-update-woocommerce\/#woocommerce-data-update-notice","type":"SSR_WC_DB_OUTDATED"},{"title":"Your WooCommerce plugin and database versions do not match.","text":"It's important to keep WordPress, WooCommerce, and any plugins up to date to ensure that your website functions as expected. Often times, current issues can be resolved simply by updating your website's software.","action_text":"Learn how to back up and update your site and database","action_url":"https:\/\/docs.woocommerce.com\/document\/how-to-update-woocommerce\/","type":"SSR_WC_DB_VERSION_MISMATCH"},{"title":"Some of your WooCommerce Pages are missing.","text":"The following WooCommerce Pages are missing from your site and your customers will not be able to find them: Terms and conditions","action_text":"TK","action_url":"TK","type":"SSR_WC_PAGES_NOT_SET"},{"title":"Your site is not connected to WooCommerce.com.","text":"TK","action_text":"TK","action_url":"TK","type":"SSR_WCCOM_NOT_CONNECTED"}];

export default class SSRTroubleshooting extends React.Component {
	state = {
		flags: TESTFLAGS,
		flagClicked: false,
		expandedFlags: [],
		feedbackGivenOn: [],
	};

	fetchFlags = debounce(() => {
		const { ssr } = this.props;

		const uiStateDefaults = { expandedFlags: [], feedbackGivenOn: [] };

		// Reset some of the UI state
		if ( ! ssr ) {
			this.setState( { flags: [], ...uiStateDefaults } );
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

			this.setState( { flags: body, ...uiStateDefaults } );
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

		// TODO: Also track other submission data, like these from Sibyl --->
		//
		// if ( this.state.suggestionClicked ) {
		// 	recordEvent( 'happychatclient_sibyl_support_after_question_click', { site } );
		// }
		//
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
	}

	componentDidMount() {
		this.props.addFormSubmitListener( this.handleFormSubmit );
		if ( this.props.ssr ) {
			this.fetchFlags();
		}
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

	handleFeedbackClick( flagIndex ) {
		const { feedbackGivenOn } = this.state;
		this.setState( { feedbackGivenOn: [ ...feedbackGivenOn, flagIndex ] } );
		return false;
	}

	renderFeedbackButton( flagIndex ) {
		const { feedbackGivenOn } = this.state;
		const wasClicked = feedbackGivenOn.indexOf(flagIndex) > -1;
		const classes = classnames( 'ssr-troubleshooting__feedback-button', {
			'ssr-troubleshooting__feedback-button--was-clicked': wasClicked
		} );

		return (
			<a
				className={ classes }
				href="#"
				onClick={evt => {
					evt.preventDefault();
					if ( ! wasClicked ) {
						console.log('feedback');
						this.handleFeedbackClick(flagIndex);
					}
				} }
			>
				{ wasClicked
					? <><GridiconCheckmarkCircle size={16} /> Thanks for the feedback!</>
					: <><GridiconThumbsUp size={16} /> This helped me </>
				}
			</a>
		)
	}

	render() {
		const { flags } = this.state;

		if ( isEmpty( this.state.flags ) ) {
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
					{ flags.map( ({type, title, text, action_text, action_url}, idx) => {
						const classes = classnames( 'ssr-troubleshooting__flag', {
							'ssr-troubleshooting__flag--is-expanded': this.state.expandedFlags.indexOf(idx) !== -1,
						} );
						return (
							<div className={classes} key={type+idx}>
								<button className="ssr-troubleshooting__flag-toggle" onClick={() => this.handleFlagClick(idx)}>
									<span className="ssr-troubleshooting__flag-toggle-icon">⚠️</span>
									{title}
									<span className="ssr-troubleshooting__flag-toggle-cta">
										<GridiconChevronRight size={14} />
									</span>
								</button>
								<div className="ssr-troubleshooting__flag-body">
									<p>{text}</p>
									<div className="ssr-troubleshooting__flag-actions">
										<a
											className="button is-primary ssr-troubleshooting__flag-link"
											target="_blank"
											rel="noopener noreferrer"
											href={action_url}
										>
											{action_text}
										</a>
										{ this.renderFeedbackButton( idx ) }
									</div>
								</div>
							</div>
						);
					} ) }
				</Card>
			</div>
		);
	}
}
