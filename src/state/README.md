# Happychat State

Happychat state shape:

- `chat`
  - `lastActivityTimestamp` - ms since the ongoing chat received or set a message.
  - `status` - one of the HAPPYCHAT_CHAT_STATUS [constants](./constants.js)
  - `timeline` - array of timeline messages, as received from the Happychat service.
- `connection`
  - `error` - one of the HAPPYCHAT_CONNECTION_ERROR [constants](./constants.js)
  - `isAvailable` - whether the Happychat service is accepting new chats.
  - `status` - one of the HAPPYCHAT_CONNECTION_STATUS [constants](./constants.js)
- `fallbackTicket`
	- `headers` - HTTP headers to be sent along the request
	- `method` - HTTP method to be used in the request
	- `msgInFlight` - message to show while the request is in flight
	- `msgTimeout` - message to show if the request times out
	- `payload` - the contents of the request
	- `parseResponse` - function to be used to parse the server response (see [API docs](../docs/API.md))
	- `response` - response contents
	- `status` - one of the HAPPYCHAT_FALLBACK_TICKET [constants](./constants.js).
	- `timeout` - ms to wait until a request is considered timed out
	- `url` - where to send the request
- `ui`
  - `currentMessage` - current message as typed by the customer in the happychat client.
  - `isMinimizing` - whether the happychat client is minimizing.
  - `isOpen` - whether the happychat client is opened.
  - `isReady` - whether the necessary CSS assets have been received.
  - `lostFocusAt` - ms since the happychat client lost focus.
- `user`
  - `currentUser`
    - `email`
  - `geoLocation`
    - `city`
    - `country_long`
    - `country_short`
    - `region`
  - `groups` - chat groups the user belongs to, used to route the user to the proper agent.
  - `isEligible` - whether the user can be offered chat.
  - `locale`

# SocketIO API

The SocketIO API models the SocketIO event flow purely as Redux actions. By making the SocketIO API Redux-driven, we have several advantages:

* the API surface is minimal and simpler to reason about: the Redux action becomes the single point of truth, no need to modify anything else.
* testability and real-time inspection of the system behavior is a matter of taking a look at the Redux flow and state.

## API

The connection has the following methods:

* `init( ... )`: configure the connection.
* `send( action )`: receives a send Redux action and emits the corresponding SocketIO event.
* `request( action, timeout )`: receives a request Redux action and emits the corresponding SocketIO event. Unlike send, the event fired takes a callback to be called upon ACK, or a timeout callback to be called if the event didn't respond after timeout milliseconds.

### Inbound SocketIO events

Every inbound SocketIO event dispatches its own Redux action, which is namespaced with the `HAPPYCHAT_IO_RECEIVE_EVENTNAME` type. Its action creator name convention is `receiveEventname`.

For example:

- the `init` SocketIO event dispatches the `receiveInit` action whose type is `HAPPYCHAT_IO_RECEIVE_INIT`.
- the `message` SocketIO event dispatches the `receiveMessage` action whose type is `HAPPYCHAT_IO_RECEIVE_MESSAGE`.

See `client/state/happychat/connection/actions.js` for a complete list of actions.

### Outbound SocketIO events

Every outbound SocketIO event has a corresponding Redux action. The middleware binds the Redux action with the proper connection method. The Redux actions types are namespaced with the `HAPPYCHAT_IO_SEND_EVENTNAME` or `HAPPYCHAT_IO_REQUEST_EVENTNAME` and the corresponding action creators are named after the connection method they use and its event name.

See `client/state/happychat/connection/actions.js` for a complete list of actions.

#### INIT action

The `init` action uses the `connection.init` method. Its action creator is called `initConnection` and the action shape is:

```
{
  type: HAPPYCHAT_IO_INIT,
  auth // promise that holds the Authentication mechanism
}
```

#### SEND actions

Any `send` action uses the `connection.send` method. Its action creator name convention is `sendEventname` and the action shape:

```
{
  type: HAPPYCHAT_IO_SEND_EVENTNAME,
  event: 'eventname'
  payload: ... // contents to be sent, can be anything: object, string, etc
}
```

Note that, at the moment of writing, we are using the `message` event to send different kind of messages: user messages, regular events, log events, and user info. These actions were shortened to convey a better API to upper layers without leaking underlying details, so the actions are named `sendMessage`, `sendEvent`, `sendLog` `sendUserInfo` instead of `sendMessageMessage`, `sendMessageEvent`, etc.

#### REQUEST actions

Any `request` action uses the `connection.request` method. Its creator name convention is `requestEventname` and the action shape:

```
{
  type: HAPPYCHAT_IO_REQUEST_EVENTNAME,
  event: 'eventname',
  payload: ... // contents to be sent, can be anything: object, string, etc
  timeout: timeout,
  callback: receiveTranscript,
  callbackTimeout: receiveTranscriptTimeout,
}
```
