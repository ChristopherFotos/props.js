const path = require('path')

module.exports = {
    devtool: 'source-map',
    entry: './lib.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'props.js',
        library: 'props',
        // libraryTarget: 'umd',
    },
};