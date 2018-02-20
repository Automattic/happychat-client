# Happychat as a WordPress plugin

This WordPress plugin provides a `happychat` shortcode that will render the Happychat component in any page or post it is included. It may be configured through the `happychat_settings` filter.

It will make authenticated requests to WordPress.com on the user behalf to start a chat session. See [WordPress.com OAuth2](https://developer.wordpress.com/docs/oauth2/) for the details. In essence, what this means is that:

* the host should be allowed to make authenticated requests to WordPress.com, for which a WordPress.com app needs to be registered with the host as valid JS origin.
* the plugin needs a WordPress.com user token, which needs to be provided through the `happychat_settings` filter.

## Happychat Settings

The Happychat behavior may be configured through the filter `happychat_settings` that returns an array with the following options.

| Key | Value | Default | Description |
| --- | --- | --- | --- |
| `accessToken` | string | `null` | A valid WordPress.com token to make authenticated request on the user behalf. Happychat will not be renderer if the token is not provided. |
| `entry` | string | `ENTRY_FORM` | What should be rendered as the entry point for Happychat. Valid values are `ENTRY_FORM` (renders the contact form) `ENTRY_CHAT` (renders the chat form). |
| `entryOptions` | array | `[]` | Array containing the options to configure happychat entry points. See details below. |
| `groups` | array | `[WP.com]` | What group the chat session should be routed to. Valid values are `WP.com`, `woo`, and `jpop`. |
| `nodeId` | string | `happychat-form` | The id of the HTMLNode where Happychat will be rendered. |

### Entry options

`primaryOptions`: array containing key/value pairs to show as the contact form primary options. For example:

	$happychat_settings = [
		'entryOptions' => [
			'primaryOptions': [
				[ 'value' => 'before-buy', 'label' => 'Before you buy' ],
				[ 'value' => 'account',    'label' => 'My account' ],
				[ 'value' => 'purchases',  'label' => 'Purchases' ],
			],
		],
	];

`secondaryOptions`: array containing key/value pairs to show as the contact form secondary options. For example:

	$happychat_settings = [
		'entryOptions' => [
			'secondaryOptions': [
				[ 'value' => 'before-buy', 'label' => 'Before you buy' ],
				[ 'value' => 'account',    'label' => 'My account' ],
				[ 'value' => 'purchases',  'label' => 'Purchases' ],
			],
		],
	];

`itemList`: array containing key/value pairs to show as a dropdown in the contact form. For example:

	$happychat_settings = [
		'entryOptions' => [
			'itemList': [
				[ 'value' => 'product-1', 'label' => 'Awesowe Product' ],
				[ 'value' => 'product-2', 'label' => 'Beautiful Product' ],
			],
		],
	];

`fallbackTicket`: object to configure the fallback ticket feature.

* `pathToCreate`: path to the create ticket endpoint where Happychat will make a XHR request with the form data, so the host can process it. It may return an operation ID that will be used by the `pathToShow` option to show a message to the user.

* `headers`: request headers to be sent along the `pathToCreate` request. This allows for hooking nonces into the request, for example.

* `pathToShow`: upon a successful response from the `pathToCreate` endpoint, Happychat can show a link to the ticket created if one is configured. This admits a `<ticket-id>` expression that will be filled with the response provided by the `pathToCreate` endpoint.

For example:

	$happychat_settings = [
		'fallbackTicket' => [
			'pathToCreate' => '/create-ticket',
			'pathToShow'   => '/show-ticket/<ticket-id>',
			'headers'      => [
				'X-WP-Nonce' => wp_create_nonce( 'wp_rest' )
			]
		]
	];
