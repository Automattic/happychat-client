## Authentication Library
Initialize authentication library (authenticator). Based on the authentication type a strategy
will be prepared.

**The library is promised based, all exposed methods return promises.**

The module acts like a singleton. Both the strategy and the authentication options are saved in
the package's object which allows us to only initialize the library once. Meaning that after we
initialize the library it will be shared throughout the entire codebase without the need of
re-initialization.

Currently implemented strategies are:
 - `wpcom-oauth` - regular wpcom oAuth process using `wpcom-oauth-cors` package
 - `wpcom-oauth-by-token` - regular wpcom oAuth based on given token using `wpcom-xhr-request`
 - `wpcom-proxy-iframe` - proxy iframe wpcom authentication using Calypso's wpcom object

 ## API
 `init( settings )` - Initialize authentication library (authenticator). Based on the authentication type a strategy will be selected.

 #### Available settings

| Key | Value | Required | Default | Available Values | Description |
| --- | --- | --- | --- | --- | --- |
| `type` | string | Required | - | `wpcom-oauth` \| `wpcom-oauth-by-token` \| `wpcom-proxy-iframe` | A valid implemented strategy type |
| `options` | object | Optional | - | - | Set of authentication options
| `options.token` | string | Required by `wpcom-oauth-by-token` | - | - | oauth accessToken
| `options.proxy` | object | Required by `wpcom-proxy-iframe` | - | - | wpcom auth proxy object

`authorizeChat( state )` - Authorize and start chat session by signing a JWT and returns jwt, userId, skills and geolocation prepared.

`getUser()` - Get current user details via WPcom api endpoint (/me), resolves if there is no selected strategy.

`login()` - Login using the strategy's login flow (currently wpcom oauth), resolves if there is no selected strategy.

## Strategies

### Existing strategies
`wpcom-oauth` - inside the package this type is represented by the `AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN` constant and it is implemented by [WPcomOAuth](./src/lib/auth/strategies/oauth.js)

`wpcom-oauth-by-token` - inside the package this type is represented by the `AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN` constant and it is implemented by [WPcomOAuth](./src/lib/auth/strategies/oauth.js)

`wpcom-proxy-iframe` - inside the package this type is represented by the `AUTH_TYPE_WPCOM_OAUTH_BY_TOKEN` constant and it is implemented by [WPcomProxyIframe](./src/lib/auth/strategies/proxy-iframe.js)

### Add a new strategy
All strategies should extend and implement all methods of [BaseStrategy](./src/lib/auth/strategies/index.js).
