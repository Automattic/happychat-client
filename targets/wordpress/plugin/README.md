# Happychat as a WordPress plugin

This WordPress plugin provides a `happychat` shortcode that will render the Happychat component in any page or post it is included. It may be configured through the `happychat_settings` filter.

It will make authenticated requests to WordPress.com on the user behalf to start a chat session. See [WordPress.com OAuth2](https://developer.wordpress.com/docs/oauth2/) for the details. In essence, what this means is that:

* the host should be allowed to make authenticated requests to WordPress.com, for which a WordPress.com app needs to be registered with the host as valid JS origin.
* the plugin needs a WordPress.com user token, which needs to be provided through the `happychat_settings` filter.

## Settings

### happychat_settings filter

The Happychat behavior can be configured through the filter `happychat_settings`. See [happychat-client API](https://github.com/Automattic/happychat-client/blob/master/docs/API.md) for complete info on every settings property.

### shortcode

The shortcode can be configured with a `canchat` attribute that will set the global `canChat` property setting (see [API docs](https://github.com/Automattic/happychat-client/blob/master/docs/API.md)).

If the attribute is provided, it will override what was set through the `happychat_settings` filter.

For example:

	[happychat canchat='false']

will set the global `canChat` property to `false`, so the form will never offer chat. This may be useful in to shut-down chat for a few periods of time, having forms that can offer chat and others that can't, and so on.
