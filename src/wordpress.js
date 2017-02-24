/**
 * External dependencies
 */
import { applyMiddleware } from 'redux';
import { ifElse, pipe, prop, equals } from 'ramda';
/**
 * Internal dependencies
 */
import { WORDPRESS_REST_REQUEST } from './enhancer/types';

const rejectAfter = ms => new Promise( ( _, reject ) => {
	setTimeout( () => reject( new Error( `timeout after ${ ms } ms` ) ), ms );
} );

const timeout = ( promise, timeoutAfter = 5000 ) => Promise.race( [
	rejectAfter( timeoutAfter ),
	promise
] );

const proxy = ( ... args ) => timeout( new Promise( ( r, reject ) => {
	jQuery.wpcom_proxy_request( ... args ).then( r, reject );
} ) );

export default applyMiddleware( () => next => ifElse(
	pipe( prop( 'type' ), equals( WORDPRESS_REST_REQUEST ) ),
	pipe( prop( 'params' ), proxy ),
	next
) );
