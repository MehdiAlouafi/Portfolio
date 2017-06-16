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
		devtool: 'source-map',
		bail: true,
		module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
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
