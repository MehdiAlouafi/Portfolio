const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = env => {
	const addPlugin = (add, plugin) => add ? plugin : '';
	const ifProd = plugin => addPlugin(env.prod, plugin);
	return {
		entry: resolve(__dirname, 'client/src/index.js'),
		output: {
			filename: 'bundle.js',
			path: resolve(__dirname, 'client/dist'),
            publicPath: '/',
			pathinfo: !env.prod
		},
		devtool: env.prod ? 'source-map' : 'cheap-module-source-map',
        devServer: env.prod ? {} : {
            historyApiFallback: true,
			hot: true,
			inline: true,
			stats: 'errors-only',
			host: '0.0.0.0',
			port: env.port || 8080,
			contentBase: './client/dist'
        },
		bail: true,
		module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ["css-loader", "sass-loader"]
                    })
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                     'process.env': {
                         'NODE_ENV': JSON.stringify('production')
                     }
                 }),
            new webpack.optimize.UglifyJsPlugin({
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
            new ExtractTextPlugin('styles.css')
        ]
	}
};
// const base_config = {
// 	context: path.resolve(__dirname, './client/src'),
// 	entry: {
// 		app: './index.js'
// 	},
// 	output: {
// 		path: path.resolve('./dist'),
// 		filename: '[name].bundle.js'
// 	}
// };
