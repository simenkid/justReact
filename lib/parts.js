var webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    PurifyCSSPlugin = require('purifycss-webpack-plugin');

var parts = {};

parts.devServer = function (opts) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            lazy: false,
            stats: 'errors-only',
            host: opts.host,
            port: opts.port
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({ multiStep: true })
        ]
    };
};

var path = require('path');

parts.setupCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: [ 'style', 'css?modules&localIdentName=[name]__[local]-[hash:base64:5]' ],
                    //include: paths,
                    exclude: paths,
                },
                {
                    test: /\.css$/,
                    loaders: [ 'style', 'css' ],
                    include: paths,
                }
            ]
        }
    };
};

parts.extractCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]',
                    exclude: paths
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: paths
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[hash].css')
        ]
    };
};

parts.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })
        ]
    };
};

parts.setFreeVariable = function (key, value) {
    var env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
};

parts.extractBundle = function (opts) {
    var entry = {};
    entry[opts.name] = opts.entries;

    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [ opts.name, 'manifest' ],
                minChunks: Infinity
            })
        ]
    };
};

parts.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([ path ], {
                root: process.cwd()
            })
        ]
    };
};

parts.purifyCSS = function (paths) {
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                paths: paths
            })
        ]
    };
};

module.exports = parts;
