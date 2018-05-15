# API

## Init Settings

Happychat can be configured by a settings object on initialization

	Happychat.open( settings );

with the following top-level properties:

| Key | Value | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `authentication` | object | Mandatory | `null` |  Configures Happychat authentication. See details below. |
| `entry` | string | Optional | `ENTRY_FORM` | What should be rendered as the first entry point for Happychat. Valid values are `ENTRY_FORM` (renders the contact form) `ENTRY_CHAT` (renders the chat form). |
| `entryOptions` | object | Optional | `{}` | Configures Happychat entry points. See details below. |
| `groups` | array | Optional | `[WP.com]` | What group the chat session should be routed to. Valid values are `WP.com`, `woo`, and `jpop`. |
| `canChat` | bool | Optional | `true` | Whether the user can be offered chat or not. |
| `nodeId` | string | Mandatory | `null` | The id of the HTMLNode where Happychat will be rendered. |

### Authentication

Happychat currently supports two authentication mechanisms ([more info](./src/lib/auth/README.md)):

* Via WordPress.com OAUth token, used in the standalone example.
* Via a proxy iframe that send requests to WordPress.com, used in Calypso.

How to configure authentication via OAUth token:

	Happychat.open( {
		authentication: {
			type: 'wpcom-oauth-by-token',
			options: {
				token: <WordPress.com OAUth access token>
			},
		},
	} );

How to configure authentication via proxy iframe:

	Happychat.open( {
		authentication: {
			type: 'wpcom-proxy-iframe',
			options: {
				proxy: <WordPress.com proxy object>
			},
		},
	} );

### The entry prop

The Happychat library provides two main interfaces: a contact form, and a chat form. By default, it'll show the contact form and it will render the chat form on clicking the form submit button. The contact form main behavior can be changed through the `entryOptions` prop.

Contact form:

![](./img/contact-form-chat.png)

Chat form:

![](./img/chat-form.png)

### The entryOptions prop

The `entryOptions` property allows for configuring the text and behavior or Happychat entry point.

| Key | Value | Default | Description |
| --- | --- | --- | --- |
| `formTitle` | string | `Contact form` | Title of form. |
| `primaryOptionsTitle` | string | `How can we help` | Title of primary options menu. |
| `primaryOptions` | array | `[]` | Contains the options to be shown in the primary menu. They'll be rendered either as a segmented control or a dropdown depending on the window width. If not provided, this section won't be shown. |
| `secondaryOptionsTitle` | string | `Any more info you want to share?` | Title of secondary options menu. |
| `secondaryOptions` | array | `[]` | Contains the options to be shown in the secondary menu. They'll be rendered either as a segmented control or a dropdown depending on the window width. If not provided, this section won't be shown. |
| `itemListTitle` | string | `Which product do you need help with?` | Title of item list menu. |
| `itemList` | array | `[]` | Contains the options to be shown in the item list menu. They'll be rendered as a dropdown. If not provided, this section won't be shown. |
| `openTextFieldTitle` | string | `What is the URL of your site?` | Title for the textfield component. |
| `openTextField` | object | `{}` | Contains conditions under which to show the text field. |
| `openTextAreaTitle` | string | `Any more info you want to share?` | Title for the textarea component. |
| `openTextArea` | object | `{}` | Contains conditions under which to show the text area.|
| `fallbackTicket` | object | `{}` | Configures a default route that Happychat will use to offer ticket support as a fallback when chat is not available. |

**primaryOptions**

Every option is an object that needs to have the `value` and `label` props. Values within a menu need to be unique; the labels will be shown in the UI. Both need to be strings.

Every option can also have an optional boolean `canChat` property (will be true if none is passed). If `canChat` is set to false, Happychat won't let to start a chat session when this option is selected.

For example:

		{ 'value': 'themes', 'label': 'Themes', 'canChat': false }

when this option is selected chat won't be offered.

**secondaryOptions**

In addition to the `value`, `label`, and `canChat` properties, the options in this section can define a `primary` option.

`primary` is an array that contains values of the options present in the `primaryOptions` section. When the selected primary option is any of the items from this array, the secondary option will be rendered - otherwise it won't be shown. If the option doesn't have a primary property, it'll be always rendered.

For example:

	{ value: 'themes', label: 'Themes', primary: [ 'before-buy', 'my-account' ] }

this option will only be shown when the value of the selected primary option is 'before-buy' or 'my-account'.

**itemList**

In addition to the `value`, `label`, `canChat` and `primary` properties, the options in this section can define a `secondary` option.

The `secondary` property works the same way that the `primary` one but taking into account the selected secondary option instead.

For example:

	{ value: 'themes', label: 'Themes', primary: [ 'before-buy' ], secondary: [ 'themes' ] }

this option will only be shown when the value of the selected primary option is `before-buy` and the values of the selected secondary option is `themes`.

**openTextField / openTextArea**

Can define `primary` and `secondary` options that control when to show this field. The open text fields can also have a boolean `isRequired` option, that signals whether the form can be submitted without filling these fields - by default, its value is false.

For example:

	{ primary: [ 'before-buy' ], secondary: [ 'themes' ], isRequired: true }

the field will only be shown when the value of the selected primary option is `before-buy` and the values of the selected secondary option is `themes`. Unless it's filled, the submit button will be disabled.

**fallbackTicket config options**

The contact form can create a chat session or route the request to a specified endpoint. Here's how to configure it:

`pathToCreate`: path to the endpoint where Happychat will make a XHR request with the form data. The request payload will be a JSON object containing all entryOptions properties and:

* primarySelected: the selected primary option,
* secondarySelected: the selected secondary option,
* itemSelected:	the selected item option,
* subject: the subject's value,
* message: the message's value,
* openTextAreaValue: the openTextArea's value,
* openTextFieldValue:	the openTextField's value,

`pathToShow`: upon a successful response from the `pathToCreate` endpoint, Happychat can show a link to the ticket created if one is configured. This admits a `<ticket-id>` expression that will be filled with the response provided by the `pathToCreate` endpoint.

`headers`: additional request headers to be sent along the `pathToCreate` request. This allows for hooking WordPress nonces into the request, for example.

For example:

	{
		headers: {
			'X-Test-Header': 'Savoury butter is the best breakfast',
		},
		pathToCreate: '/create-ticket',
		pathToShow: '/show-ticket/<ticket-id>',
	}

will send a XHR request to the '/create-ticket' endpoint with the following payload. Upon successful response, the form will shown a message with a link to the `<path>/show-ticket/<ticket-id>` URL, being `ticket-id` the response received from making a request to `pathToShow`.

### Examples

#### Default

Settings:

	Happychat.open( {
		nodeId: <HTML Node ID>,
	} );

will render this form:

![](./img/contact-form-default.png)

#### With titles and primary, secondary and itemList menus

Settings:

	Happychat.open( {
		nodeId: <HTML Node Id>,
		entryOptions: {
			formTitle: 'Contact form example',
			primaryOptionsTitle: 'Primary options title',
			primaryOptions: [
				{ 'value': 'purchase', 'label': 'Something I have purchased' },
				{ 'value': 'account', 'label': 'Help with my account' },
				{ 'value': 'broken', 'label': 'Something is broken' },
			],
			secondaryOptionsTitle: 'Secondary options title',
			secondaryOptions: [
				{ 'value': 'themes', 'label': 'Themes' },
				{ 'value': 'plugins', 'label': 'Plugins' },
			],
			itemListTitle: 'Item list title',
			itemList: [
				{ 'value': 'p1', 'label': '2010 theme' },
				{ 'value': 'p2', 'label': '2011 theme' },
				{ 'value': 'p3', 'label': 'Jetpack' },
				{ 'value': 'p4', 'label': 'WooCommerce' },
			],
	} );

![](./img/contact-form-configured.png)

#### With conditional secondaryOptions and itemList

Settings:

	Happychat.open( {
		nodeId: <HTML Node Id>,
		entryOptions: {
			formTitle: 'Contact form example',
			primaryOptionsTitle: 'Primary options title',
			primaryOptions: [
				{ 'value': 'purchase', 'label': 'Something I have purchased' },
				{ 'value': 'account', 'label': 'Help with my account' },
				{ 'value': 'broken', 'label': 'Something is broken' },
			],
			secondaryOptionsTitle: 'Secondary options title',
			secondaryOptions: [
				{ 'value': 'themes', 'label': 'Themes', primary: [ 'purchase', 'broken' ] },
				{ 'value': 'plugins', 'label': 'Plugins', primary: [ 'purchase', 'broken' ] },
				{ 'value': 'password', 'label': 'Change password' },
				{ 'value': 'delete', 'label': 'Delete account' },
			],
			itemListTitle: 'Item list title',
			itemList: [
				{ 'value': 'p1', 'label': '2010 theme', secondary: [ 'themes' ] },
				{ 'value': 'p2', 'label': '2011 theme', secondary: [ 'themes' ] },
				{ 'value': 'p3', 'label': 'Jetpack', secondary: [ 'plugins' ] },
				{ 'value': 'p4', 'label': 'WooCommerce', secondary: [ 'plugins' ] },
			],
	} );

![](./img/contact-form-configured.png)

#### Configure when to offer chat

Using the form in the previous example, we can configure when to offer chat by using the `canChat` property per option - note that if the `canChat` global property is set to false, we'll never offer chat for that user.

For example, for these settings:

	Happychat.open( {
		nodeId: <HTML Node Id>,
		entryOptions: {
			formTitle: 'Contact form example',
			primaryOptionsTitle: 'Primary options title',
			primaryOptions: [
				{ 'value': 'purchase', 'label': 'Something I have purchased' },
				{ 'value': 'account', 'label': 'Help with my account', 'canChat': false },
				{ 'value': 'broken', 'label': 'Something is broken' },
			],
			secondaryOptionsTitle: 'Secondary options title',
			secondaryOptions: [
				{ 'value': 'themes', 'label': 'Themes' },
				{ 'value': 'plugins', 'label': 'Plugins', canChat: false },
			],
			itemListTitle: 'Item list title',
			itemList: [
				{ 'value': 'p1', 'label': '2010 theme' },
				{ 'value': 'p2', 'label': '2011 theme', 'canChat': false },
				{ 'value': 'p3', 'label': 'Jetpack' },
				{ 'value': 'p4', 'label': 'WooCommerce' },
			],
	} );

If any of `Help with my account` (primary menu), `Plugins` (secondary menu) or `2011 theme` (itemList menu) is selected no chat will be offered - no matter whether there is actual chat availability in the system.

#### Fallback ticket when there is no chat

In some cases, we'd want to offer a fallback option when chat is not available. Use the `fallbackTicket` prop for this. When chat is not available, the form will show an additional "Subject" field and the submit button will change to "Send a ticket".

	Happychat.open( {
		nodeId: <HTML Node Id>,
		entryOptions: {
			formTitle: 'Contact form example',
			primaryOptionsTitle: 'Primary options title',
			primaryOptions: [
				{ 'value': 'purchase', 'label': 'Something I have purchased' },
				{ 'value': 'account', 'label': 'Help with my account', 'canChat': false },
				{ 'value': 'broken', 'label': 'Something is broken' },
			],
			secondaryOptionsTitle: 'Secondary options title',
			secondaryOptions: [
				{ 'value': 'themes', 'label': 'Themes' },
				{ 'value': 'plugins', 'label': 'Plugins', canChat: false },
			],
			itemListTitle: 'Item list title',
			itemList: [
				{ 'value': 'p1', 'label': '2010 theme' },
				{ 'value': 'p2', 'label': '2011 theme', 'canChat': false },
				{ 'value': 'p3', 'label': 'Jetpack' },
				{ 'value': 'p4', 'label': 'WooCommerce' },
			],
			fallbackTicket: {
				'pathToCreate': '/create-ticket'
			}
		} );

![](./img/contact-form-fallback-ticket.png)
