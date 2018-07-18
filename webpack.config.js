const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    devtool: 'inline-source-map',
    entry: './client/index.js',
    output: {
        filename: './public/javascripts/bundle.js',
        sourceMapFilename: './public/javascripts/bundle.js.map'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: { presets: ['es2015', 'react'] }
        }, {
            test: /\.sass$/,
            use: [{ loader: "style-loader" }, { loader: "css-loader?-url" }, { loader: "sass-loader" }]
        }]
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};
