const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

module.exports = () => {
    // Load .env file contents into process.env
    const env = dotenv.config().parsed;

    // Convert .env variables to a format that can be used by DefinePlugin
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        resolve: {
            fallback: {
                crypto: require.resolve('crypto-browserify'),
            },
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
        ],
        // Other webpack configuration options here...
    };
};
