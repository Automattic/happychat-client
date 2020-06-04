# Deploying changes

The only well-tested deployment and distribution target is the WordPress plugin.
Instructions for other targets are TBD.

## 1. Bump the version

- **npm**: Use `npm version [major | minor | patch]` to update the package version
- **WordPress plugin**: Ideally this could be automated, but for now you should manually adjust the version number to match in:
  - [`targets/wordpress/plugin/class-happychat-admin.php`](/targets/wordpress/plugin/class-happychat-admin.php)
  - [`targets/wordpress/plugin/class-happychat-client.php`](targets/wordpress/plugin/class-happychat-client.php)
  - [`targets/wordpress/plugin/happychat.php`](targets/wordpress/plugin/happychat.php)

Commit and push these changes to `master`.

## 2. Build the assets

Use `npm run build` to rebuild assets for all deploy targets. (There's also target-specific build
commands, e.g. `npm run build:wordpress`.)

The built assets are saved under the `target/` directories, and .gitignore'd so they
won't get committed back to the repo.

## 3. Deploy the built assets

Each target is deployed in different ways:

### Deploying the WordPress.com Plugin

The WordPress.com plugin references assets that are hosted on `widgets.wp.com`, so there are two steps to this deploy.

(Side note — while writing this guide I realize that I think we hosted assets at widgets.wp.com just so that we could deploy changes without deploying new plugin code. But actually, widgets.wp.com is so aggressively cached [more on this below] that we always need to redeploy WordPress code anyways to bump the version and cachebust. I really wonder if we should go back to having the static assets build directly into the plugin... — @mattwondra)

#### 1. Deploy static assets

Static assets are hosted on widgets.wp.com. Make sure your WordPress.com sandbox is up-to-date and clean, and:

```
scp -r targets/wordpress/widget/* wpdev@[YOUR SANDBOX]:~/public_html/widgets.wp.com/happychat/v1/
```

Then commit the code from your sandbox to SVN.

**IMPORTANT NOTE ABOUT CACHING:** 
These assets hosted on widgets.wp.com seem to be aggressively cached at the CDN. This is good and bad — good in that when you update the widget code you can be relatively certain it won't break old versions of the plugin code that are sitting out there. But it's bad in that if anyone manually goes to a version of the files before the code has been deployed, the old version will be cached at the new version's address.

(To give a concrete example — when updating from 0.0.1 to 0.0.2 I was testing how the caching worked and manually opened https://widgets.wp.com/happychat/v1/happychat.js?ver=0.0.2 before deploying the 0.0.2 widget code. When I deployed 0.0.2 WordPress plugin code, it worked fine for most people, but occasionally it would break because on one CDN `0.0.2` was still serving `0.0.1` code.)

So **it's VERY important to update and deploy the widgets.wp.com code _before_ updating any WordPress plugins**, otherwise you'll run into caching headaches!

#### 2. Deploy WordPress plugin
Copy the [`targets/wordpress/plugin`](/targets/wordpress/plugin) directory to wherever the plugin lives (e.g. WooCommerce.com's `plugins/happychat` directory). This is necessary even if you didn't make changes to the plugin code, so that a new asset version is used to cachebust.
