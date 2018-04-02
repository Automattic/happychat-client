# Hacking

Topics discussed:

* OAuth ID
* Repository layout
* The library renders within an iframe
* Color palette and themes

## OAuth ID

The standalone target uses the `oauth_client_id` at [targets/standalone/config/index.js](./targets/standalone/config/index.js) to authenticate requests to WordPress.com.

The WordPress target doesn't need one because it's a plugin that runs within a WordPress site. It's the site responsibility to register a [WordPress.com OAuth application](http://developer.wordpress.com/apps/) so it's whitelisted to make requests to the WordPress.com REST API ([OAuth docs](https://developer.wordpress.com/docs/oauth2/)).

## Repository layout

- `docs`: docs about the project.
- `src`: the source code for the Happychat library.
	- `config`: data that is not likely to change at runtime or needs to be configured.
	- `lib`: general utils.
	- `state`: Redux state tree.
	- `ui`: React components - these are unconnected to state.
- `targets`: apps that use the Happychat library
	- `cdn`: the production-ready JS and CSS assets.
	- `standalone`: bare HTML page with Happychat embedded.
	- `wordpress`: WordPress plugin that exposes `happychat` as a shortcode.

The library entry point lives at `src/index.js` and uses `src/form.js` and `src/form.scss`. This is where the UI components are connected to state. Code that lives in `src/state` and `src/ui` doesn't know anything about each other, which forces us to create better APIs that make them reusable in other scenarios.

## The library renders within an iframe

The `src/index.js` sets up and configures the components: initializes the Redux store, connects the React component tree to the Redux state tree, and so on.

One of the first things the library does is to create an iframe within the HTML node provided through the `nodeId` property. This is because we want to isolate the Happychat CSS from the host CSS. We don't want the Happychat iframe to block the [window.onload event](http://www.stevesouders.com/blog/2009/06/03/using-iframes-sparingly/) of the page it embeds, that's why we create it and add the assets using JavaScript. [Lessons from creating the Meebo bar](https://conferences.oreilly.com/velocity/velocity2010/public/schedule/detail/13070) is still a good talk to understand the trade-offs of using iframes to embed content (you may find the [video online](https://www.youtube.com/watch?v=b7SUFLFu3HI)).

Upon the iframe creation a spinner line is shown right away within the iframe -as to improve the perceived performance- and the CSS assets are requested. After that, React takes over at some point and it'll render the same spinner (see `SpinnerLine` component) so the user won't notice anything. When the CSS assets are ready, the iframe will dispath the `HAPPYCHAT_ASSETS_LOADED` Redux action, which will update the state, and tell React that it can stop rendering the `LoadingComponent` and show the chat or form component instead.

## Color palette and themes

We've transitioned to a codebase that supports themes by consolidating the colors used and using CSS Custom Properties. At the time of writing we support 3 themes, that may be found at `src/ui/css/themes`:

- `main`: follows the [WordPress.com guidelines](https://wordpress.com/design-handbook/colors/). It's the default theme.
- `jpop`: follows the Jetpack guidelines.
- `woo`: follows the [WooCommerce guidelines](https://woocommerce.com/style-guide/#sg-palette).

All SCSS color variables are declared at `/home/andres/src/happychat-client/src/ui/css/shared/_colors.scss`. The themes are automatically selected depending on the the chat group the user is routed to. For example, the `woo` theme will be activated when group is `woo`, and `jpop` when group is `jpop`.

Note that CSS Custom Properties support is yet not [ubiquitous](https://caniuse.com/#feat=css-variables) -current offenders are IE11 and Opera Mini- so we use [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) processors to compile back for those browsers.

### Adding new colors

Every theme declares 3 accent colors (selected, active, and focused) and 3 neutral colors (neutral, neutral-light, neutral-dark).

If a new color needs to be added, don't introduce directly in the components SCSS. Add it to the SCSS theme files and then use the Custom CSS Variable in the components SCSS. Give it a name that refers to the fit in the color palette (accent/neutral scheme) so it can be reused in other parts of the codebase. Do not name it after the component where it's being used as that limits our ability to reuse it in other contexts.

For example:

	--link-visited: #333; // bad name
	--neutral-light: #333;  // good name
