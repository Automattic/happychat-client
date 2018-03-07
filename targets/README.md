# Targets

This folder contains target apps that embed the Happychat library and we actively maintain. Every target has a companion webpack build config and a npm command.

## targets/dist

Contains the production-ready JavaScript and CSS assets.

To build this target, execute:

	npm run targets:dist

It'll build the JS library using the `webpack.dist.config.js`. By defining `NODE_ENV` to `production` within the webpack config, we leverage some optimizations of our dependencies (slimmer React build, for example) and also take the config values from `src/config/production.json` (which, for example, teach the library to connect to Happychat production server).

It'll build the CSS asset using the `postcss.config.json`. Note that the CSS is automatically requested once the Happychat component is initialized. You never need to embed this manually in your page. It's served from the WordPress.com CDN at https://widgets.wp.com/happychat/happychat.css so any time it's updated it needs to be uploaded there for changes to take effect.

## targets/standalone

Contains a standalone example of Happychat embedded in a bare HTML webpage.

To build this target, execute:

	npm run targets:standalone

This build uses `webpack.standalone.config.js` which doesn't include some production optimization (uglify, etc) so it's readable for development. By defining the `NODE_ENV` to `development` within the webpack config, the config values are taken from `src/config/development.json` (which, for example, teach the library to connect to Happychat production server).

It also defines a server for development:

    npm install
    npm run start

And visit `localhost:9000`.

## targets/wordpress

Contains a WordPress plugin that exposes a `[happychat]` shortcode, it leverages the library to provide a Happychat experience in any WordPress.

To build this target instead, execute:

	npm run targets:wordpress

This build uses `webpack.wordpress.config.js` which doesn't include some production optimization (uglify, etc) so it's readable for development. By defining the `NODE_ENV` to `development` within the webpack config, the config values are taken from `src/config/development.json` (which, for example, teach the library to connect to Happychat production server).

Should you want a production build, execute

	npm run targets:dist:js
	cp targets/dist/happychat.js targets/wordpress/assets/happychat.js
