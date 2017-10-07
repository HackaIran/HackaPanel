module.exports = {
    devtool: 'inline-source-map',
    entry: './client/scripts/index.js',
    watch: true,
    output: {
        filename: './public/javascripts/index.js',
        sourceMapFilename: './public/javascripts/index.js.map'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015' ]
            }
        }]
    }
};
