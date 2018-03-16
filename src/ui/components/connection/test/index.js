/** @format */

/**
 * Internal dependencies
 */
import { HappychatConnection } from '../index';

describe( 'Connection', () => {
	let component;
	beforeEach( () => {
		component = new HappychatConnection();
		component.props = {
			onInitConnection: jest.fn(),
			getAuth: jest.fn(),
		};
	} );

	test( 'initConnection if connection is uninitialized and happychat is enabled', () => {
		component.props.isConnectionUninitialized = true;
		component.props.isHappychatEnabled = true;
		component.componentDidMount();
		expect( component.props.onInitConnection ).toHaveBeenCalled();
	} );

	test( 'do not initConnection if connection is not uninitialized', () => {
		component.props.isConnectionUninitialized = false;
		component.props.isHappychatEnabled = true;
		component.componentDidMount();
		expect( component.props.onInitConnection ).not.toHaveBeenCalled();
	} );

	test( 'do not initConnection if happychat is not enabled', () => {
		component.props.isConnectionUninitialized = true;
		component.props.isHappychatEnabled = false;
		component.componentDidMount();
		expect( component.props.onInitConnection ).not.toHaveBeenCalled();
	} );
} );
