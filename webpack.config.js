const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
     path: path.resolve(__dirname, 'output'),
     filename: 'bundle.js'
  },
  resolve: {
     extensions: ['.js', '.jsx']
  },
  module: {
     rules: [
        {
            test: /\.jsx/,
            use: {
               loader: 'babel-loader',
               options: { presets: ['react', 'env'] }
            }
        },
        {
           test: /\.scss/,
           use: ['style-loader', 'css-loader', 'sass-loader']
        }
     ]
  },
  devServer: {
      contentBase: './src',
      publicPath: '/output'
  },
  devtool:"eval-source-map",
  mode:"development"
};