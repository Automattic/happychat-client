# Happychat as a WordPress plugin

This WordPress plugin provides a `happychat` shortcode that will render the Happychat component in any page or post it is included.

It will make authenticated requests to WordPress.com on the user behalf to start a chat session. See [WordPress.com OAuth2](https://developer.wordpress.com/docs/oauth2/) for the details. In essence, what this means is that:

* the host origin should be allowed to make authenticated requests to WordPress.com, for which a WordPress.com app needs to be registered with the host as valid JS origin.
* the plugin needs a WordPress.com user token (`access_token`) that should be provided through the `happychat_wpcom_token` filter.

## Filters

| Tag | Value | Default | Description |
| --- | --- | --- | --- |
| `happychat_is_user_eligible` | boolean `$eligibility` | `true` | Whether the user is eligible for a chat session. |
| `happychat_user_group` | string `$group` | `WP.com` | What group the chat session should be routed to. Valid values are `WP.com`, `woo`, and `jpop`. |
| `happychat_wpcom_token` | string `$token` | `null` | A valid WordPress.com token to make authenticated request on the user behalf. Happychat will not be renderer if the token is not provided. |
