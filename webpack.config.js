const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');
const {
    setUpNodeEnvAsProduction,
    uglisfyJs,
    webpackHotModuleReplacement,
    extractCssIntoOwnFile
} = require('./__webpack__/plugins');

module.exports = env => {
	const addPlugin = (add, plugin) => add ? plugin : undefined;
	const ifProd = plugin => addPlugin(env.prod, plugin);
    const ifDev = plugin => !env.prod ? addPlugin(true, plugin) : undefined;
    const removedEmpty = array => array.filter(plugin => plugin != undefined);
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
                    use: env.prod ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ["css-loader", "sass-loader"]
                    }) : [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                }
            ]
        },
        plugins: removedEmpty([
            ifProd(setUpNodeEnvAsProduction),
            ifProd(uglisfyJs),
            ifDev(webpackHotModuleReplacement),
            ifProd(extractCssIntoOwnFile)
        ])
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
