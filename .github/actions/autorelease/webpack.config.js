/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const root = path.resolve(__dirname);
const sourceRoot = path.join(root, 'src');
const outputRoot = path.join(root, 'dist');

/** @type {import('webpack').Configuration} */
const config = {
	name: 'actions/autorelease',
	context: sourceRoot,
	entry: {
		client: './index.ts'
	},
	target: 'node',
	output: {
		libraryTarget: 'commonjs',
		path: outputRoot,
		filename: 'index.js'
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							happyPackMode: true
						}
					}
				]
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false
					}
				},
				extractComments: false
			})
		],
		usedExports: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
}

module.exports = config;
