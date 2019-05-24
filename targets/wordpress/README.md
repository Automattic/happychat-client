# WordPress.com Widget

Contains the client side widget and WordPress plugin to host a Happy Chat customer interface on a WordPress website.

### Widget

The contents of `./widget` should be uploaded to `widgets.wp.com/happychat/vX` matching the version in `src/config/production.json`. The version should be changed if the interface in `plugin/` is not backwards compatible.

### Plugin

The contents of `./plugin` is a WordPress plugin to be used on any WordPress site that supports WordPress.com oauth tokens for customers.
