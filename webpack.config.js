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
			pathinfo: !env.prod
		},
		devtool: env.prod ? 'source-map' : 'cheap-module-source-map',
        devServer: env.prod ? null : {
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
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                }
            ]
        },
        plugins: [
            addPlugin(true, new webpack.HotModuleReplacementPlugin())
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
