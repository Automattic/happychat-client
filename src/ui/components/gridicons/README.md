# Gridicons

This is a slimmed version of the [Gridicons](https://github.com/Automattic/gridicons) library tailored for our needs.

The rationale for this was to reduce [bundle size](https://github.com/Automattic/happychat-client/issues/10) of the Happychat library. This are the bundle sizes of the library and the top three components at the time of writing this:

Size | Raw/Parsed | GZIP |
--- | --- | --- |
`dist/happychat.js` | 473K  | 35K
`react-dom`| 110K | 19K
`gridicons`| 86K | 19K
`src/ui`| 60K | 11K
`src/state`| 27K | 5,5K
`engine.io-client`| 22K | 6K


We can't avoid using `react-dom`. Taking into account that the combined size of the SVG icons we use from Gridicons is 713 bytes, it seemed reasonable to inline it and save 85K, the next bigger win we could have.

Note that inlining the Gridicons library is sub-optimal and not future-proof. The next step to improve this is te make the Gridicons library to export its icons separately, so we can import them individually making the bundle size dependent on the icons you actually use.
