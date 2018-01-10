/** @format */

/**
 * External dependencies
 */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure( { adapter: new Adapter() } );

// configure snapshot serializer for enzyme
const { createSerializer } = require.requireActual( 'enzyme-to-json' );
expect.addSnapshotSerializer( createSerializer( { mode: 'deep' } ) );
