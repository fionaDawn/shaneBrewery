const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  node: {
    fs: 'empty'
  },
  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    // the output of the webpack build will be in /dist directory
    path: path.resolve(__dirname, 'dist'),
    // the filename of the JS bundle will be bundle.js
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // for any file with a suffix of js or jsx
        test: /\.(js|jsx)$/,
        // ignore transpiling JavaScript from node_modules as it should be that state
        exclude: /node_modules/,
        // use the babel-loader for transpiling JavaScript to a suitable format
        loader: 'babel-loader',
        options: {
          // attach the presets to the loader (most projects use .babelrc file instead)
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      // {
      //   test: /\.html?$/,
      //   use: 'html-loader'
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
      // {
      //   test: /\.(png|j?g|svg|gif)$/,
      //   exclude: /node_modules/,
      //   use: 'file-loader'
      // }
    ]
  },
  // add a custom index.html as the template
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: './index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
