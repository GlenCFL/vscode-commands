/* ============================================================================
 * Copyright (c) Glen Marker. All rights reserved.
 * Licensed under the MIT license. See the LICENSE file in the project root for
 * license information.
 * ===========================================================================*/

'use strict';

const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
  target: 'node',
  entry: './src/extension.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            module: 'es6',
            sourceMap: false
          }
        }
      }]
    }]
  }
};

module.exports = config;
