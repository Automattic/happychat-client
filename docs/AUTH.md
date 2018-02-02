# Authentication

Happychat Embedded uses an user token for querying the WordPress.com REST API.

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
