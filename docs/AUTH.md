# Authentication

Happychat Embedded supports 2 different authentication strategies. You can select the preferred
strategy via the `authentication` parameter of the `Happychat.open()` method.

### Direct WPCOM oAuth (wpcom-oauth-by-token)
Exemplified in the `WordPress` target this strategy follows assumes that oAuth flows were already 
followed and we have an `access_token`. The token will be passed to the Happychat client api and
it will be used to access WP.com endpoints.

Inside the package this type is represented by the `AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN` constant.
```
// Happychat setup for this strategy
Happychat.open(
	authentication: {
		type: 'wpcom-oauth-by-token',
		options: {
			token: 'your-oauth-access-token'
		}
	}
)
```

### Proxy Iframe WPCOM oAuth (wpcom-proxy-iframe)
Exemplified in the Calypso integration this strategy is using a passed `proxy` object that is 
assumed to be an authenticated instance of [wpcom-proxy-request](https://github.com/Automattic/wpcom-proxy-request).
That instance will be used to call WP.com endpoints similar to how it works in Calypso.

This strategy assumes that the actual customer authentication is done on the host's side (Calypso in
our case).

Inside the package this type is represented by the `AUTH_TYPE_WPCOM_PROXY_IFRAME` constant.
```
// Happychat setup for this strategy
Happychat.open(
	authentication: {
		type: 'wpcom-proxy-iframe',
		options: {
			proxy: wpComProxyIframeObject
		}
	}
)
```

**For more info about the internals of the authentication library see [this](./src/lib/auth/README.md)**

## Wordpress.com REST API endpoints in use

See `src/lib/wpcom/` for more info.

* `/me` - to retrieve user info.
* `/happychat/sessions` - to get a session id and user location info.
* `/jwt/sign` - to create a [JSON Web Token](https://jwt.io/introduction/) (JWT) out of the user credentials and the happychat session id.

## Authentication mechanism

From the Happychat Embedded perspective, the authentication process is:

1. Get user credentials and happychat session id
2. Create a JSON Web Token
3. Connect to Happychat Service

**Get user credentials and happychat session id**

Happychat Embedded requests user credentials (`/me` endpoint) and session id (`/happychat/session` endpoint) to the WordPress.com REST API via XMLHTTPRequest.

**Create a JSON Web Token**

Happychat Embedded requests a JWT by sending as payload the user credentials and the happychat session id to the `/jwt/sign` endpoint. A JWT is a secure way to share data with 3rd parties, and the payload is the data we want to share.

**Connect to Happychat Service**

Happychat Embedded sends, via SocketIO, the user info and the JWT to Happychat Service. The service will decode the JWT via the `/jwt/validate` WordPress.com REST API endpoint.
