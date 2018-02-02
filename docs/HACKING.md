# Hacking

### Code structure

- `docs`: docs about the project.
- `src`: the source code for the Happychat library.
	- `config`: data that is not likely to change at runtime or needs to be configured.
	- `lib`: utils.
	- `state`: Redux tree.
	- `ui`: React components that are not connected to the state.
- `targets`: apps that use the Happychat library
	- `standalone`: bare HTML page with Happychat embedded.
	- `wordpress`: WordPress plugin that exposes `happychat` as a shortcode.

The library entry point lives at `src/index.js` and uses `src/form.js` and `src/form.scss`. This is where the library connects the UI components with the state. The idea is that code that lives in `src/state` and `src/ui` doesn't know anything about each other, which forces us to create better APIs that make them reusable in other scenarios.
