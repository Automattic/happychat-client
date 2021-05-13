/** @format */

/**
 * External dependencies
 */
import React from 'react';
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

const areSameFlags = ( oldFlags, newFlags ) => {
	const oldTypes = oldFlags.map( flag => flag.type ).sort();
	const newTypes = newFlags.map( flag => flag.type  ).sort();
	return oldTypes.toString() === newTypes.toString();
};

export default class SSRTroubleshooting extends React.Component {
	state = {
		flags: [],
		hasInteracted: false,
		expandedFlags: [],
		feedbackGivenOn: [],
	};

	fetchFlags = debounce(() => {
		const { ssr } = this.props;

		const uiStateDefaults = { expandedFlags: [], feedbackGivenOn: [] };

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

			if ( areSameFlags( body, this.state.flags ) ) {
				return;
			}

			this.setState( { flags: body, ...uiStateDefaults } );
		} );
	}, 400)

	handleFormSubmit = () => {
		const { ssr } = this.props;
		const { flags, hasInteracted } = this.state;

		if ( flags.length > 0 ) {
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
		} else {
			recordEvent( 'happychatclient_ssr_troubleshooting_support_without_flags_showing' );
		}

		if ( hasInteracted ) {
			recordEvent( 'happychatclient_ssr_troubleshooting_support_after_interacted', {
				flag_count: flags.length,
			} );
		}
	}

	componentDidMount() {
		this.props.addFormSubmitListener( this.handleFormSubmit );
		if ( this.props.ssr ) {
			this.fetchFlags();
		}
	}

	componentWillUnmount() {
		this.props.removeFormSubmitListener( this.handleFormSubmit );
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( prevProps.ssr !== this.props.ssr ) {
			this.fetchFlags();
		}
	}

	handleFlagClick( flagIndex ) {
		const { expandedFlags, flags, hasInteracted } = this.state;
		const toggleIndex = this.state.expandedFlags.indexOf( flagIndex );
		const flag = flags[ flagIndex ];

		// Add or remove this from the list of expanded flags
		if ( toggleIndex === -1 ) {
			this.setState( { expandedFlags: [ ...expandedFlags, flagIndex ] } );
			recordEvent( 'happychatclient_ssr_troubleshooting_flag_expanded', {
				flag_type: flag.type,
			} );
		} else {
			this.setState( {
				expandedFlags: [
					...expandedFlags.slice(0, toggleIndex),
					...expandedFlags.slice(toggleIndex + 1)
				]
			} );
		}

		// If this was the first interaction, fire a Tracks event saying so
		if ( ! hasInteracted ) {
			recordEvent( 'happychatclient_ssr_troubleshooting_user_interacted', {
				flag_type: flag.type,
			} );
			this.setState( { hasInteracted: true } );
		}
	}

	handleActionLinkClick( flagIndex ) {
		const flag = this.state.flags[ flagIndex ];
		recordEvent( 'happychatclient_ssr_troubleshooting_flag_action_link_clicked', {
			flag_type: flag.type,
		} );
	}

	handleFeedbackClick( flagIndex ) {
		const { feedbackGivenOn, flags } = this.state;
		const flag = flags[ flagIndex ];
		this.setState( { feedbackGivenOn: [ ...feedbackGivenOn, flagIndex ] } );
		recordEvent( 'happychatclient_ssr_troubleshooting_flag_feedback_clicked', {
			flag_type: flag.type,
		} );
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

					Your site shows the following issue{ flags.length > 1 ? 's' : '' }. Please
					address { flags.length > 1 ? 'them' : 'it' } first to help us support you better.
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
											onClick={() => this.handleActionLinkClick( idx )}
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
