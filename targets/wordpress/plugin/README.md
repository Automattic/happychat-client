# Happychat as a WordPress plugin

This WordPress plugin uses the [Happychat client library](https://github.com/automattic/happychat-client) to integrate Happychat within WordPress, and is developed within the same repository.

## API

### Init connection

`Happychat.open( domNode, groups, authToken );`

* `domNode` - HTML node where Happychat will be rendered.
* `groups` - array of groups this chat belongs to. It can be any of the groups declared in the the [Happychat constants](../../src/state/constants.js), and will be used to route the chat to the corresponding operator. For example, `[ 'woo' ]` will route the chat to a WooCommerce Happiness Engineer.
* `authToken` - the WordPress.com auth token that Happychat will use to authenticate the customer.

### Listen to events

#### availability

It reports whether or not the Happychat server can take new chats. It's fired every time the Happychat server availability stats change - for example, when a new operator joins or when chats are assigned.

`Happychat.on( 'availability', function( newStatus ) {
    // do something
} );`

#### ongoingConversation

It reports whether or not the customer is in an ongoingConversation, meaning that the chat has been assigned to an operator.

`Happychat.on( 'ongoingConversation', function( newStatus ) {
    // do something
} );`
