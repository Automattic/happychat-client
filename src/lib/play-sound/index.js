/**
 * Internal dependencies
 */

function isSupported() {
	if ( typeof window === 'undefined' ) {
		return false;
	}

	if ( typeof Audio === 'undefined' ) {
		return false;
	}

	return true;
}

const SUPPORTED = isSupported();

const SRC = SUPPORTED ? require( './chat-pling.wav' ) : null;

export default () => {
	if ( ! SUPPORTED ) {
		return;
	}
	const sound = new Audio( SRC );
	sound.play();
};
