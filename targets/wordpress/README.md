# WordPress plugin

The `targets/wordpress/plugin` directory is a complete WordPress plugin that you can copy to your WordPress installation and enjoy Happychatting!

Upon changes on the JavaScript library at `src/` you'll need to re-build it for WordPress. By executing

	npm run targets:wordpress

the `targets/wordpress/plugin/assets/happychat.js` file will be updated with the latest changes.

### Development VS Production builds

Note that `npm run targets:wordpress` creates a build meant for development (no uglify, no react compression, connection to the staging Happychat server, etc).

Should you want a production build, execute

	npm run dist:js

Then copy the file `dist/happychat.js` to `targets/wordpress/plugin/assets/happychat.js`.
