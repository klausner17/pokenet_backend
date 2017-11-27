var config: any;

const env = process.env.NODE_ENV;
if (env) {
    config = require(`./config.${env}.js`);
}
config = require("./config.development.js");

export default config;