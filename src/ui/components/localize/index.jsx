/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import get from 'lodash/get';

export const mockLocalize = ComposedComponent =>
	class extends Component {
		translate( msg, options ) {
			let translatedMsg = msg;
			if ( get( options, 'args', false ) ) {
				translatedMsg = msg.replace( '%s', options.args );
			}
			return translatedMsg;
		}

		render() {
			return <ComposedComponent { ...this.props } translate={ this.translate } />;
		}
	};
