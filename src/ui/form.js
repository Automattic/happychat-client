/** @format */

/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Internal dependencies
 */
import { ContactForm } from 'src/ui/components/contact-form';

export const renderTo = nodeId => {
	ReactDOM.render( <ContactForm />, document.getElementById( nodeId ) );
};
