# API

## Init Settings

Happychat can be configured by a settings object on initialization

	Happychat.open( settings );

with the following top-level properties:

| Key | Value | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `accessToken` | string | Mandatory | `null` | A valid WordPress.com token to make authenticated request on the user behalf. |
| `entry` | string | Optional | `ENTRY_FORM` | What should be rendered as the first entry point for Happychat. Valid values are `ENTRY_FORM` (renders the contact form) `ENTRY_CHAT` (renders the chat form). |
| `entryOptions` | object | Optional | `{}` | Configures happychat entry points. See details below. |
| `groups` | array | Optional | `[WP.com]` | What group the chat session should be routed to. Valid values are `WP.com`, `woo`, and `jpop`. |
| `canChat` | bool | Optional | `true` | Whether the user can be offered chat or not. |
| `nodeId` | string | Mandatory | `null` | The id of the HTMLNode where Happychat will be rendered. |

### The entry prop

The Happychat library provides two main interfaces: a contact form, and a chat form. By default, it'll show the contact form and it will render the chat form on clicking the form submit button. The contact form main behavior can be changed through the `entryOptions` prop.

Contact form:

![](./img/contact-form-chat.png)

Chat form:

![](./img/chat-form.png)

### The entryOptions prop

The `entryOptions` property allows for configuring the text and behavior or Happychat entry point.

| Key | Value | Default | Description |
| --- | --- | --- | --- | --- |
| `formTitle` | string | `Contact form` | Title of form. |
| `primaryOptionsTitle` | string | `How can we help` | Title of primary options menu. |
| `primaryOptions` | array | `[]` | Contains the options to be shown in the primary menu. They'll be rendered either as a segmented control or a dropdown depending on the window width. If not provided, this section won't be shown. |
| `secondaryOptionsTitle` | string | `Any more info you want to share?` | Title of secondary options menu. |
| `secondaryOptions` | array | `[]` | Contains the options to be shown in the secondary menu. They'll be rendered either as a segmented control or a dropdown depending on the window width. If not provided, this section won't be shown. |
| `itemListTitle` | string | `Which product do you need help with?` | Title of item list menu. |
| `itemList` | array | `[]` | Contains the options to be shown in the item list menu. They'll be rendered as a dropdown. If not provided, this section won't be shown. |
| `fallbackTicket` | object | `{}` | Configures a default route that Happychat will use to offer ticket support as a fallback when chat is not available. |

**fallbackTicket config options**

* `pathToCreate`: path to the create ticket endpoint where Happychat will make a XHR request with the form data, so the host can process it. It may return an operation ID that will be used by the `pathToShow` option to show a message to the user.
* `headers`: request headers to be sent along the `pathToCreate` request. This allows for hooking nonces into the request, for example.
* `pathToShow`: upon a successful response from the `pathToCreate` endpoint, Happychat can show a link to the ticket created if one is configured. This admits a `<ticket-id>` expression that will be filled with the response provided by the `pathToCreate` endpoint.

### Example

For example, this settings object:

	const settings = {
		accessToken: <WordPress.com user access token>,
		nodeId: <HTML Node ID>,
		entryOptions: {
			formTitle: 'Happychat example',
			primaryOptionsTitle: 'Primary options',
			primaryOptions: [
				{ 'value': 'before-buy', 'label': 'Before you buy' },
				{ 'value': 'account', 'label': 'Help with my account' },
				{ 'value': 'broken', 'label': 'Something is broken' },
			],
			secondaryOptionsTitle: 'Secondary options',
			secondaryOptions: [
				{ 'value': 'themes', 'label': 'Themes' },
				{ 'value': 'extensions', 'label': 'Extensions' },
			],
			itemListTitle: 'Item list',
			itemList: [
				{ 'value': 'p1', 'label': '2010 default theme' },
				{ 'value': 'p2', 'label': '2011 default theme' },
			],
		}
	};

will render this form:

![](./img/contact-form-config.png)
