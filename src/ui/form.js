/** @format */

/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Internal dependencies
 */
import ContactForm from 'src/ui/components/contact-form';

export const renderTo = ( nodeId, options, submitForm ) =>
	ReactDOM.render(
		<ContactForm options={ options } submitForm={ submitForm } />,
		document.getElementById( nodeId )
	);
