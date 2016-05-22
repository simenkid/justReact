
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var config = {
    entry: [ './app.js' ],
    output: {
        path: __dirname + '/assets/',
        publicPath: '/assets',
        filename: 'bundle.js'
    },
//   output: {
//     path: buildPath,    // Path of output file
//     filename: 'app.js',
//   },

    module: {
        loaders: [
            {
                // React-hot loader and
                test: /\.js$/,  // All .js files
                exclude: [ nodeModulesPath ],
                loaders: [ 'react-hot', 'babel-loader' ], // react-hot is like browser sync and babel loads jsx and es6-7
            },
        ],
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        // Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        // Moves files
        new TransferWebpackPlugin([
                { from: 'www' },
            ], path.resolve(__dirname, "src")),
        ],
    };
    //eslint config options. Part of the eslint-loader package
    eslint: {
        configFile: '.eslintrc',
    }
};




module.exports = config;

// const webpack = require('webpack');
// const path = require('path');
// const buildPath = path.resolve(__dirname, 'build');
// const nodeModulesPath = path.resolve(__dirname, 'node_modules');
// const TransferWebpackPlugin = require('transfer-webpack-plugin');

// const config = {
//   //Entry points to the project
//   entry: [
//     'webpack/hot/dev-server',
//     'webpack/hot/only-dev-server',
//     path.join(__dirname, '/src/app/app.js'),
//   ],
//   //Config options on how to interpret requires imports
//   resolve: {
//     extensions: ["", ".js"],
//     //node_modules: ["web_modules", "node_modules"]  (Default Settings)
//   },
//   //Server Configuration options
//   devServer:{
//     contentBase: 'src/www',  //Relative directory for base of server
//     devtool: 'eval',
//     hot: true,        //Live-reload
//     inline: true,
//     port: 3000,        //Port Number
//     host: 'localhost',  //Change to '0.0.0.0' for external facing server
//   },
//   devtool: 'eval',

//   plugins: [
//     //Enables Hot Modules Replacement
//     new webpack.HotModuleReplacementPlugin(),
//     //Allows error warnings but does not stop compiling. Will remove when eslint is added
//     new webpack.NoErrorsPlugin(),
//     //Moves files
//     new TransferWebpackPlugin([
//       {from: 'www'},
//     ], path.resolve(__dirname, "src")),
//   ],
// };

// module.exports = config;