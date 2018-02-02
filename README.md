# Happychat client

A JavaScript library to embed customer-facing Happychat in any host.

## Running the demo

    npm install
    npm run start

Visit localhost:9000 and click the Happychat button to start a chat. The first time, you'll be redirected to the WordPress.com token approval screen.

By default, it will connect to Happychat staging server, so make sure there is an available operator to chat with.

## Targets

It provides two integration examples:

- A standalone app: Happychat in a bare HTML page. See `targets/standalone` for more info.
- A WordPress plugin: exposes Happychat as a shortcode. See `targets/wordpress` for more info.
