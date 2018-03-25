## Config files

Based on the value of `process.env.NODE_ENV` either `development.json` or `production.json` will be 
loaded.

If you need to use override some configuration fields while developing you can create a `development.local.json`
file in this folder, which will be ignored by git and will get precedence over the values in `development.json`

If there is a `development.local.json` file it will get merged with the JSON object from `development.json`
overriding the values for the fields they share.