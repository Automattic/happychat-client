/**
 * Internal dependencies
 */

export default () => {
	if ( typeof window === 'undefined' ) {
		return;
	}

	if ( typeof Audio === 'undefined' ) {
		return;
	}

	const sound = new Audio( require( './chat-pling.wav' ) );
	sound.play();
};
