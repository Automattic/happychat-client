# Demo

A demo is available at https://automattic.github.io/happychat-client

The code lives in the gh-pages branch and may not be in sync with master branch.
To update the demo

* modify the `oauth_app_id` in `targets/standalone/config/index.js` to `56134`
* build the standalone target: `npm run targets:standalone`
* copy the files in `targets/standalone/public` to the `gh-pages` branch
* commit and push to see the changes live
