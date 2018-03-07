# Happychat client

A JavaScript library to embed customer-facing Happychat in any host.

Take the JavaScript bundle at `targets/dist/happychat.js` and use it at your convenience. The library comes with two integration examples:

- Standalone: Happychat embedded in a bare HTML page. See `targets/standalone` for more info.
- WordPress: exposes Happychat as a shortcode in a WordPress environment. See `targets/wordpress` for more info.

## Development environment

Execute:

    npm install
    npm run start

and visit `localhost:9000`. The first time, you'll be redirected to the WordPress.com token approval screen. By default, it will connect to Happychat staging server, so make sure there is an available operator there.

[HACKING.md](./HACKING.md) contains some info that may be useful to navigate the codebase.

## Demo

If you want to just take a look at what the library can do, a demo is available at https://automattic.github.io/happychat-client

The code lives in the gh-pages branch and may not be in sync with master branch.

To update the demo:

* modify the `oauth_app_id` in `targets/standalone/config/index.js` to `56134`
* build the standalone target: `npm run targets:standalone`
* copy the files in `targets/standalone/public` to the `gh-pages` branch
* commit and push to see the changes live
