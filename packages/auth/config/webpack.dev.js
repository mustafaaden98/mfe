const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonCongif = require('./webpack.common');
const packageJson = require('../package.json');


const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8085/'
    },
    devServer: {
        port: 8085,
        historyApiFallback: {
            index: 'index.html',
        }
        // historyApiFallback: true
    },

    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp' : './src/bootstrap'
            },
            shared: packageJson.dependencies
        }),
        


    ]
};

module.exports = merge(commonCongif, devConfig);