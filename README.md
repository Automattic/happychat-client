# Happychat client

A JavaScript library to embed customer-facing Happychat in any host.

## How to use it

Take the JavaScript bundle at [targets/browser/happychat.js](./targets/browser/happychat.js) and embed it within your project. It'd expose the `Happychat` global variable:

	Happychat.open({
		nodeId: '<HTML node ID where the UI will be rendered>',
		accessToken: '<WordPress.com accessToken>'
	});

This code will render a contact form under the HTML node provided, and will let you open a chat session if there is some operator available in Happychat server.

Note that:

* the host needs to register a [WordPress.com OAuth application](http://developer.wordpress.com/apps/) so it's whitelisted to make requests to the WordPress.com REST API ([OAuth docs](https://developer.wordpress.com/docs/oauth2/)).
* the library needs to be passed a valid WordPress.com user `accessToken` to authenticate the user in Happychat ([docs/AUTH.md](./docs/AUTH.md)).

### Targets

Three integration targets are implemented in this repository:
- browser: Happychat embeddedable library that exposes the Happychat API through browser's `window`.
- npm: Happychat embeddedable npm package that exposes the api.
- standalone: Happychat embedded in a bare HTML page.
- WordPress: Happychat exposed as a shortcode in a WordPress environment.

See [targets/README.md](./targets/README.md) for more info.

## Development environment

Execute:

    npm install
    npm start

and visit `localhost:9000`. The first time, you'll be redirected to the WordPress.com token approval screen. By default, it will connect to Happychat staging server, so make sure there is an available operator there.

[HACKING.md](./docs/HACKING.md) contains some info that may be useful to navigate the codebase.

## Demo

If you want to just take a look at what the library can do, a demo is available at https://automattic.github.io/happychat-client

The code lives in the gh-pages branch. To update the demo:

* modify the `oauth_client_id` in `targets/standalone/config/index.js` to `56134`
* build the standalone target: `npm run targets:standalone`
* copy the files in `targets/standalone/public` to the `gh-pages` branch
* commit and push to see the changes live
