const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    setUpNodeEnvAsProduction: new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    uglisfyJs: new webpack.optimize.UglifyJsPlugin({
       beautify: false,
       mangle: {
         screw_ie8: true,
         keep_fnames: true
       },
       compress: {
         screw_ie8: true
       },
       comments: false
    }),
    webpackHotModuleReplacement: new webpack.HotModuleReplacementPlugin(),
    extractCssIntoOwnFile: new ExtractTextPlugin('styles.css')
}
