/** @format */

/**
 * External dependencies
 */
import babel from 'rollup-plugin-babel';

export default {
	input: './index.js',
	output: { file: './dist/happychat.rollup.js', format: 'iife' },
	plugins: [ babel( { exclude: 'node_modules/**' } ) ],
};
