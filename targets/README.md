# Targets

This folder contains target apps that embed the Happychat library and we actively maintain. Every target has a companion webpack build config and a npm command.

## Developing

There is a command for developing on each target `npm run dev:<target>`. While developing the `NODE_ENV` is set to `development` within the webpack config, the config values are taken from `src/config/development.json`.

**When developing local css will be loaded but for now there is no watch mechanism. Stop and start the 
command to rebuild local css. Or just run `npm run dev:<target>:css` in another terminal.**


## Production builds

`npm run build` - will create production builds for all the targets, you can build a target independenly
by running `npm run build:<target>`. 

For all production builds `NODE_ENV` is set to `production` within the webpack config, we leverage some optimizations of our dependencies (slimmer React build, for example) and also take the config values from `src/config/production.json` (which, for example, teach the library to connect to Happychat production server).

It'll build the CSS asset using the `postcss.config.json`. Note that the CSS is automatically requested once the Happychat component is initialized. You never need to embed this manually in your page. It's served from the WordPress.com CDN at https://widgets.wp.com/happychat/happychat.css so any time it's updated it needs to be uploaded there for changes to take effect.


## targets/cdn

Contains the production-ready JavaScript and CSS assets. It'll build the JS library using the `webpack.cdn.config.js`. 

To develop this target (`http://localhost:9000`), execute:

	npm run dev:cdn

To build this target for production, execute:

	npm run build:cdn


## targets/standalone

Contains a standalone example of Happychat embedded in a bare HTML webpage. It'll build the JS library using the `webpack.standalone.config.js`. 

To develop this target (`http://localhost:9000`), execute:

	npm run dev:standalone 
	// or
	npm start

To build this target for production, execute:

	npm run build:standalone


## targets/wordpress

Contains a WordPress plugin that exposes a `[happychat]` shortcode, it leverages the library to provide a Happychat experience in any WordPress. Because it leverages the browser's `window` object this target will use the same entry point as browser (`targets/browser/index.js`). It'll build the JS library using the `webpack.wordpress.config.js`. 

To develop this target (`http://localhost:9000`), execute:

	npm run dev:wordpress

To build this target for production, execute:

	npm run build:wordpress

## targets/npm

Contains a npm package that exposes the api. It is transpiled using babel and while developing starts a webpack dev server
that will serve the css file. It'll build the JS library using the `webpack.npm.config.js`. 
**When the package will be published we need to build the files prior to packaging. Right now built files are gitignored.**

To develop this target (`http://localhost:9000`), execute:

	npm run dev:npm

To build this target for production, execute:

	npm run build:npm
