var webpack = require('webpack');

var entry = 'index.js';

module.exports = {
    context: __dirname + '/src',
    entry: './' + entry,

    devtool: 'source-map',
    output: {
        filename: 'aidebox.js',
        path: __dirname + '/app',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    target: 'electron-renderer'
};