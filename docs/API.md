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
