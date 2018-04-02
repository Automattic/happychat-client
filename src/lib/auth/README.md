## Authentication Library
Initialize authentication library (authenticator). A strategy will be prepared based on the authentication type.

**The library is promised based, all exposed methods return promises.**

The module acts like a singleton. Both the strategy and the authentication options are saved in
the package's object which allows us to only initialize the library once. Meaning that after we
initialize the library it will be shared throughout the entire codebase without the need of
re-initialization.

Currently implemented strategies are:
 - `wpcom-oauth-by-token` - regular wpcom oAuth based on given token using `wpcom-xhr-request`
 - `wpcom-proxy-iframe` - proxy iframe wpcom authentication using Calypso's wpcom object

 ## API
 `init( settings )` - Initialize authentication library (authenticator). A strategy will be prepared based on the authentication type

 #### Available settings

| Key | Value | Required | Default | Available Values | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | string | Required | - | `wpcom-oauth` \| `wpcom-oauth-by-token` \| `wpcom-proxy-iframe` | A valid implemented strategy type |
| `options` | object | Optional | - | - | Set of authentication options
| `options.token` | string | Required by `wpcom-oauth-by-token` | - | - | oauth accessToken
| `options.proxy` | object | Required by `wpcom-proxy-iframe` | - | - | wpcom auth proxy object

`authorizeChat( state )` - Authorizes and starts a chat session by signing a JWT. Will return signed jwt, userId, skills and geolocation.

`getUser()` - Get current user details via WPcom api endpoint (/me), resolves if there is no selected strategy.

`login()` - Login using the strategy's login flow (currently wpcom oauth), resolves if there is no selected strategy.

## Strategies

### Existing strategies
`wpcom-oauth-by-token` - inside the package this type is represented by the `AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN` constant and it is implemented by [WPcomOAuth](./src/lib/auth/strategies/oauth.js)

`wpcom-proxy-iframe` - inside the package this type is represented by the `AUTH_TYPE_WPCOM_PROXY_IFRAME` constant and it is implemented by [WPcomProxyIframe](./src/lib/auth/strategies/proxy-iframe.js)

### Add a new strategy
All strategies should extend and implement all methods of [BaseStrategy](./src/lib/auth/strategies/index.js).
