var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    validator = require('webpack-validator');

var parts = require('./lib/parts');

var PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
//        path.join(__dirname, 'node_modules', 'purecss'),
        path.join(__dirname, 'app', 'styles', 'main.css')
    ],
    build: path.join(__dirname, 'build'),
};

var config = {};
var common = {
    entry: {
        app: PATHS.app,
        style: PATHS.style
    },
    output: {
        path: PATHS.build,
        filename: '[name].[hash].js',
        chunkFilename: '[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                include: PATHS.app,
                loader: 'react-hot',
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [ 'react', 'es2015' ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'my webpack practice' })
    ]
};

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            { devtool: 'source-map'},
            parts.clean(PATHS.build),
            parts.setFreeVariable('process.env.NODE_ENV', 'production'),
            parts.extractBundle({ name: 'vendor', entries: [ 'react' ]}),
            parts.minify(),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS(PATHS.style)
        );
        break;
    default:
        config = merge(
            common,
            { devtool: 'eval-source-map'},
            parts.setupCSS(PATHS.style),
            parts.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validator(config);
