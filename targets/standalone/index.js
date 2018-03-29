/** @format */

/**
 * Internal dependencies
 */
import api from 'src/api';
import { AUTH_TYPE_WPCOM_OAUTH } from 'src/lib/auth/strategies';

/**
 * Module variables
 */

// expose the authentication configuration
window.happychatAuth = { type: AUTH_TYPE_WPCOM_OAUTH };

// expose the happychat api
window.Happychat = api;
