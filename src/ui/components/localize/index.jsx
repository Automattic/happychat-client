/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import get from 'lodash/get';
import interpolateComponents from 'interpolate-components';

export const mockLocalize = ComposedComponent =>
	class extends Component {
		translate( msg, options ) {
			let translatedMsg = msg;
			if ( get( options, 'args', false ) ) {
				translatedMsg = msg.replace( '%s', options.args );
			}
			if ( get( options, 'components', false ) ) {
				translatedMsg = interpolateComponents( {
					mixedString: translatedMsg,
					components: options.components,
				} );
			}
			return translatedMsg;
		}

		render() {
			return <ComposedComponent { ...this.props } translate={ this.translate } />;
		}
	};
