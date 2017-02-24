# Happychat Client for customers

Redux based happychat client for connecting to happychat.

## Installing

    git clone git@github.com:Automattic/happychat-client.git
    cd happychat-client
    npm install

## Running

Develop using `webpack-dev-server`:

    npm start

A whitelisted hostname is required to access the page so that `jquery.wpcom-proxy-request` will work properly. By default it we serve off of port 3000 so `calypso.localhost:3000` will work.

Here's a list of whitelisted hostnames:

```
https://wordpress.com
http://widgets.wp.com
https://widgets.wp.com
http://wpeditor.org
https://dev-mc.a8c.com
https://mc.a8c.com
https://wpeditor.org
http://calypso.dev:3000
https://calypso.dev:3000
http://calypso.dev:3001
https://calypso.dev:3001
http://calypso.localhost:3000
https://calypso.localhost:3000
http://calypso.localhost:3001
https://calypso.localhost:3001
https://calypso.live
http://notifications.dev:3000
http://notifications.dev:8888
https://notifications.dev:3000
https://automattic.github.io
http://wpeditor.local
http://wpeditor.local:3000
http://wpeditor.local:8888
https://wpeditor.local
https://wpeditor.local:3000
https://wpeditor.local:8888
http://wpeditor.dev
http://wpeditor.dev:8888
https://wpeditor.dev
https://wpeditor.dev:8888
```

## Building

To produce static assets:

    npm run build

The main application will be at `dist/app.js`. It depends on `jquery` and `jquery.wpcom-proxy-request`